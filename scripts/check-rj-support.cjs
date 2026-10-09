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
['catalog.js','content.js','app.js'].forEach(name => vm.runInContext(fs.readFileSync(path.join(root,'rj','support',name),'utf8'),context,{filename:name}));
const C = context.window.RJSupportCatalog;
const UI = context.window.RJSupportUI;
const unique = (items,label) => assert.equal(new Set(items.map(x=>x.id)).size,items.length,label + ' IDs must be unique');
['audiences','products','sections','topics','resources'].forEach(key=>unique(C[key],key));
assert(C.resources.length>0,'Published customer materials must be available');
const baseline = process.argv[2] ? JSON.parse(fs.readFileSync(process.argv[2],'utf8')) : null;
const knownPaths = new Set((baseline?.tree || []).map(x=>x.path));
const localAsset = url => {
  if (!url || /^(?:https?:|mailto:|#)/.test(url)) return;
  assert(!/^(?:javascript|data):/i.test(url),'Executable data must not be a resource URL');
  const local=path.resolve(root,'rj','support',url.split(/[?#]/)[0]);
  const relative=path.relative(root,local).split(path.sep).join('/');
  assert(!relative.startsWith('../'),'Assets stay in the repository');
  assert(fs.existsSync(local) || knownPaths.has(relative),'Material file exists: '+relative);
};
for(const r of C.resources) {
  const p=C.products.find(p=>p.id===r.productId);
  assert(p && p.topicIds.includes(r.topicId),'Resource belongs to its product');
  assert.equal(r.visibility,'public','Only customer-safe material enters the public payload');
  assert.equal(r.status,'published','Public payload must contain published records');
  assert(r.audiences.every(id=>C.audiences.some(a=>a.id===id)),'Audience is registered');
  assert((r.modelIds || []).every(id=>p.modelOptions.some(x=>x.id===id)),'Known model scope');
  assert((r.seatIds || []).every(id=>p.seatOptions.some(x=>x.id===id)),'Known seat scope');
  for(const a of r.assets) {localAsset(a.url);localAsset(a.poster);localAsset(a.captions);localAsset(a.guideUrl);}
  for(const s of r.sourceRefs) localAsset(s.url);
  for(const s of r.content) for(const b of s.blocks) {
    localAsset(b.src);localAsset(b.url);
    if(b.overlays?.length) {
      assert.equal(new Set(b.overlays.map(o=>o.label)).size,b.overlays.length,'Diagram labels are unique');
      assert.equal(new Set(b.overlays.map(o=>o.x+','+o.y)).size,b.overlays.length,'Each label identifies a different source position');
      assert(b.overlays.every(o=>o.x>=0 && o.x<=100 && o.y>=0 && o.y<=100),'Diagram labels stay on the source image');
    }
  }
}
const restrictedFiles=fs.readdirSync(path.join(root,'rj','support','files'));
assert(!restrictedFiles.some(x=>/certificate|internal|cop|type.approval|pricing|sensor/i.test(x)),'Private certificates and internal files stay outside the public repository');
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
const steinadler=C.products.find(x=>x.id==='steinadler-pro');
const rangeTopic=C.topics.find(x=>x.id==='range-extender');
assert.equal(UI.resourcesFor(steinadler,rangeTopic,'users',{model:'l7e'}).length,0,'Offroad range-extender information cannot be applied to L7e');
assert(UI.resourcesFor(steinadler,rangeTopic,'users',{model:'offroad'}).length>0,'Matching Offroad information is available');
const seatTopic=C.topics.find(x=>x.id==='seat-footrest');
assert(!UI.resourcesFor(steinadler,seatTopic,'users',{seat:'ss'}).some(r=>r.type==='video'),'Double-seat videos are excluded from single-seat instructions');
assert(UI.resourcesFor(steinadler,seatTopic,'users',{seat:'ds'}).some(r=>r.type==='video'),'Matching installation videos are available');
assert(!UI.publishedResources(null,'users').some(r=>r.id.startsWith('service-video-')),'Qualified-service videos stay in dealer classification');
assert.equal(UI.searchTopics('底部护板','users').resources.length,0,'Service video is excluded from customer search');
assert(UI.searchTopics('底部护板','dealers').resources.length>0,'Dealer search can find the service video');
const emptyProduct=UI.pageFor(UI.parseRoute('#/product/luchs-a')).html;
assert(!emptyProduct.includes('resource-panel'),'Other products cannot inherit Steinadler materials');
const english=UI.pageFor(UI.parseRoute('#/library?audience=users&language=en&type=document')).html;
assert(english.includes('Steinadler Pro L7e 使用手册'),'English document filter finds an actual manual');
assert(!english.includes('遥控车辆原说明 · 中文'),'Language filter excludes Chinese original files');
assert.equal(UI.topicStatus(steinadler,C.topics.find(x=>x.id==='follow'),'users'),'配置咨询','Following is not presented as a released operation tutorial');
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
console.log(`Passed: ${routes.size} page states, ${linkCount} internal navigation links, ${C.resources.length} resource records, model/seat/language filters, source assets, role scope, escaping, and new-product reuse.`);
