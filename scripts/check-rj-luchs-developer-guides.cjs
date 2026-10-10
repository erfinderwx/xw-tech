'use strict';
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const crypto=require('node:crypto');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const support=path.join(root,'rj/support');
const baseline='5782c6ab3f11d01acdfb34047bd60d2bd3e092b7';
function load(previous) {
  const app={innerHTML:''};
  const context={URLSearchParams,window:{location:{hash:'#/'},addEventListener(){},scrollTo(){}},document:{getElementById:id=>id==='app'?app:{focus(){}},addEventListener(){}}};
  vm.createContext(context);
  const names=['catalog.js','content.js','content-en.js','luchs.js',...(previous?[]:['luchs-developer-guides.js']),'app.js'];
  for(const name of names) {
    const text=previous?execFileSync('git',['show',baseline+':rj/support/'+name],{cwd:root,encoding:'utf8'}):fs.readFileSync(path.join(support,name),'utf8');
    vm.runInContext(text,context,{filename:name});
  }
  return {C:context.window.RJSupportCatalog,UI:context.window.RJSupportUI};
}
const current=load(false),old=load(true);
const guides=current.C.resources.filter(r=>r.id.startsWith('luchs-dev-'));
assert.equal(guides.length,7,'Seven prepared developer guides');
assert.equal(JSON.stringify(current.C.resources.filter(r=>!r.id.startsWith('luchs-dev-'))),JSON.stringify(old.C.resources),'Every pre-existing resource record remains unchanged');
for(const key of ['audiences','products','sections','topics','developerModules','resourceTypes'])assert.equal(JSON.stringify(current.C[key]),JSON.stringify(old.C[key]),'Existing '+key+' architecture is preserved');
for(const audience of ['users','dealers']) {
  assert.equal(JSON.stringify(current.UI.publishedResources(null,audience)),JSON.stringify(old.UI.publishedResources(null,audience)),'Existing '+audience+' materials remain unchanged');
  for(const product of old.C.products)for(const topicId of product.topicIds) {
    const route=`#/product/${product.id}/topic/${topicId}?audience=${audience}`;
    assert.equal(current.UI.pageFor(current.UI.parseRoute(route)).html,old.UI.pageFor(old.UI.parseRoute(route)).html,'Existing topic rendering remains unchanged: '+route);
  }
}
const manifest=JSON.parse(fs.readFileSync(path.join(support,'files/luchs/guides/SOURCES.json'),'utf8'));
assert.equal(manifest.files.length,7);
assert.equal(manifest.sourceSoftware,'1.1.0');
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
assert.equal(hash(fs.readFileSync(path.resolve(support,manifest.sourceArchive))),manifest.sourceArchiveSha256,'The prepared guides cite the unchanged public archive');
for(const g of guides) {
  assert.equal(g.audiences.join(','),'developers');
  assert.equal(g.type,'developer');
  assert.equal(g.revision,'0.1');
  assert.equal(g.sourceSoftware,'1.1.0');
  assert(g.sourceFiles.length>0);
  assert.equal(g.assets.length,1);
  assert.equal(g.assets[0].format,'PDF');
  const rendered=current.UI.pageFor(current.UI.parseRoute(`#/product/${g.productId}/topic/${g.topicId}?audience=developers&resource=${g.id}`)).html;
  assert(rendered.includes('Source software v1.1.0'),'Software provenance is shown as software');
  assert(rendered.includes('Developer guide V0.1'),'Guide edition remains independent');
  assert(rendered.includes('class="content-code"'),'Examples are readable code blocks');
  assert(!/\p{Script=Han}/u.test(JSON.stringify(g)),'Prepared public copy is English');
  assert(!/_internal|step_part_map|REPORT_dev_package|INTERNAL/.test(JSON.stringify(g)),'No internal-source link or payload');
  for(const audience of ['users','dealers'])assert(!current.UI.searchTopics(g.title,audience).resources.some(r=>r.id===g.id),'Developer guides do not leak into other support areas');
  const entry=manifest.files.find(f=>f.resourceId===g.id);
  assert(entry);
  const bytes=fs.readFileSync(path.resolve(support,g.assets[0].url));
  assert.equal(bytes.length,entry.bytes);
  assert.equal(hash(bytes),entry.sha256);
  assert(bytes.subarray(0,5).toString()==='%PDF-','Prepared guide is a PDF, not a raw source file');
}
const integration=current.UI.pageFor(current.UI.parseRoute('#/product/luchs-a/topic/examples?audience=developers')).html;
assert(integration.includes('&lt;joint name='),'XML examples are escaped');
assert(!integration.includes('<joint name='),'XML examples cannot become markup');
const b=guides.find(g=>g.id==='luchs-dev-b-interface-reading');
assert.equal(b.displayStatus,'Draft interface reference');
assert(JSON.stringify(b.content).includes('default is not evidence'));
assert(JSON.stringify(b.content).includes('not measured stopping performance'));
for(const name of fs.readdirSync(path.join(support,'files/luchs/guides')))assert(/^(?:Luchs_Developer_[a-z0-9_]+_EN_v0\.1_20261011\.pdf|SOURCES\.json|LICENSE\.txt)$/.test(name),'Only prepared PDFs, provenance and licence are added');
assert.equal(hash(fs.readFileSync(path.join(support,'files/luchs/guides/LICENSE.txt'))),manifest.licence.sha256);
assert.equal(current.UI.publishedResources(null,'developers').filter(r=>r.assets.some(a=>a.kind==='file')).length,25,'Developer Downloads add seven prepared PDFs');
console.log('Passed: seven developer-only reading guides, seven verified PDFs, unchanged existing records and all user/dealer topics, public-source provenance, escaped examples, separate B draft/VCU scope, and 25 developer downloads.');
