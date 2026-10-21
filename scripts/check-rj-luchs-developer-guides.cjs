'use strict';
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const crypto=require('node:crypto');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const support=path.join(root,'rj/support');
const baseline='c1a019aeecc102e73c452e58da8e7efe26d218cb';
function load(previous) {
  const app={innerHTML:''};
  const context={URLSearchParams,window:{location:{hash:'#/'},addEventListener(){},scrollTo(){}},document:{getElementById:id=>id==='app'?app:{focus(){}},addEventListener(){}}};
  vm.createContext(context);
  const names=['catalog.js','content.js','content-en.js','luchs.js','luchs-developer-guides.js',...(!previous?['product-media.js']:[]),'app.js'];
  for(const name of names) {
    const text=previous?execFileSync('git',['show',baseline+':rj/support/'+name],{cwd:root,encoding:'utf8'}):fs.readFileSync(path.join(support,name),'utf8');
    vm.runInContext(text,context,{filename:name});
  }
  return {C:context.window.RJSupportCatalog,UI:context.window.RJSupportUI};
}
const current=load(false),old=load(true);
const guides=current.C.resources.filter(r=>r.id.startsWith('luchs-dev-'));
assert.equal(guides.length,7,'Seven prepared developer guides');
const autonomyMediaLinks=[
  {type:'media-link',section:'photos',title:'View the autonomy kit sensor layout'},
  {type:'media-link',section:'video',title:'Watch Luchs B application and autonomy videos'}
];
const oldBOverview=old.C.resources.find(r=>r.id==='luchs-b-overview');
function withoutApprovedAutonomyLinks(resources) {
  return resources.map(resource=>{
    if(resource.id!=='luchs-b-overview')return resource;
    const blocks=resource.content[0].blocks,oldBlocks=oldBOverview.content[0].blocks;
    assert.equal(blocks.length,oldBlocks.length+autonomyMediaLinks.length,'Only two approved media links are appended to the B overview');
    assert.equal(JSON.stringify(blocks.slice(oldBlocks.length)),JSON.stringify(autonomyMediaLinks),'B overview appends exactly the approved gallery and video links');
    return {...resource,content:resource.content.map((section,index)=>index===0?{...section,blocks:blocks.slice(0,oldBlocks.length)}:section)};
  });
}
const changedIds=new Set(['luchs-ros1','luchs-ros2','luchs-dev-ros2-quick-start']);
const unchanged=resources=>resources.filter(r=>!changedIds.has(r.id));
assert.equal(JSON.stringify(unchanged(withoutApprovedAutonomyLinks(current.C.resources))),JSON.stringify(unchanged(old.C.resources)),'Every resource except the two authorised repositories, revised quick-start and two approved B overview media links is unchanged');
assert.equal(current.C.resources.length,old.C.resources.length,'No existing resource is removed or extra public record introduced');
for(const id of ['luchs-ros1','luchs-ros2']){
  const currentResource=current.C.resources.find(r=>r.id===id),oldResource=old.C.resources.find(r=>r.id===id);
  const allowed=new Set(['type','revision','sourceBaseline','sourceBaselinePublishedAt','repositoryRef','publishedAt','scope','displayStatus','content','assets','sourceRefs']);
  assert.equal(currentResource.sourceBaselinePublishedAt,oldResource.publishedAt,'Original source publication date is retained separately');
  assert.equal(currentResource.publishedAt,'2026-10-11','Preview publication date belongs to the new release');
  for(const key of Object.keys(oldResource))if(!allowed.has(key))assert.equal(JSON.stringify(currentResource[key]),JSON.stringify(oldResource[key]),'Repository preserves existing '+id+' '+key+' scope');
}
const currentQuickstart=current.C.resources.find(r=>r.id==='luchs-dev-ros2-quick-start');
const oldQuickstart=old.C.resources.find(r=>r.id==='luchs-dev-ros2-quick-start');
const guideChanges=new Set(['revision','editionLabel','scope','displayStatus','sourceSoftware','sourceFiles','content','assets','sourceRefs']);
for(const key of Object.keys(oldQuickstart))if(!guideChanges.has(key))assert.equal(JSON.stringify(currentQuickstart[key]),JSON.stringify(oldQuickstart[key]),'Quick-start retains existing '+key+' scope');
for(const key of ['audiences','sections','topics','developerModules'])assert.equal(JSON.stringify(current.C[key]),JSON.stringify(old.C[key]),'Existing '+key+' architecture is preserved');
const productScope=products=>products.map(({image,...rest})=>rest);
assert.equal(JSON.stringify(productScope(current.C.products)),JSON.stringify(productScope(old.C.products)),'Product identities, configurations and topic scope are preserved; new presentation images are checked separately');
assert.equal(JSON.stringify(current.C.resourceTypes.filter(t=>t.id!=='repository')),JSON.stringify(old.C.resourceTypes),'Existing resource types remain unchanged');
assert.equal(JSON.stringify(current.C.resourceTypes.filter(t=>t.id==='repository')),'[{"id":"repository","name":"Software repository"}]','Only the repository display type is added');
for(const audience of ['users','dealers']) {
  assert.equal(JSON.stringify(withoutApprovedAutonomyLinks(current.UI.publishedResources(null,audience))),JSON.stringify(old.UI.publishedResources(null,audience)),'Existing '+audience+' materials remain unchanged apart from the two approved B overview media links');
  for(const product of old.C.products)for(const topicId of product.topicIds) {
    const route=`#/product/${product.id}/topic/${topicId}?audience=${audience}`;
    let currentHtml=current.UI.pageFor(current.UI.parseRoute(route)).html;
    if(product.id==='luchs-b'&&topicId==='product-information')for(const link of autonomyMediaLinks){
      const url=`#/product/luchs-b/media?audience=${audience}&amp;section=${link.section}`;
      const paragraph=`<p><a class="button-secondary" href="${url}">${link.title}</a></p>`;
      assert.equal(currentHtml.split(paragraph).length-1,1,'Exactly one approved same-tab media link preserves the selected '+audience+' audience');
      currentHtml=currentHtml.replace(paragraph,'');
    }
    assert.equal(currentHtml,old.UI.pageFor(old.UI.parseRoute(route)).html,'Existing topic rendering remains unchanged apart from approved B overview links: '+route);
  }
}
const manifest=JSON.parse(fs.readFileSync(path.join(support,'files/luchs/guides/SOURCES.json'),'utf8'));
const oldManifest=JSON.parse(execFileSync('git',['show',baseline+':rj/support/files/luchs/guides/SOURCES.json'],{cwd:root,encoding:'utf8'}));
assert.equal(manifest.files.length,8,'Seven original PDF provenance records and the new quick-start revision are retained');
assert.equal(JSON.stringify(manifest.files.slice(0,7)),JSON.stringify(oldManifest.files),'All seven original PDF provenance records remain unchanged');
for(const key of ['sourceSoftware','sourceArchive','sourceArchiveSha256','licence'])assert.equal(JSON.stringify(manifest[key]),JSON.stringify(oldManifest[key]),'Original '+key+' provenance remains unchanged');
assert.equal(manifest.sourceSoftware,'1.1.0');
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
assert.equal(hash(fs.readFileSync(path.resolve(support,manifest.sourceArchive))),manifest.sourceArchiveSha256,'The prepared guides cite the unchanged public archive');
for(const entry of manifest.files){
  const bytes=fs.readFileSync(path.join(support,'files/luchs/guides',entry.file));
  assert.equal(bytes.length,entry.bytes,'Every historical and current PDF retains its recorded size');
  assert.equal(hash(bytes),entry.sha256,'Every historical and current PDF retains its recorded hash');
}
for(const g of guides) {
  const quickstart=g.id==='luchs-dev-ros2-quick-start';
  const revision=quickstart?'0.2':'0.1';
  const software=quickstart?'1.1.0-preview.1':'1.1.0';
  assert.equal(g.audiences.join(','),'developers');
  assert.equal(g.type,'developer');
  assert.equal(g.revision,revision,'Only the quick-start guide changes edition');
  assert.equal(g.sourceSoftware,software,'Preview and original software guide provenance are distinct');
  assert(g.sourceFiles.length>0);
  assert.equal(g.assets.length,1);
  assert.equal(g.assets[0].format,'PDF');
  const rendered=current.UI.pageFor(current.UI.parseRoute(`#/product/${g.productId}/topic/${g.topicId}?audience=developers&resource=${g.id}`)).html;
  assert(rendered.includes('Source software v'+software),'Software provenance is shown as software');
  assert.equal(g.editionLabel,quickstart?'Developer preview guide':'Developer guide','Only the quick-start receives the explicit preview guide label');
  assert(rendered.includes(g.editionLabel+' V'+revision),'Guide edition remains independent');
  assert(rendered.includes('class="content-code"'),'Examples are readable code blocks');
  assert(!/\p{Script=Han}/u.test(JSON.stringify(g)),'Prepared public copy is English');
  assert(!/_internal|step_part_map|REPORT_dev_package|INTERNAL/.test(JSON.stringify(g)),'No internal-source link or payload');
  for(const audience of ['users','dealers'])assert(!current.UI.searchTopics(g.title,audience).resources.some(r=>r.id===g.id),'Developer guides do not leak into other support areas');
  const entry=manifest.files.find(f=>f.resourceId===g.id&&(f.edition || oldManifest.edition)===revision);
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
const quickstart=guides.find(g=>g.id==='luchs-dev-ros2-quick-start');
assert.equal(quickstart.displayStatus,'Development preview','Quick-start is visibly a development preview');
const quickstartText=JSON.stringify(quickstart.content);
assert(quickstartText.includes('git clone')&&quickstartText.includes('luchs-v1.1.0-preview.1'),'Quick-start uses the fixed preview checkout');
assert(quickstartText.includes('dry_run'),'Quick-start starts with software-only dry run');
assert(quickstartText.includes('docs/luchs-development-manual.md'),'Quick-start links the matching version manual');
assert.equal(quickstart.assets[0].url,'./files/luchs/guides/Luchs_Developer_ros2_quick_start_EN_v0.2_20261011.pdf','Only the new quick-start PDF becomes current');
for(const name of fs.readdirSync(path.join(support,'files/luchs/guides')))assert(/^(?:Luchs_Developer_[a-z0-9_]+_EN_v0\.1_20261011\.pdf|Luchs_Developer_ros2_quick_start_EN_v0\.2_20261011\.pdf|SOURCES\.json|LICENSE\.txt)$/.test(name),'Only the seven original PDFs, revised quick-start, provenance and licence are public');
assert.equal(hash(fs.readFileSync(path.join(support,'files/luchs/guides/LICENSE.txt'))),manifest.licence.sha256);
assert.equal(current.UI.publishedResources(null,'developers').filter(r=>r.assets.some(a=>a.kind==='file')).length,23,'Developer Downloads contain sixteen source files and seven current prepared PDFs');
console.log('Passed: only two authorised GitHub repository entrances, the quick-start V0.2 and two same-tab B overview media links changed, seven developer-only guide records, eight verified current/historical PDFs, unchanged other records and user/dealer topic content, preserved source hashes and provenance, escaped examples, separate B draft/VCU scope, and 23 developer downloads.');
