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
['catalog.js','content.js','content-en.js','app.js'].forEach(name => vm.runInContext(fs.readFileSync(path.join(root,'rj','support',name),'utf8'),context,{filename:name}));
const C = context.window.RJSupportCatalog;
const UI = context.window.RJSupportUI;
const unique = (items,label) => assert.equal(new Set(items.map(x=>x.id)).size,items.length,label + ' IDs must be unique');
['audiences','products','sections','topics','resources'].forEach(key=>unique(C[key],key));
assert(C.resources.length>0,'Published customer materials must be available');
assert.equal(C.resources.length,40,'All source records are retained');
assert.equal(C.site.language,'en','Architecture is English');
assert.equal(JSON.stringify(C.site.visibleResourceLanguages),'["en","zh-CN"]','Resource languages are independent of the English interface');
assert.equal(JSON.stringify(C.site.downloadLanguages),'["en"]','Downloads on the English website use English files');
const sourceRecords = JSON.stringify(C.resources);
const excludedIds=['manual-offroad','manual-remote-zh','manual-fpv-zh'];
const excludedFiles=['steinadler-pro-offroad-manual-en.pdf','remote-control-manual-zh.docx','fpv-manual-zh.docx'];
for(const audience of ['users','dealers']) {
  const visible = UI.publishedResources(null,audience);
  assert.equal(visible.length,C.resources.filter(r=>r.audiences.includes(audience) && !excludedIds.includes(r.id)).length,'Active resources retain their audience scope');
  const english = visible.filter(r=>r.type==='document' && r.language==='en');
  assert.equal(english.length,5,'Five English documents remain in current downloads');
  assert(english.every(r=>!/[\u3400-\u9fff]/.test(JSON.stringify([r.title,r.scope,r.revision,r.assets]))),'English file metadata stays translated');
  assert.equal(visible.filter(r=>r.type==='document' && r.language==='zh-CN').length,0,'Chinese language duplicates are not displayed');
  assert(!visible.some(r=>excludedIds.includes(r.id)),'Old manual and Chinese duplicates are excluded from all published listings');
  assert(visible.every(r=>!/\p{Script=Han}/u.test(JSON.stringify(r))),'All displayed resource copy is English');
  assert(visible.filter(r=>!['document','video'].includes(r.type)).every(r=>r.language==='en'),'Online guides are English translations');
}
const englishCopy=context.window.RJSupportEnglishMetadata;
assert.equal(Object.keys(englishCopy).length,C.resources.length,'English copy covers every original resource');
const projected=UI.publishedResources(null,'dealers');
assert.equal(projected.length,37,'Forty source records produce thirty-seven active resources');
function compareContent(original,translated,label) {
  if(typeof original==='string') {
    // Source numerical values and page references must survive translation.
    assert.deepEqual((translated.match(/\d+(?:\.\d+)?/g)||[]).sort(),(original.match(/\d+(?:\.\d+)?/g)||[]).sort(),label+' numerical values');
    return;
  }
  if(Array.isArray(original)) {
    assert.equal(translated.length,original.length,label+' item count');
    original.forEach((v,i)=>compareContent(v,translated[i],label+'['+i+']'));
  } else if(original && typeof original==='object') {
    for(const key of Object.keys(original)) {
      if(['type','src','url'].includes(key))assert.equal(translated[key],original[key],label+' '+key);
      else compareContent(original[key],translated[key],label+'.'+key);
    }
  } else assert.equal(translated,original,label);
}
for(const source of C.resources) {
  const resource={...source,...englishCopy[source.id]};
  assert(englishCopy[source.id],'Every source record retains its complete English translation');
  for(const key of ['id','productId','topicId','relatedTopicIds','audiences','modelIds','seatIds','type','publishedAt','status','visibility'])assert.equal(JSON.stringify(resource[key]),JSON.stringify(source[key]),key+' scope is preserved for '+source.id);
  assert.equal(resource.sourceLanguage,source.language,'Original source language is retained');
  compareContent(source.content,resource.content,source.id+'.content');
  compareContent(source.sourceRefs,resource.sourceRefs,source.id+'.sources');
  assert.equal(resource.assets.length,source.assets.length,'Original attachment count');
  resource.assets.forEach((a,i)=>{
    for(const key of ['kind','url','poster','format','origin','duration','guideUrl'])assert.equal(a[key],source.assets[i][key],source.id+' original asset '+key);
    localProjectedAsset(a.captions);
    if(source.assets[i].captions) {
      assert.equal(a.captionLanguage,'en','Support captions default to English');
      const subtitle=fs.readFileSync(path.resolve(root,'rj/support',a.captions),'utf8');
      const originalSubtitle=fs.readFileSync(path.resolve(root,'rj/support',source.assets[i].captions),'utf8');
      assert(!/\p{Script=Han}/u.test(subtitle),'English subtitles have no Chinese lines');
      const cues=s=>s.match(/^\d\d:\d\d:\d\d\.\d{3} --> .*$/gm)||[];
      assert.deepEqual(cues(subtitle),cues(originalSubtitle),'Original caption timings are preserved');
      const payload=s=>s.replace(/\r/g,'').split('\n').filter(line=>line && !/^(?:WEBVTT|NOTE|\d+$|\d\d:\d\d)/.test(line) && !/\p{Script=Han}/u.test(line));
      assert.deepEqual(payload(subtitle),payload(originalSubtitle),'Existing English caption text is preserved');
    }
  });
}
function localProjectedAsset(url) {
  if(url)assert(fs.existsSync(path.resolve(root,'rj/support',url)),'Translated display asset exists: '+url);
}
assert(!/[\u3400-\u9fff]/.test(JSON.stringify([C.site,C.audiences,C.products,C.sections,C.topics,C.developerModules,C.resourceTypes])),'Architecture metadata is English');
assert(!/[\u3400-\u9fff]/.test(fs.readFileSync(path.join(root,'rj/support/app.js'),'utf8')),'Interface templates are English');
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
const routes = new Set(['#/','#/users','#/dealers','#/developers','#/library','#/library?audience=dealers','#/search?q=charging','#/search?q=Steinadler','#/search?q=certificate&audience=dealers','#/search?q=nonexistent']);
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
for(const r of C.resources)for(const audience of r.audiences)routes.add(UI.href(`product/${r.productId}/topic/${r.topicId}`,{audience,resource:r.id}));
for(const audience of ['users','dealers'])for(const language of ['en','zh-CN'])for(const type of ['document','video','guide'])routes.add(UI.href('library',{audience,language,type}));
let linkCount = 0;
for(const routeString of routes) {
  const route=UI.parseRoute(routeString);
  const page=UI.pageFor(route);
  assert.notEqual(page.title,'Page not found','Known route must render: '+routeString);
  const html=UI.shell(page.html,route);
  assert(excludedFiles.every(file=>!html.includes(file)),'No old-manual or Chinese-file link is emitted in topics, sources, sidebars, search or legacy direct routes: '+routeString);
  assert(!/\p{Script=Han}/u.test(html),'Every rendered heading, paragraph, table, caption and source label is English: '+routeString);
  assert(!/[\u3400-\u9fff]/.test(page.title),'Page title remains English: '+routeString);
  assert(!/[\u3400-\u9fff]/.test(UI.shell('',route)),'Navigation and footer remain English: '+routeString);
  for(const [,text] of html.matchAll(/<(?:label|option)\b[^>]*>([^<]*)</g)) assert(!/[\u3400-\u9fff]/.test(text),'Filter controls remain English');
  assert.equal((html.match(/<main\b/g)||[]).length,1,'One main landmark');
  assert.equal((html.match(/<h1\b/g)||[]).length,1,'One page title');
  assert(!/undefined|NaN/.test(html),'No unresolved values');
  for(const [,raw] of html.matchAll(/href="([^"\n]+)"/g)) {
    const url=raw.replace(/&amp;/g,'&');
    if(url.startsWith('#/')) {
      assert.notEqual(UI.pageFor(UI.parseRoute(url)).title,'Page not found','Emitted route must resolve: '+url);
      linkCount++;
    }
  }
}
for(const p of C.products) {
  const userPage=UI.pageFor(UI.parseRoute(UI.href('product/'+p.id,{audience:'users'}))).html;
  assert(!userPage.includes('/topic/certificates'),'User product page must not list dealer certificates');
  assert.equal(UI.pageFor(UI.parseRoute(UI.href(`product/${p.id}/topic/certificates`,{audience:'users'}))).title,'Page not found','Dealer-only topic rejected in user view');
}
assert.equal(UI.searchTopics('certificate','users').topics.length,0,'User search cannot surface dealer topics');
assert(UI.searchTopics('certificate','dealers').topics.length>0,'Dealer search includes certificates');
assert(UI.searchTopics('following','users').topics.some(x=>x.product.id==='steinadler-pro'),'Customer-facing feature topic exists');
for(const r of projected) {
  for(const audience of r.audiences) {
    const direct = UI.pageFor(UI.parseRoute(UI.href(`product/${r.productId}/topic/${r.topicId}`,{audience,resource:r.id}))).html;
    assert(direct.includes('id="resource-'+r.id+'"'),'Direct links show every translated resource');
    assert(UI.searchTopics(r.title,audience).resources.some(x=>x.id===r.id),'Search can find resources by their English titles');
  }
}
const chineseFiles = UI.pageFor(UI.parseRoute('#/library?audience=dealers&language=zh-CN&type=document')).html;
assert.equal((chineseFiles.match(/class="result-card resource-card"/g)||[]).length,5,'An old Chinese-download filter falls back to the current English downloads');
assert(excludedFiles.every(file=>!chineseFiles.includes(file)),'Legacy language filters never restore excluded documents');
assert(!chineseFiles.includes('value="zh-CN"'),'Download language control offers only currently available English files');
const chineseVideos=UI.pageFor(UI.parseRoute('#/library?audience=dealers&language=zh-CN&type=video')).html;
assert.equal((chineseVideos.match(/class="result-card resource-card"/g)||[]).length,9,'English-only downloads do not remove Chinese-audio videos');
const steinadler=C.products.find(x=>x.id==='steinadler-pro');
const rangeTopic=C.topics.find(x=>x.id==='range-extender');
assert.equal(UI.resourcesFor(steinadler,rangeTopic,'users',{model:'l7e'}).length,0,'Offroad range-extender information cannot be applied to L7e');
assert(UI.resourcesFor(steinadler,rangeTopic,'users',{model:'offroad'}).length>0,'Matching Offroad information is available');
const seatTopic=C.topics.find(x=>x.id==='seat-footrest');
assert(!UI.resourcesFor(steinadler,seatTopic,'users',{seat:'ss'}).some(r=>r.id==='manual-seat-footrest'),'Dual-seat English diagrams are excluded from single-seat scope');
assert(UI.resourcesFor(steinadler,seatTopic,'users',{seat:'ds'}).some(r=>r.id==='manual-seat-footrest'),'Dual-seat English diagrams remain available');
// Chinese resources retain their original configuration and audience scope.
assert(!UI.resourcesFor(steinadler,seatTopic,'users',{seat:'ss'}).some(r=>r.type==='video'),'Double-seat videos are excluded from single-seat instructions');
assert(UI.resourcesFor(steinadler,seatTopic,'users',{seat:'ds'}).some(r=>r.type==='video'),'Matching installation videos are available');
assert(!UI.publishedResources(null,'users').some(r=>r.id.startsWith('service-video-')),'Qualified-service videos stay in dealer classification');
assert.equal(UI.searchTopics('underbody protection','users').resources.length,0,'Service video is excluded from customer search');
assert(UI.searchTopics('underbody protection','dealers').resources.length>0,'English dealer search can find the service video');
assert.equal(UI.publishedResources(null,'dealers').filter(r=>r.type==='video').length,9,'All nine Chinese-audio videos are available to dealers');
assert.equal(JSON.stringify(C.resources),sourceRecords,'English display metadata never changes the original records');
const emptyProduct=UI.pageFor(UI.parseRoute('#/product/luchs-a')).html;
assert(!emptyProduct.includes('resource-panel'),'Other products cannot inherit Steinadler materials');
const english=UI.pageFor(UI.parseRoute('#/library?audience=users&language=en&type=document')).html;
assert(english.includes('Steinadler Pro L7e-A1 user manual · V06'),'Current user manual is clearly identified as L7e-A1 V06');
assert(!english.includes('remote-control-manual-zh.docx'),'Language filter excludes Chinese original files');
assert.equal(projected.filter(r=>/^manual-(?:l7e|offroad)$/.test(r.id)).length,1,'Only the newer V06 vehicle manual is offered');
for(const audience of ['users','dealers'])for(const id of excludedIds)assert(!UI.searchTopics(englishCopy[id].title,audience).resources.some(r=>r.id===id),'Search cannot offer archived or duplicate documents');
const offroadFirstUse=UI.resourcesFor(steinadler,C.topics.find(x=>x.id==='first-use'),'users',{model:'offroad'});
assert(offroadFirstUse.some(r=>r.id==='first-use-offroad'),'Offroad online instructions remain available');
assert(!offroadFirstUse.some(r=>r.id==='manual-l7e'),'The newer L7e manual is not applied to Offroad vehicles');
const archivedReferences=offroadFirstUse.find(r=>r.id==='first-use-offroad').sourceRefs;
assert(archivedReferences.some(ref=>ref.title.includes('Archived reference') && !ref.url),'Archived source provenance remains as a citation without an obsolete download link');
assert.equal(UI.topicStatus(steinadler,C.topics.find(x=>x.id==='follow'),'users'),'Configuration enquiry','Following is not presented as a released operation tutorial');
assert.equal(UI.topicStatus(steinadler,C.topics.find(x=>x.id==='certificates'),'dealers'),'Available on request','Private certificates remain available by enquiry');
assert.equal(UI.topicStatus(steinadler,C.topics.find(x=>x.id==='spares'),'dealers'),'Parts enquiry','Spare-parts enquiry remains available');
for(const id of ['follow','certificates','spares']) {
  const topic=C.topics.find(x=>x.id===id), audience=id==='follow'?'users':'dealers';
  assert(!/[\u3400-\u9fff]/.test(UI.topicStatus(steinadler,topic,audience)),'Consultation status remains English with Chinese resources');
}
assert.equal(UI.topicStatus(C.products.find(x=>x.id==='luchs-a'),C.topics.find(x=>x.id==='follow'),'users'),'Not yet available','Other products cannot inherit consultation availability');
const attack='<img src=x onerror=alert(1)>';
const attacked=UI.pageFor(UI.parseRoute(UI.href('search',{q:attack}))).html;
assert(!attacked.includes(attack),'Query text must be escaped');
assert(attacked.includes('&lt;img'),'Escaped query remains readable');
const badConfig=UI.pageFor(UI.parseRoute('#/product/steinadler-pro/topic/charging?model='+encodeURIComponent(attack))).html;
assert(!badConfig.includes(attack),'Unknown config must not render');
assert.equal(UI.pageFor(UI.parseRoute('#/missing')).title,'Page not found','Unknown route has recovery page');
// Verify a fourth product can reuse all page templates without adding route code.
C.products.push({id:'extension-check',name:'Extension Check',code:'EC',family:'Check',label:'Product support',description:'Product extension check',status:'reserved',modelOptions:[],seatOptions:[],sectionIds:{users:['start'],dealers:['shared']},topicIds:['first-use']});
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
assert(index.includes('<html lang="en">'),'Document language is English');
assert(appElement.innerHTML.includes('Product support'),'Initial render runs');
assert(fs.readFileSync(path.join(root,'rj','support','styles.css'),'utf8').includes('@media'),'Responsive styles exist');
console.log(`Passed: ${routes.size} fully English page states, ${linkCount} internal navigation links, 40 retained original records, ${projected.length} active resources, 5 English downloads with V06 as the only current vehicle manual, no old/Chinese-file links across rendered states, preserved configuration/numerical values/provenance, 9 original-audio videos, 7 English caption tracks, filters, escaping, and new-product reuse.`);
