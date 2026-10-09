'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const appElement = {innerHTML:''};
const context = {
  URLSearchParams,
  window:{location:{hash:'#/'},addEventListener(){},scrollTo(){}},
  document:{getElementById:id => id === 'app' ? appElement : {focus(){}},addEventListener(){}}
};
vm.createContext(context);
['catalog.js','app.js'].forEach(name => vm.runInContext(fs.readFileSync(path.join(root,'rj','support',name),'utf8'),context,{filename:name}));
const C = context.window.RJSupportCatalog;
const UI = context.window.RJSupportUI;
const unique = (items,label) => assert.equal(new Set(items.map(x=>x.id)).size,items.length,label + ' IDs must be unique');
['audiences','products','sections','topics'].forEach(key=>unique(C[key],key));
assert.equal(C.resources.length,0,'Preview must not contain fabricated or restricted files');
for (const p of C.products) {
  for (const [audience,sections] of Object.entries(p.sectionIds)) {
    assert(C.audiences.some(a=>a.id===audience),'Registered audience');
    sections.forEach(id=>assert(C.sections.some(s=>s.id===id),'Registered section: '+id));
  }
  p.topicIds.forEach(id=>assert(C.topics.some(t=>t.id===id),'Registered topic: '+id));
}
for (const t of C.topics) {
  assert(C.sections.some(s=>s.id===t.sectionId),'Topic section exists');
  assert(C.resourceTypes.some(k=>k.id===t.kind),'Topic type exists');
}
const routes = new Set(['#/','#/users','#/dealers','#/developers','#/library','#/library?audience=dealers','#/search?q=充电','#/search?q=Steinadler','#/search?q=证书&audience=dealers','#/search?q=nonexistent']);
for(const p of C.products) {
  for(const audience of ['users','dealers']) {
    routes.add(UI.href('product/'+p.id,{audience}));
    routes.add(UI.href('library',{audience,product:p.id}));
    for(const section of p.sectionIds[audience]) routes.add(UI.href('product/'+p.id,{audience,section}));
    for(const topicId of p.topicIds) {
      const topic=C.topics.find(t=>t.id===topicId);
      if(topic.audiences.includes(audience)) routes.add(UI.href(`product/${p.id}/topic/${topicId}`,{audience}));
    }
  }
}
routes.add('#/product/steinadler-pro?audience=users&model=l7e&seat=ss');
routes.add('#/product/steinadler-pro/topic/follow?audience=users&model=offroad&seat=ds');
let linkCount = 0;
for(const routeString of routes) {
  const route=UI.parseRoute(routeString);
  const page=UI.pageFor(route);
  assert.notEqual(page.title,'目录未找到','Known route must render: '+routeString);
  const html=UI.shell(page.html,route);
  assert.equal((html.match(/<main\b/g)||[]).length,1,'One main landmark');
  assert.equal((html.match(/<h1\b/g)||[]).length,1,'One page title');
  assert(!/undefined|NaN/.test(html),'No unresolved values');
  for(const [,raw] of html.matchAll(/href="([^"\n]+)"/g)) {
    const url=raw.replace(/&amp;/g,'&');
    if(url.startsWith('#/')) {
      assert.notEqual(UI.pageFor(UI.parseRoute(url)).title,'目录未找到','Emitted route must resolve: '+url);
      linkCount++;
    }
  }
}
for(const p of C.products) {
  const userPage=UI.pageFor(UI.parseRoute(UI.href('product/'+p.id,{audience:'users'}))).html;
  assert(!userPage.includes('/topic/certificates'),'User product page must not list dealer certificates');
  assert.equal(UI.pageFor(UI.parseRoute(UI.href(`product/${p.id}/topic/certificates`,{audience:'users'}))).title,'目录未找到','Dealer-only topic rejected in user view');
}
assert.equal(UI.searchTopics('证书','users').topics.length,0,'User search cannot surface dealer topics');
assert(UI.searchTopics('证书','dealers').topics.length>0,'Dealer search includes certificates');
assert(UI.searchTopics('跟随','users').topics.some(x=>x.product.id==='steinadler-pro'),'Customer-facing feature topic exists');
const attack='<img src=x onerror=alert(1)>';
const attacked=UI.pageFor(UI.parseRoute(UI.href('search',{q:attack}))).html;
assert(!attacked.includes(attack),'Query text must be escaped');
assert(attacked.includes('&lt;img'),'Escaped query remains readable');
const badConfig=UI.pageFor(UI.parseRoute('#/product/steinadler-pro/topic/charging?model='+encodeURIComponent(attack))).html;
assert(!badConfig.includes(attack),'Unknown config must not render');
assert.equal(UI.pageFor(UI.parseRoute('#/missing')).title,'目录未找到','Unknown route has recovery page');
// Verify a fourth product can reuse all page templates without adding route code.
C.products.push({id:'extension-check',name:'Extension Check',code:'EC',family:'Check',label:'产品支持目录',description:'产品扩展检查',status:'reserved',modelOptions:[],seatOptions:[],sectionIds:{users:['start'],dealers:['shared']},topicIds:['first-use']});
assert(UI.pageFor(UI.parseRoute('#/users')).html.includes('Extension Check'),'New product appears in audience catalog');
assert.equal(UI.pageFor(UI.parseRoute('#/product/extension-check')).title,'Extension Check','New product route is data-driven');
assert(UI.pageFor(UI.parseRoute('#/product/extension-check?audience=dealers')).html.includes('/topic/first-use'),'Shared topic uses same topic record');
assert(UI.searchTopics('Extension','users').products.some(p=>p.id==='extension-check'),'New product is indexed by search');
C.products.pop();
const index=fs.readFileSync(path.join(root,'rj','support','index.html'),'utf8');
for(const [,assetUrl] of index.matchAll(/(?:src|href)="\.\/([^"#]+)"/g)) {
  const asset=assetUrl.split('?')[0];
  assert(fs.existsSync(path.join(root,'rj','support',asset)),'Static asset exists: '+assetUrl);
}
assert(appElement.innerHTML.includes('使用与支持'),'Initial render runs');
assert(fs.readFileSync(path.join(root,'rj','support','styles.css'),'utf8').includes('@media'),'Responsive styles exist');
console.log(`Passed: ${routes.size} page states, ${linkCount} internal navigation links, role scope, escaping, and new-product reuse.`);
