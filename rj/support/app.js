(function () {
  'use strict';
  const C = window.RJSupportCatalog;
  const app = document.getElementById('app');
  const e = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const paths = {
    user:'<circle cx="12" cy="7" r="3.5"/><path d="M5 21v-3a7 7 0 0 1 14 0v3"/>',
    briefcase:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V3h8v4M3 12c5 3 13 3 18 0M10 13h4"/>',
    code:'<path d="m8 5-6 7 6 7m8-14 6 7-6 7M14 3l-4 18"/>',
    search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
    chevron:'<path d="m9 5 7 7-7 7"/>',
    external:'<path d="M14 3h7v7m0-7-10 10M10 4H4v16h16v-6"/>',
    menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
    close:'<path d="m5 5 14 14M19 5 5 19"/>',
    flag:'<path d="M4 22V3h15l-3 5 3 5H4"/>',
    control:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="white"/><circle cx="15" cy="17" r="3" fill="white"/>',
    layers:'<path d="m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 17l10 5 10-5"/>',
    signal:'<circle cx="12" cy="13" r="2"/><path d="M12 15v7M6 7a8 8 0 0 0 0 12M18 7a8 8 0 0 1 0 12M3 4a12 12 0 0 0 0 18M21 4a12 12 0 0 1 0 18"/>',
    tool:'<path d="M14 4a6 6 0 0 0-7 8L2 17l5 5 6-6a6 6 0 0 0 8-7l-4 4-6-6 3-3Z"/>',
    play:'<path d="m9 5 11 7-11 7V5Z"/>',
    shield:'<path d="m12 2 9 4v6c0 5-5 9-9 11-4-2-9-6-9-11V6l9-4Z"/><path d="m8 12 3 3 5-6"/>',
    box:'<path d="m12 2 10 5v12l-10 5-10-5V7l10-5ZM2 7l10 5 10-5M12 12v12M7 4.5l10 5"/>',
    book:'<path d="M12 5C9 2 4 2 2 3v16c4-1 7 0 10 2 3-2 6-3 10-2V3c-2-1-7-1-10 2ZM12 5v16"/>',
    link:'<path d="m10 14 4-4M8 16l-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m2 10a4 4 0 0 0 6 0l5-5a4 4 0 0 0-6-6l-2 2" transform="translate(1 0) scale(.9)"/>',
    plug:'<path d="M8 2v6m8-6v6M5 8h14v4a7 7 0 0 1-14 0V8ZM12 19v4"/>',
    battery:'<rect x="2" y="6" width="18" height="12" rx="2"/><path d="M23 10v4m-11-6-3 5h5l-3 4"/>',
    monitor:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M12 17v5m-5 0h10"/>',
    help:'<circle cx="12" cy="12" r="10"/><path d="M9 8a3 3 0 0 1 6 0c0 3-3 2-3 5m0 4h.01"/>',
    file:'<path d="M14 2H4v20h16V8l-6-6ZM14 2v6h6M8 12h8M8 16h8"/>',
    grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    terminal:'<rect x="2" y="3" width="20" height="18" rx="2"/><path d="m6 8 4 4-4 4m7 1h5"/>',
    history:'<path d="M3 7v6h6M3 12a9 9 0 1 1 2 6M12 7v6l4 2"/>',
    info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v6m0-10h.01"/>',
    folder:'<path d="M2 6V3h7l3 3h10v15H2V6Z"/>',
    image:'<rect x="2" y="3" width="20" height="18" rx="2"/><circle cx="8" cy="8" r="2"/><path d="m2 17 6-5 4 4 4-7 6 8"/>'
  };
  function icon(name, cls) { return `<svg ${cls ? `class="${e(cls)}" ` : ''}viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[name] || paths.file}</svg>`; }
  function href(path, query) {
    const qs = new URLSearchParams();
    Object.entries(query || {}).forEach(([key, value]) => { if (value && value !== 'all') qs.set(key, value); });
    return '#/' + path.replace(/^\//, '') + (qs.size ? '?' + qs.toString() : '');
  }
  function parseRoute(hash) {
    const raw = String(hash || '#/').replace(/^#\/?/, '');
    const split = raw.indexOf('?');
    const path = split < 0 ? raw : raw.slice(0, split);
    const params = new URLSearchParams(split < 0 ? '' : raw.slice(split + 1));
    return {path, parts:path.split('/').filter(Boolean), params};
  }
  function roleOf(route) {
    if (route.parts[0] === 'dealers') return 'dealers';
    if (route.parts[0] === 'developers') return 'developers';
    return route.params.get('audience') === 'dealers' ? 'dealers' : 'users';
  }
  const productOf = id => C.products.find(p => p.id === id);
  const topicOf = id => C.topics.find(t => t.id === id);
  const sectionOf = id => C.sections.find(s => s.id === id);
  const audienceName = id => (C.audiences.find(a => a.id === id) || C.audiences[0]).name;
  const typeName = id => (C.resourceTypes.find(t => t.id === id) || {}).name || '资料';
  function queryFor(route, audience) {
    return {audience:audience || roleOf(route), model:route.params.get('model'), seat:route.params.get('seat')};
  }
  function validConfig(product, route) {
    const q = queryFor(route);
    q.model = product.modelOptions.some(x => x.id === q.model) ? q.model : null;
    q.seat = product.seatOptions.some(x => x.id === q.seat) ? q.seat : null;
    return q;
  }
  function productHref(product, audience, extra) { return href('product/' + product.id, {audience, ...(extra || {})}); }
  function topicHref(product, topic, audience, extra) { return href(`product/${product.id}/topic/${topic.id}`, {audience, ...(extra || {})}); }
  const languageName = id => ({'zh-CN':'中文','en':'English','de-DE':'Deutsch'}[id] || id);
  function publishedResources(product, audience) {
    return C.resources.filter(r => r.status === 'published' && r.visibility === 'public' && r.audiences.includes(audience) && (!product || r.productId === product.id));
  }
  function matchesConfig(resource, q) {
    return (!q.model || !resource.modelIds?.length || resource.modelIds.includes(q.model)) && (!q.seat || !resource.seatIds?.length || resource.seatIds.includes(q.seat));
  }
  function resourcesFor(product, topic, audience, q) {
    return publishedResources(product,audience).filter(r => matchesConfig(r,q || {}) && (topic.id === 'manuals' ? r.type === 'document' : topic.id === 'videos' ? r.type === 'video' : r.topicId === topic.id || r.relatedTopicIds?.includes(topic.id)));
  }
  function topicStatus(product, topic, audience, q) {
    const all = resourcesFor(product,topic,audience,{});
    const matching = all.filter(r => matchesConfig(r,q || {}));
    if (!matching.length) return all.length ? '其他配置资料' : '尚未发布';
    const available = matching.find(r => !r.displayStatus);
    return available ? '可查看' : matching[0].displayStatus;
  }
  function resourceScope(resource, product) {
    const config = [ ...(resource.modelIds || []).map(id => product.modelOptions.find(x=>x.id === id)?.name), ...(resource.seatIds || []).map(id => product.seatOptions.find(x=>x.id === id)?.name) ].filter(Boolean);
    return config.join(' / ') || '按交付配置使用';
  }
  function fileOriginLabel(asset) {
    return ({original:'原始文件',derived:'整理生成图示',reference:'官网参考文件'})[asset.origin] || '下载文件';
  }
  function assetButtons(resource) {
    return (resource.assets || []).map(a => a.kind === 'file' ? `<a class="button-secondary" href="${e(a.url)}" target="_blank" rel="noopener noreferrer" download>${icon('file')} ${e(a.label || '下载')} · ${e(a.format)} · ${e(fileOriginLabel(a))}</a>` : a.guideUrl ? `<a class="text-link" href="${e(a.guideUrl)}" target="_blank" rel="noopener noreferrer">查看完整阶段说明 ${icon('external')}</a>` : '').join('');
  }
  function renderBlock(block) {
    if (block.type === 'p') return `<p>${e(block.text)}</p>`;
    if (block.type === 'note') return `<div class="content-note">${icon('info')}<p>${e(block.text)}</p></div>`;
    if (block.type === 'list' || block.type === 'steps') { const tag = block.type === 'steps' ? 'ol' : 'ul'; return `<${tag} class="${block.type === 'steps' ? 'content-steps' : 'content-list'}">${block.items.map(x=>`<li>${e(x)}</li>`).join('')}</${tag}>`; }
    if (block.type === 'table') return `<div class="content-table"><table><thead><tr>${block.headers.map(x=>`<th>${e(x)}</th>`).join('')}</tr></thead><tbody>${block.rows.map(row=>`<tr>${row.map(x=>`<td>${e(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    if (block.type === 'image') return `<figure class="content-figure"><div class="figure-image"><img src="${e(block.src)}" alt="${e(block.caption)}" loading="lazy">${block.overlays?.length ? `<svg class="figure-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${block.overlays.map(o=>`<ellipse cx="${e(o.x)}" cy="${e(o.y)}" rx="${e(o.r)}" ry="${e(o.r*727/534)}"/><text x="${e(o.x)}" y="${e(o.y)}">${e(o.label)}</text>`).join('')}</svg>` : ''}</div><figcaption>${e(block.caption)}</figcaption></figure>`;
    if (block.type === 'link') return `<p><a class="button-secondary" href="${e(block.url)}" target="_blank" rel="noopener noreferrer">${e(block.title)} ${icon('external')}</a></p>`;
    return '';
  }
  function resourceBody(resource, product, selected) {
    return `<section class="resource-panel${selected === resource.id ? ' selected' : ''}" id="resource-${e(resource.id)}"><div class="resource-head"><div><span class="badge dark">${e(resourceScope(resource,product))}</span><h2>${e(resource.title)}</h2></div><span class="resource-language">${e(languageName(resource.language))}</span></div>${resource.scope ? `<p class="resource-scope">${e(resource.scope)}</p>` : ''}${resource.content.map(s=>`<section class="content-section"><h3>${e(s.title)}</h3>${s.blocks.map(renderBlock).join('')}</section>`).join('')}${resource.assets.filter(a=>a.kind === 'video').map(a=>`<div class="content-video"><video controls playsinline preload="none" ${a.poster ? `poster="${e(a.poster)}"` : ''} aria-label="${e(resource.title)}"><source src="${e(a.url)}" type="video/mp4">${a.captions ? `<track kind="captions" src="${e(a.captions)}" srclang="zh" label="中文 / English" default>` : ''}浏览器无法播放视频，请使用下方链接打开。</video><div class="video-meta"><span>${e(a.duration)} · ${e(a.audio)}</span><a class="text-link" href="${e(a.url)}" target="_blank" rel="noopener noreferrer">打开视频 ${icon('external')}</a></div></div>`).join('')}<div class="resource-actions">${assetButtons(resource)}</div>${resource.sourceRefs?.length ? `<details class="resource-sources"><summary>相关原资料</summary>${resource.sourceRefs.map(s=>s.url ? `<a href="${e(s.url)}" target="_blank" rel="noopener noreferrer">${e(s.title)} ${icon('external')}</a>` : `<span>${e(s.title)}</span>`).join('')}</details>` : ''}</section>`;
  }
  function resourceCard(resource, audience) {
    const product = productOf(resource.productId), topic = topicOf(resource.topicId);
    return `<article class="result-card resource-card">${icon(resource.type === 'video' ? 'play' : resource.type === 'document' ? 'file' : topic.icon)}<div><a class="result-title" href="${e(topicHref(product,topic,audience,{resource:resource.id}))}"><h3>${e(resource.title)}</h3></a><p>${e(resource.scope || product.name)}</p><div class="result-meta">${e(product.name)} · ${e(typeName(resource.type))} · ${e(languageName(resource.language))}${resource.type === 'document' ? ' · ' + e(resource.revision) : ''}</div><div class="resource-card-actions">${assetButtons(resource)}</div></div></article>`;
  }
  function crumb(items) {
    return `<nav class="breadcrumb" aria-label="当前位置"><a href="#/">支持首页</a>${items.map(x => icon('chevron') + (x.url ? `<a href="${e(x.url)}">${e(x.label)}</a>` : `<span aria-current="page">${e(x.label)}</span>`)).join('')}</nav>`;
  }
  function searchForm(audience, query, dialog) {
    return `<form class="searchbox" data-search-form role="search"><input type="hidden" name="audience" value="${e(audience)}">${icon('search')}<input name="q" type="search" aria-label="搜索产品或资料主题" placeholder="搜索产品、操作、配件或资料主题" value="${e(query || '')}" ${dialog ? 'id="dialog-search"' : ''}><button type="submit">搜索</button></form>`;
  }
  function shell(body, route) {
    const active = route.parts[0] || 'home';
    const role = roleOf(route);
    const links = [['home','支持首页',''],['users','用户支持','users'],['dealers','代理商专区','dealers'],['developers','开发者资料','developers'],['library','视频与下载','library']];
    return `<header class="site-header"><div class="wrap header-inner"><a class="brand" href="#/" aria-label="RJ Tech 使用与支持首页"><span class="brand-mark"></span><span><strong>RJ TECH</strong><small>SUPPORT CENTER</small></span></a>
    <nav class="main-nav" id="main-nav" aria-label="主导航">${links.map(([id,name,path]) => `<a class="nav-link${active === id || (active === 'product' && role === id) ? ' active' : ''}" ${active === id ? 'aria-current="page"' : ''} href="${e(href(path, id === 'library' ? {audience:role === 'developers' ? 'users' : role} : null))}">${name}${id === 'developers' ? '<em>暂未开放</em>' : ''}</a>`).join('')}</nav>
    <div class="header-actions"><button class="icon-button" data-action="search" aria-label="打开搜索">${icon('search')}</button><a class="official-link" href="https://www.rjtech-offroad.com/" target="_blank" rel="noopener noreferrer">品牌官网 ↗</a><button class="icon-button menu-toggle" data-action="menu" aria-controls="main-nav" aria-expanded="false" aria-label="展开导航">${icon('menu')}</button></div></div></header>
    <main id="main" tabindex="-1">${body}</main>
    <footer class="footer"><div class="wrap footer-inner"><div><strong>RJ TECH</strong><span>产品使用与技术支持</span></div><nav class="footer-links" aria-label="页脚导航"><a href="#/users">用户支持</a><a href="#/dealers">代理商专区</a><a href="../">电池更换与接线指南</a></nav></div></footer>
    <dialog class="search-dialog" id="search-dialog" aria-labelledby="search-dialog-title"><div class="dialog-top"><span id="search-dialog-title">搜索${role === 'dealers' ? '代理商' : '用户'}资料主题</span><button data-action="close-search" aria-label="关闭搜索">${icon('close')}</button></div>${searchForm(role === 'dealers' ? 'dealers' : 'users', '', true)}<p>可搜索产品型号、操作、配件及维护相关主题。</p></dialog>`;
  }
  function productsGrid(audience) {
    return `<div class="product-grid">${C.products.map(p => {const ready = audience !== 'developers' && publishedResources(p,audience).length; return `<a class="product-card" href="${e(audience === 'developers' ? href('developers',{product:p.id}) : productHref(p,audience))}"><div class="product-visual" aria-hidden="true"><small>${e(p.family.toUpperCase())}</small><span class="product-code">${e(p.code)}</span><span class="badge${ready ? ' red' : ' gray'}">${ready ? '查看资料' : '资料准备中'}</span></div><div class="product-body"><h3>${e(p.name)}</h3><p>${e(p.description)}</p><div class="card-footer"><span>${e(p.label)}</span>${icon('arrow')}</div></div></a>`;}).join('')}</div>`;
  }
  function quickLinks(audience) {
    const p = C.products[0];
    const ids = audience === 'dealers' ? ['certificates','installation','delivery','repair'] : ['first-use','charging','seat-footrest','follow'];
    return `<div class="quick-grid">${ids.filter(id => p.topicIds.includes(id)).map(id => {const t = topicOf(id);return `<a class="quick-item" href="${e(topicHref(p,t,audience))}">${icon(t.icon)}<span>${e(t.title)}</span>${icon('chevron','end')}</a>`;}).join('')}</div>`;
  }
  function homepage() {
    const product = C.products[0];
    return `<section class="hero"><div class="wrap hero-grid"><div><p class="eyebrow">RJ TECH / PRODUCT SUPPORT</p><h1>使用与支持，<br>从这里开始。</h1><p class="lede">查找车辆操作、配件安装和维护保养说明。<br>选择您的产品，了解需要的使用主题。</p>${searchForm('users')}</div><div class="hero-rail"><a class="hero-rail-item" href="${e(productHref(product,'users'))}">${icon('book')}<div><b>开始使用</b><p>首次使用、充电与日常操作</p></div></a><a class="hero-rail-item" href="${e(productHref(product,'users',{section:'accessories'}))}">${icon('layers')}<div><b>配件与加装</b><p>座椅、脚踏、拖挂与增程器</p></div></a><a class="hero-rail-item" href="${e(productHref(product,'users',{section:'care'}))}">${icon('tool')}<div><b>维护与排障</b><p>日常保养、检查与常见问题</p></div></a></div></div></section>
    <section class="section"><div class="wrap"><div class="section-header"><div><h2>选择您的资料入口</h2><p>车辆使用与售后服务，请选择相应入口。</p></div></div><div class="audience-grid">${C.audiences.filter(a => a.status === 'active').map(a => `<a class="audience-card" href="${e(href(a.id))}"><span class="audience-icon">${icon(a.icon)}</span><div><span class="card-eyebrow">${a.en}</span><h3>${e(a.name)}</h3><p>${e(a.summary)}</p><span class="arrow-end">进入${a.name} ${icon('arrow')}</span></div></a>`).join('')}</div><div class="planned-row">${icon('code')}<div><b>开发者资料</b> <span class="badge gray">暂未开放</span><p>接口、通信协议与开发工具相关资料。</p></div><a class="text-link" href="#/developers">了解详情 ${icon('arrow')}</a></div></div></section>
    <section class="section tint"><div class="wrap"><div class="section-header"><div><h2>按产品查找</h2><p>选择您的产品型号。</p></div><a class="text-link" href="#/users">查看用户支持 ${icon('arrow')}</a></div>${productsGrid('users')}</div></section>
    <section class="section"><div class="wrap"><div class="section-header"><div><h2>常用主题</h2><p>快速找到首次使用、充电、配件安装和功能说明。</p></div></div>${quickLinks('users')}</div></section>`;
  }
  function audiencePage(audience) {
    const a = C.audiences.find(x => x.id === audience);
    const dealer = audience === 'dealers';
    const modules = ['certification','handover','service','training'].map(sectionOf);
    return `<div class="wrap">${crumb([{label:a.name}])}<section class="page-head"><div class="head-row"><div><p class="eyebrow">${a.en}</p><h1>${e(a.title)}</h1><p class="lede">${dealer ? '选择您的产品，查找认证资料、安装交付说明、维修备件和技术培训。' : '选择您的产品，查找操作说明、配件使用、维护保养和常见问题。'}</p></div></div></section></div>
    <section class="section"><div class="wrap"><div class="section-header"><div><h2>选择产品</h2><p>选择您需要了解的产品型号。</p></div></div>${productsGrid(audience)}</div></section>
    <section class="section tint"><div class="wrap"><div class="section-header"><div><h2>${dealer ? '代理商常用资料' : '从常用主题开始'}</h2><p>${dealer ? '认证资料、安装交付、维修备件与技术培训。' : '首次使用、充电、配件安装与功能使用。'}</p></div><a class="text-link" href="${e(href('library',{audience}))}">视频与下载 ${icon('arrow')}</a></div>${dealer ? `<div class="dealer-modules">${modules.map(s => `<a class="module-card" href="${e(productHref(C.products[0],audience,{section:s.id}))}">${icon(s.icon)}<h3>${e(s.title)}</h3><p>${e(s.description)}</p><span class="text-link">查看目录 ${icon('arrow')}</span></a>`).join('')}</div><div class="certificate-panel"><div class="certificate-icon">${icon('shield')}</div><div><h3>获取产品认证资料</h3><p>如需产品认证证书，请联系 RJ Tech，并说明产品型号、车型和所需证书。</p></div><a class="button-secondary" href="${e(topicHref(C.products[0],topicOf('certificates'),'dealers'))}">查看证书获取方式 ${icon('arrow')}</a></div>` : quickLinks(audience)}</div></section>`;
  }
  function roleSwitch(product, audience, route) {
    const q = validConfig(product,route);
    return `<nav class="role-switch" aria-label="选择资料分类"><span>资料入口</span>${['users','dealers'].map(id => `<a class="${id === audience ? 'active' : ''}" href="${e(productHref(product,id,{model:q.model,seat:q.seat}))}" ${id === audience ? 'aria-current="page"' : ''}>${audienceName(id)}</a>`).join('')}</nav>`;
  }
  function options(items, chosen, allLabel) { return `<option value="all">${e(allLabel || '全部')}</option>${items.map(x => `<option value="${e(x.id)}"${chosen === x.id ? ' selected' : ''}>${e(x.name)}</option>`).join('')}`; }
  function configBar(product, route) {
    const q = validConfig(product,route);
    if (!product.modelOptions.length && !product.seatOptions.length) return '';
    const parts = `${product.modelOptions.length ? `<div class="form-group"><label for="model-choice">车型</label><select id="model-choice" name="model" data-route-filter>${options(product.modelOptions,q.model,'全部车型')}</select></div>` : ''}${product.seatOptions.length ? `<div class="form-group"><label for="seat-choice">座位配置</label><select id="seat-choice" name="seat" data-route-filter>${options(product.seatOptions,q.seat,'全部配置')}</select></div>` : ''}`;
    return `<div class="config-bar">${parts}<span class="badge gray">请按您的车辆配置选择</span></div>`;
  }
  function topicsFor(product, audience, sectionId) {
    return C.topics.filter(t => product.topicIds.includes(t.id) && t.audiences.includes(audience) && (sectionId === 'shared' ? t.audiences.includes('users') : t.sectionId === sectionId));
  }
  function sideNav(product, audience, route, doc) {
    const q = validConfig(product,route);
    const active = doc ? (doc.audiences.includes('users') && audience === 'dealers' ? 'shared' : doc.sectionId) : route.params.get('section');
    return `<aside class="${doc ? 'doc-nav' : 'side-nav'}" aria-label="产品主题目录"><p class="side-label">${e(product.name.toUpperCase())}</p><a class="side-item${!active ? ' active' : ''}" href="${e(productHref(product,audience,q))}">${icon('grid')}全部主题</a>${(product.sectionIds[audience] || []).map(id => {const s = sectionOf(id);return `<a class="side-item${active === id ? ' active' : ''}" href="${e(productHref(product,audience,{...q,section:id}))}">${icon(s.icon)}${e(s.title)}</a>`;}).join('')}<p class="side-note">选择您需要了解的操作、配件或维护主题。</p></aside>`;
  }
  function productPage(product, route) {
    const audience = roleOf(route), q = validConfig(product,route);
    const selected = route.params.get('section'), all = product.sectionIds[audience] || [];
    const sections = (all.includes(selected) ? [selected] : all).map(sectionOf);
    const ready = publishedResources(product,audience).some(r=>matchesConfig(r,q));
    return `<div class="wrap">${crumb([{label:audienceName(audience),url:href(audience)},{label:product.name}])}<section class="page-head"><div class="head-row"><div><p class="eyebrow">${e(product.family)} / ${audience === 'dealers' ? 'DEALER RESOURCES' : 'USER SUPPORT'}</p><h1>${e(product.name)}</h1><p class="lede">${audience === 'dealers' ? '查找本产品的认证资料、安装交付说明、维修备件与技术培训。' : '选择您的车型和配置，查找操作、配件、功能与维护相关资料。'}</p></div>${roleSwitch(product,audience,route)}</div></section>${configBar(product,route)}<div class="product-layout">${sideNav(product,audience,route)}<div>${ready ? `<div class="catalog-note">${icon('info')}<p>选择车型与座位配置后，页面只显示适用资料。安装套件、遥控器和充电器仍需与交付设备核对。</p></div>` : `<div class="empty-note">${icon('info')}<p><strong>本产品资料正在准备中。</strong> 如需具体说明，请联系 RJ Tech。</p></div>`}<div class="section-grid">${sections.map(s => {const topics = topicsFor(product,audience,s.id);return `<section class="section-card"><div class="section-card-head">${icon(s.icon)}<div><h3>${e(s.title)}</h3><p>${e(s.description)}</p></div></div><div class="topic-list">${topics.length ? topics.map(t => `<a class="topic-item" href="${e(topicHref(product,t,audience,q))}">${icon(t.icon)}<span>${e(t.title)}</span><span class="mini${resourcesFor(product,t,audience,q).length ? ' available' : ''}">${e(topicStatus(product,t,audience,q))}</span>${icon('chevron')}</a>`).join('') : '<p class="design-note" style="padding:8px 7px;margin:0">此分类暂无公开资料。</p>'}</div></section>`;}).join('')}</div></div></div></div>`;
  }
  function topicPage(product, topic, route) {
    const audience = roleOf(route), q = validConfig(product,route);
    const resources = resourcesFor(product,topic,audience,q);
    const otherConfig = resourcesFor(product,topic,audience,{}).length && !resources.length;
    const chosen = route.params.get('resource');
    resources.sort((a,b) => (b.id === chosen) - (a.id === chosen) || ({guide:0,accessory:0,function:0,service:0,training:0,certificate:0,video:1,document:2}[a.type] || 0) - ({guide:0,accessory:0,function:0,service:0,training:0,certificate:0,video:1,document:2}[b.type] || 0));
    const names = [product.name, ...(q.model ? [product.modelOptions.find(x=>x.id===q.model).name] : []), ...(q.seat ? [product.seatOptions.find(x=>x.id===q.seat).name] : [])];
    const files = resources.filter(r=>r.assets.some(a=>a.kind === 'file'));
    const videos = resources.filter(r=>r.type === 'video');
    const contact = `<a class="button-secondary" href="mailto:sales@rjtech-offroad.com">联系 RJ Tech ${icon('external')}</a>`;
    return `<div class="wrap">${crumb([{label:audienceName(audience),url:href(audience)},{label:product.name,url:productHref(product,audience,q)},{label:topic.title}])}${configBar(product,route)}<div class="doc-layout">${sideNav(product,audience,route,topic)}<article class="doc-content"><p class="doc-kicker">${e(product.name)} / ${e(typeName(topic.kind))}</p><h1>${e(topic.title)}</h1><p class="doc-description">${e(topic.summary)}</p><div class="metadata">${names.map(n=>`<span class="badge dark">${e(n)}</span>`).join('')}<span class="badge${resources.length ? ' red' : ' gray'}">${e(topicStatus(product,topic,audience,q))}</span></div>${resources.length ? resources.map(r=>resourceBody(r,product,chosen)).join('') : `<section class="doc-slot"><h2>${otherConfig ? '此资料适用于其他配置' : '本主题说明暂未发布'}</h2><p>${otherConfig ? '请调整上方车型或座位筛选，查看对应资料。当前配置的安装与操作要求请向交付代理商确认。' : '如需本主题的使用说明，请联系 RJ Tech，并说明产品型号和车辆配置。'}</p>${otherConfig ? `<a class="button-secondary" href="${e(topicHref(product,topic,audience))}">查看全部配置 ${icon('arrow')}</a>` : contact}</section>`}</article><aside class="doc-aside" aria-label="相关资料"><section class="aside-box"><h3>本主题资料</h3>${resources.length ? `<p>${resources.filter(r=>r.content.length).length} 项在线说明 · ${videos.length} 段视频 · ${files.length} 份文件</p><ul class="aside-index">${resources.map(r=>`<li><a href="${e(topicHref(product,topic,audience,{...q,resource:r.id}))}">${e(r.title)}</a></li>`).join('')}</ul>` : '<p>请根据车辆配置查看资料或联系支持。</p>'}</section>${files.length ? `<section class="aside-box"><h3>下载文件</h3>${files.map(r=>`<a class="aside-file" href="${e(r.assets.find(a=>a.kind==='file').url)}" target="_blank" rel="noopener noreferrer">${icon('file')}<span>${e(r.title)}<small>${e(languageName(r.language))} · ${e(r.assets.find(a=>a.kind==='file').format)} · ${e(fileOriginLabel(r.assets.find(a=>a.kind==='file')))}</small></span></a>`).join('')}</section>` : ''}<section class="aside-box"><h3>需要帮助</h3><p>请提供产品型号、VIN 和配件照片，便于核对适用配置。</p><a class="text-link" href="mailto:sales@rjtech-offroad.com">联系 RJ Tech ${icon('external')}</a></section><section class="aside-box"><h3>继续查找</h3><a class="text-link" href="${e(productHref(product,audience,q))}">返回产品资料 ${icon('arrow')}</a></section></aside></div></div>`;
  }
  function developerPage(route) {
    const selected = productOf(route.params.get('product'));
    return `<div class="wrap">${crumb([{label:'开发者资料'}])}<section class="page-head"><div class="planned-hero"><p class="eyebrow">DEVELOPER RESOURCES</p><span class="badge gray">暂未开放</span></div><h1>开发者资料</h1><p class="lede">开发者资料暂未开放。如需了解产品接口、通信协议或集成资料，请联系 RJ Tech。${selected ? '<br>所选产品：' + e(selected.name) : ''}</p><a class="button-secondary" href="https://www.rjtech-offroad.com/" target="_blank" rel="noopener noreferrer">联系 RJ Tech ${icon('external')}</a></section></div><section class="section"><div class="wrap"><div class="section-header"><div><h2>开发与集成${selected ? ' · ' + e(selected.name) : ''}</h2><p>以下资料暂未开放。</p></div></div><div class="developer-grid">${C.developerModules.map(m => `<div class="module-card">${icon(m.icon)}<h3>${e(m.title)}</h3><p>${e(m.description)}</p><span class="badge gray" style="margin-top:18px">暂未开放</span></div>`).join('')}</div></div></section><section class="section tint"><div class="wrap"><div class="section-header"><div><h2>选择产品</h2><p>联系时请注明产品型号和您的集成需求。</p></div></div>${productsGrid('developers')}</div></section>`;
  }
  function filterSelect(name, label, items, chosen) {
    return `<div class="filter-group"><label for="filter-${e(name)}">${e(label)}</label><select id="filter-${e(name)}" name="${e(name)}" data-route-filter>${options(items,chosen)}</select></div>`;
  }
  function libraryPage(route) {
    const audience = roleOf(route), product = productOf(route.params.get('product'));
    const type = route.params.get('type'), language = route.params.get('language');
    const allowedTypes = C.resourceTypes.filter(t => audience === 'dealers' || !['certificate','service','training'].includes(t.id));
    const topics = C.topics.filter(t=>t.audiences.includes(audience) && (product ? product.topicIds.includes(t.id) : C.products.some(p=>p.topicIds.includes(t.id))) && (!type || type === 'all' || t.kind === type));
    const resources = publishedResources(product,audience).filter(r=>(!type || type === 'all' || r.type === type) && (!language || language === 'all' || r.language === language));
    const files = resources.filter(r=>r.type === 'document').length, videos = resources.filter(r=>r.type === 'video').length;
    return `<div class="wrap">${crumb([{label:'视频与下载'}])}<section class="page-head"><div class="head-row"><div><p class="eyebrow">VIDEOS & DOWNLOADS</p><h1>视频与下载</h1><p class="lede">按产品、资料类型和语言查找操作视频、下载文件和在线说明。</p></div></div></section><div class="filter-panel">${filterSelect('audience','资料分类',[{id:'users',name:'用户支持'},{id:'dealers',name:'代理商专区'}],audience).replace('<option value="all">全部</option>','')}${filterSelect('product','产品',C.products.map(p=>({id:p.id,name:p.name})),product?.id)}${filterSelect('type','资料类型',allowedTypes,type)}${filterSelect('language','语言',[{id:'zh-CN',name:'中文'},{id:'de-DE',name:'Deutsch'},{id:'en',name:'English'}],language)}</div><div class="results-bar"><span>${e(audienceName(audience))} ${product ? ' / ' + e(product.name) : '/ 全部产品'}</span><span>${resources.length} 项资料 · ${videos} 段视频 · ${files} 份文件</span></div>${resources.length ? `<div class="topic-results">${resources.map(r=>resourceCard(r,audience)).join('')}</div>` : `<div class="empty-state">${icon('folder')}<h2>没有符合筛选条件的资料</h2><p>请调整产品、资料类型或语言。尚未发布的资料可联系 RJ Tech 获取帮助。</p></div>`}<section class="section"><div class="section-header"><div><h2>按主题查找</h2><p>选择您需要了解的操作、配件或维护主题。</p></div></div><div class="topic-results">${topics.map(t=>{const p=product || C.products.find(p=>p.topicIds.includes(t.id));return `<a class="result-card" href="${e(topicHref(p,t,audience))}">${icon(t.icon)}<div><h3>${e(t.title)}</h3><p>${e(t.summary)}</p><div class="result-meta">${e(p.name)} · ${e(typeName(t.kind))} · ${e(topicStatus(p,t,audience))}</div></div></a>`;}).join('') || '<p class="design-note">没有符合这些筛选条件的主题。</p>'}</div></section></div>`;
  }
  function searchTopics(query, audience) {
    const normalized = String(query || '').trim().toLocaleLowerCase();
    if (!normalized) return {products:[],topics:[],resources:[]};
    const words = normalized.split(/\s+/);
    const matches = value => words.every(w=>value.toLocaleLowerCase().includes(w));
    return {
      products:C.products.filter(p=>matches(`${p.name} ${p.family} ${p.code}`)),
      topics:C.products.flatMap(p=>C.topics.filter(t=>p.topicIds.includes(t.id) && t.audiences.includes(audience) && matches(`${p.name} ${t.title} ${t.summary} ${typeName(t.kind)}`)).map(t=>({product:p,topic:t}))),
      resources:publishedResources(null,audience).filter(r=>matches(`${productOf(r.productId).name} ${r.title} ${r.scope} ${typeName(r.type)} ${JSON.stringify(r.content)}`))
    };
  }
  function searchPage(route) {
    const audience = roleOf(route), query = (route.params.get('q') || '').slice(0,200);
    const results = searchTopics(query,audience);
    const count = results.products.length + results.topics.length + results.resources.length;
    return `<div class="wrap">${crumb([{label:'搜索'}])}<section class="page-head"><p class="eyebrow">SEARCH SUPPORT</p><h1>搜索产品与资料主题</h1><p class="lede">在${e(audienceName(audience))}中搜索产品、操作、配件及维护相关主题。</p>${searchForm(audience,query)}</section><div class="results-bar"><span>${query.trim() ? '关键词：' + e(query) : '输入关键词开始查找'}</span><span>${count} 项资料、产品或主题</span></div>${count ? `<div class="topic-results">${results.resources.map(r=>resourceCard(r,audience)).join('')}${results.products.map(p=>`<a class="result-card" href="${e(productHref(p,audience))}">${icon('grid')}<div><h3>${e(p.name)}</h3><p>${e(p.description)}</p><div class="result-meta">产品目录</div></div></a>`).join('')}${results.topics.map(({product:p,topic:t})=>`<a class="result-card" href="${e(topicHref(p,t,audience))}">${icon(t.icon)}<div><h3>${e(t.title)}</h3><p>${e(t.summary)}</p><div class="result-meta">${e(p.name)} · ${e(typeName(t.kind))} · ${e(topicStatus(p,t,audience))}</div></div></a>`).join('')}</div>` : `<div class="empty-state">${icon('search')}<h2>${query.trim() ? '没有找到匹配的资料、产品或主题' : '试试产品名、充电、配件或跟随'}</h2><p>也可以直接进入产品目录浏览。</p><a class="button-secondary" href="${e(href(audience))}">浏览${e(audienceName(audience))} ${icon('arrow')}</a></div>`}<div style="height:42px"></div></div>`;
  }
  function notFound() { return `<div class="wrap"><section class="section"><div class="empty-state">${icon('folder')}<h1 style="font-size:26px">未找到该页面</h1><p>请返回支持首页，选择您的产品或使用主题。</p><a class="button-secondary" href="#/">返回首页 ${icon('arrow')}</a></div></section></div>`; }
  function pageFor(route) {
    const key = route.parts[0];
    if (!key) return {title:'使用与支持',html:homepage()};
    if (key === 'users' || key === 'dealers') return {title:audienceName(key),html:audiencePage(key)};
    if (key === 'developers') return {title:'开发者资料',html:developerPage(route)};
    if (key === 'library') return {title:'视频与下载',html:libraryPage(route)};
    if (key === 'search') return {title:'搜索',html:searchPage(route)};
    if (key === 'product') {
      const product = productOf(route.parts[1]);
      if (product && route.parts.length === 2) return {title:product.name,html:productPage(product,route)};
      const topic = topicOf(route.parts[3]);
      if (product && route.parts[2] === 'topic' && route.parts.length === 4 && topic && product.topicIds.includes(topic.id) && topic.audiences.includes(roleOf(route))) return {title:topic.title + ' · ' + product.name,html:topicPage(product,topic,route)};
    }
    return {title:'目录未找到',html:notFound()};
  }
  function render(moveFocus) {
    const route = parseRoute(window.location.hash);
    const page = pageFor(route);
    app.innerHTML = shell(page.html,route);
    document.title = page.title + ' · RJ Tech';
    if (moveFocus) {
      window.scrollTo({top:0,behavior:'instant'});
      document.getElementById('main').focus({preventScroll:true});
    }
  }
  function navigate(url) {
    if (window.location.hash === url) render(true);
    else window.location.hash = url;
  }
  document.addEventListener('click', event => {
    if (event.target.closest('.skip-link')) {event.preventDefault();document.getElementById('main').focus();return;}
    const action = event.target.closest('[data-action]');
    if (!action) return;
    if (action.dataset.action === 'search') { document.getElementById('search-dialog').showModal();document.getElementById('dialog-search').focus(); }
    if (action.dataset.action === 'close-search') document.getElementById('search-dialog').close();
    if (action.dataset.action === 'menu') {
      const open = document.querySelector('.site-header').classList.toggle('menu-open');
      action.setAttribute('aria-expanded',String(open));
      action.setAttribute('aria-label',open ? '收起导航' : '展开导航');
    }
  });
  document.addEventListener('submit', event => {
    if (!event.target.matches('[data-search-form]')) return;
    event.preventDefault();
    const form = new FormData(event.target);
    navigate(href('search',{q:String(form.get('q') || '').trim().slice(0,200),audience:form.get('audience')}));
  });
  document.addEventListener('change', event => {
    if (!event.target.matches('[data-route-filter]')) return;
    const route = parseRoute(window.location.hash);
    const query = Object.fromEntries(route.params);
    query[event.target.name] = event.target.value;
    if (event.target.name === 'audience' && query.audience === 'users' && ['certificate','service','training'].includes(query.type)) delete query.type;
    navigate(href(route.path,query));
  });
  document.addEventListener('keydown', event => {
    if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey || event.target.closest('input,textarea,select,[contenteditable]')) return;
    const dialog = document.getElementById('search-dialog');
    if (!dialog.open) { event.preventDefault();dialog.showModal();document.getElementById('dialog-search').focus(); }
  });
  window.addEventListener('hashchange', () => render(true));
  window.RJSupportUI = {parseRoute,href,pageFor,shell,searchTopics,topicsFor,publishedResources,resourcesFor,matchesConfig,topicStatus};
  render(false);
})();
