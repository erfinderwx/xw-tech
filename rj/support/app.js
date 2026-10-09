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
    return `<div class="review-bar"><div class="wrap review-inner"><span><b>架构预览</b> · 先看页面与目录，材料待填</span><a href="#/architecture">查看架构方案 ${icon('arrow')}</a></div></div>
    <header class="site-header"><div class="wrap header-inner"><a class="brand" href="#/" aria-label="RJ Tech 使用与支持首页"><span class="brand-mark"></span><span><strong>RJ TECH</strong><small>SUPPORT CENTER</small></span></a>
    <nav class="main-nav" id="main-nav" aria-label="主导航">${links.map(([id,name,path]) => `<a class="nav-link${active === id || (active === 'product' && role === id) ? ' active' : ''}" ${active === id ? 'aria-current="page"' : ''} href="${e(href(path, id === 'library' ? {audience:role === 'developers' ? 'users' : role} : null))}">${name}${id === 'developers' ? '<em>规划中</em>' : ''}</a>`).join('')}</nav>
    <div class="header-actions"><button class="icon-button" data-action="search" aria-label="打开搜索">${icon('search')}</button><a class="official-link" href="https://www.rjtech-offroad.com/" target="_blank" rel="noopener noreferrer">品牌官网 ↗</a><button class="icon-button menu-toggle" data-action="menu" aria-controls="main-nav" aria-expanded="false" aria-label="展开导航">${icon('menu')}</button></div></div></header>
    <main id="main" tabindex="-1">${body}</main>
    <footer class="footer"><div class="wrap footer-inner"><div><strong>RJ TECH</strong><span>使用与支持 · 页面结构预览</span></div><nav class="footer-links" aria-label="页脚导航"><a href="#/users">用户支持</a><a href="#/dealers">代理商专区</a><a href="../">原服务指南</a><a href="#/architecture">架构方案</a></nav></div></footer>
    <dialog class="search-dialog" id="search-dialog" aria-labelledby="search-dialog-title"><div class="dialog-top"><span id="search-dialog-title">搜索${role === 'dealers' ? '代理商' : '用户'}资料主题</span><button data-action="close-search" aria-label="关闭搜索">${icon('close')}</button></div>${searchForm(role === 'dealers' ? 'dealers' : 'users', '', true)}<p>当前可搜索产品与目录主题，正式说明、视频和文件将在后续填入。</p></dialog>`;
  }
  function productsGrid(audience) {
    return `<div class="product-grid">${C.products.map(p => `<a class="product-card" href="${e(audience === 'developers' ? href('developers',{product:p.id}) : productHref(p,audience))}"><div class="product-visual" aria-hidden="true"><small>${e(p.family.toUpperCase())}</small><span class="product-code">${e(p.code)}</span><span class="badge${p.status === 'reserved' ? ' gray' : ' red'}">${p.status === 'reserved' ? '预留目录' : '首期结构'}</span></div><div class="product-body"><h3>${e(p.name)}</h3><p>${e(p.description)}</p><div class="card-footer"><span>${e(p.label)}</span>${icon('arrow')}</div></div></a>`).join('')}</div>`;
  }
  function quickLinks(audience) {
    const p = C.products[0];
    const ids = audience === 'dealers' ? ['certificates','installation','delivery','repair'] : ['first-use','charging','seat-footrest','follow'];
    return `<div class="quick-grid">${ids.filter(id => p.topicIds.includes(id)).map(id => {const t = topicOf(id);return `<a class="quick-item" href="${e(topicHref(p,t,audience))}">${icon(t.icon)}<span>${e(t.title)}</span>${icon('chevron','end')}</a>`;}).join('')}</div>`;
  }
  function homepage() {
    return `<section class="hero"><div class="wrap hero-grid"><div><p class="eyebrow">RJ TECH / PRODUCT SUPPORT</p><h1>使用与支持，<br>从这里开始。</h1><p class="lede">找到你的产品，查阅操作说明、配件指南和视频。<br>面向用户与代理商，按使用场景整理资料。</p>${searchForm('users')}</div><div class="hero-rail"><div class="hero-rail-item">${icon('book')}<div><b>围绕使用任务找资料</b><p>开始使用、日常操作、配件与维护</p></div></div><div class="hero-rail-item">${icon('play')}<div><b>说明、视频与下载放在一起</b><p>同一主题下查阅对应的资料</p></div></div><div class="hero-rail-item">${icon('grid')}<div><b>每个产品都有独立目录</b><p>按车型与配置进入适用的说明</p></div></div></div></div></section>
    <section class="section"><div class="wrap"><div class="section-header"><div><h2>选择你的资料入口</h2><p>先选择身份，再进入产品。</p></div></div><div class="audience-grid">${C.audiences.filter(a => a.status === 'active').map(a => `<a class="audience-card" href="${e(href(a.id))}"><span class="audience-icon">${icon(a.icon)}</span><div><span class="card-eyebrow">${a.en}</span><h3>${e(a.name)}</h3><p>${e(a.summary)}</p><span class="arrow-end">进入${a.name} ${icon('arrow')}</span></div></a>`).join('')}</div><div class="planned-row">${icon('code')}<div><b>开发者资料</b> <span class="badge gray">规划中</span><p>为未来产品的接口、集成与开发材料预留入口。</p></div><a class="text-link" href="#/developers">查看规划 ${icon('arrow')}</a></div></div></section>
    <section class="section tint"><div class="wrap"><div class="section-header"><div><h2>按产品查找</h2><p>首期完善 Steinadler Pro，其他产品沿用统一结构。</p></div><a class="text-link" href="#/users">查看用户支持 ${icon('arrow')}</a></div>${productsGrid('users')}</div></section>
    <section class="section"><div class="wrap"><div class="section-header"><div><h2>常用主题</h2><p>预览资料页的布局与阅读方式。</p></div></div>${quickLinks('users')}</div></section>`;
  }
  function audiencePage(audience) {
    const a = C.audiences.find(x => x.id === audience);
    const dealer = audience === 'dealers';
    const modules = ['certification','handover','service','training'].map(sectionOf);
    return `<div class="wrap">${crumb([{label:a.name}])}<section class="page-head"><div class="head-row"><div><p class="eyebrow">${a.en}</p><h1>${e(a.title)}</h1><p class="lede">${dealer ? '选择产品，查看证书、安装交付及服务资料的组织方式。共用的用户说明可以从专区直接访问。' : '按产品进入说明目录，查找操作、配件、维护与视频。每个主题保留对应车型和版本信息。'}</p></div><span class="badge red">结构预览</span></div></section></div>
    <section class="section"><div class="wrap"><div class="section-header"><div><h2>选择产品</h2><p>产品目录独立维护，新增产品可复用页面。</p></div></div>${productsGrid(audience)}</div></section>
    <section class="section tint"><div class="wrap"><div class="section-header"><div><h2>${dealer ? '代理商资料分区' : '从常用主题开始'}</h2><p>${dealer ? '证书、交付、服务与培训分别归档。' : '先看说明页结构，再填正式材料。'}</p></div><a class="text-link" href="${e(href('library',{audience}))}">视频与下载 ${icon('arrow')}</a></div>${dealer ? `<div class="dealer-modules">${modules.map(s => `<a class="module-card" href="${e(productHref(C.products[0],audience,{section:s.id}))}">${icon(s.icon)}<h3>${e(s.title)}</h3><p>${e(s.description)}</p><span class="text-link">查看目录 ${icon('arrow')}</span></a>`).join('')}</div><div class="certificate-panel"><div class="certificate-icon">${icon('shield')}</div><div><h3>证书汇编，独立成册</h3><p>按产品和车型整理正式证书，代理商需要时再提供。当前仅展示汇编位置与资料页布局。</p></div><a class="button-secondary" href="${e(topicHref(C.products[0],topicOf('certificates'),'dealers'))}">查看汇编结构 ${icon('arrow')}</a></div>` : quickLinks(audience)}</div></section>`;
  }
  function roleSwitch(product, audience, route) {
    const q = validConfig(product,route);
    return `<nav class="role-switch" aria-label="产品资料身份"><span>资料入口</span>${['users','dealers'].map(id => `<a class="${id === audience ? 'active' : ''}" href="${e(productHref(product,id,{model:q.model,seat:q.seat}))}" ${id === audience ? 'aria-current="page"' : ''}>${audienceName(id)}</a>`).join('')}</nav>`;
  }
  function options(items, chosen, allLabel) { return `<option value="all">${e(allLabel || '全部')}</option>${items.map(x => `<option value="${e(x.id)}"${chosen === x.id ? ' selected' : ''}>${e(x.name)}</option>`).join('')}`; }
  function configBar(product, route) {
    const q = validConfig(product,route);
    const parts = product.modelOptions.length || product.seatOptions.length ? `${product.modelOptions.length ? `<div class="form-group"><label for="model-choice">车型</label><select id="model-choice" name="model" data-route-filter>${options(product.modelOptions,q.model,'全部车型')}</select></div>` : ''}${product.seatOptions.length ? `<div class="form-group"><label for="seat-choice">座位配置</label><select id="seat-choice" name="seat" data-route-filter>${options(product.seatOptions,q.seat,'全部配置')}</select></div>` : ''}` : '<span class="design-note" style="margin:0">车型与配置字段将在资料核对后设置。</span>';
    return `<div class="config-bar">${parts}<span class="badge gray">目录占位 · 不代表适配已确认</span></div>`;
  }
  function topicsFor(product, audience, sectionId) {
    return C.topics.filter(t => product.topicIds.includes(t.id) && t.audiences.includes(audience) && (sectionId === 'shared' ? t.audiences.includes('users') : t.sectionId === sectionId));
  }
  function sideNav(product, audience, route, doc) {
    const q = validConfig(product,route);
    const active = doc ? (doc.audiences.includes('users') && audience === 'dealers' ? 'shared' : doc.sectionId) : route.params.get('section');
    return `<aside class="${doc ? 'doc-nav' : 'side-nav'}" aria-label="产品主题目录"><p class="side-label">${e(product.name.toUpperCase())}</p><a class="side-item${!active ? ' active' : ''}" href="${e(productHref(product,audience,q))}">${icon('grid')}全部主题</a>${(product.sectionIds[audience] || []).map(id => {const s = sectionOf(id);return `<a class="side-item${active === id ? ' active' : ''}" href="${e(productHref(product,audience,{...q,section:id}))}">${icon(s.icon)}${e(s.title)}</a>`;}).join('')}<p class="side-note">每个主题汇集说明、对应视频和文件。真实材料将在结构确认后加入。</p></aside>`;
  }
  function productPage(product, route) {
    const audience = roleOf(route);
    const q = validConfig(product,route);
    const selected = route.params.get('section');
    const all = product.sectionIds[audience] || [];
    const sections = (all.includes(selected) ? [selected] : all).map(sectionOf);
    return `<div class="wrap">${crumb([{label:audienceName(audience),url:href(audience)},{label:product.name}])}<section class="page-head"><div class="head-row"><div><p class="eyebrow">${e(product.family)} / ${audience === 'dealers' ? 'DEALER RESOURCES' : 'USER SUPPORT'}</p><h1>${e(product.name)}</h1><p class="lede">${audience === 'dealers' ? '产品证书、安装交付与服务资料按主题集中组织。共用用户说明直接引用同一资料页。' : '选择车型与配置，进入操作、配件、功能和维护主题。说明、视频与下载放在同一资料页中。'}</p></div>${roleSwitch(product,audience,route)}</div></section>${configBar(product,route)}<div class="product-layout">${sideNav(product,audience,route)}<div><div class="empty-note">${icon('info')}<p><strong>${product.status === 'reserved' ? '这是为该产品预留的目录。' : '这里先展示资料结构。'}</strong> 当前主题均待填；实际适用范围、操作步骤和文件版本将在核对材料后补齐。</p></div><div class="section-grid">${sections.map(s => {const topics = topicsFor(product,audience,s.id);return `<section class="section-card"><div class="section-card-head">${icon(s.icon)}<div><h3>${e(s.title)}</h3><p>${e(s.description)}</p></div></div><div class="topic-list">${topics.length ? topics.map(t => `<a class="topic-item" href="${e(topicHref(product,t,audience,q))}">${icon(t.icon)}<span>${e(t.title)}</span><span class="mini">待填</span>${icon('chevron')}</a>`).join('') : '<p class="design-note" style="padding:8px 7px;margin:0">待确认该产品的主题与适配配件。</p>'}</div></section>`;}).join('')}</div></div></div></div>`;
  }
  function docSlot(title, description, illustration) {
    return `<section class="doc-slot"><h2>${e(title)}</h2><p>${e(description)}</p>${illustration ? `<div class="slot-canvas">${icon('image')}<span>图示与步骤将在此处加入</span></div>` : '<div class="line-skeleton" aria-hidden="true"></div><div class="line-skeleton medium" aria-hidden="true"></div><div class="line-skeleton short" aria-hidden="true"></div>'}</section>`;
  }
  function topicPage(product, topic, route) {
    const audience = roleOf(route);
    const q = validConfig(product,route);
    const names = [product.name, ...(q.model ? [product.modelOptions.find(x => x.id === q.model).name] : []), ...(q.seat ? [product.seatOptions.find(x => x.id === q.seat).name] : [])];
    const cert = topic.kind === 'certificate';
    const isMedia = ['video','document'].includes(topic.kind);
    const slots = cert ? [
      ['汇编范围与适用车型','填写适用产品、车型、市场、证书编号及有效信息。'],
      ['正式证书目录','按证书名称与版本形成独立汇编；原证书保持完整。'],
      ['提供方式','规划为代理商按需获取；逐车文件与通用产品证书分别管理。']
    ] : isMedia ? [
      ['按任务组织资料','先选择使用任务，再查看对应说明、视频与下载。'],
      ['适用范围与版本','标明产品、车型、配置、语言和资料版本。'],
      ['资料列表','确认后的文件和视频将在这里显示。']
    ] : [
      ['适用范围','这里将说明适用车型、配置、配件和资料版本。'],
      ['准备与检查','这里将整理操作前的准备事项与检查内容。'],
      ['操作步骤与图示','这里将放入面向读者的分步说明，以及对应图示。',true],
      ['使用限制与异常处理','这里将列明使用边界、退出方式和问题处理入口。']
    ];
    return `<div class="wrap">${crumb([{label:audienceName(audience),url:href(audience)},{label:product.name,url:productHref(product,audience,q)},{label:topic.title}])}<div class="doc-layout">${sideNav(product,audience,route,topic)}<article class="doc-content"><p class="doc-kicker">${e(product.name)} / ${e(typeName(topic.kind))}</p><h1>${e(topic.title)}</h1><p class="doc-description">${e(topic.summary)}</p><div class="metadata">${names.map(n => `<span class="badge dark">${e(n)}</span>`).join('')}<span class="badge red">资料待填</span></div><div class="empty-note">${icon('info')}<p>这是资料页的排版预览。以下为内容位置；正式材料核对后，再填入适用范围与具体内容。</p></div>${slots.map(s => docSlot(...s)).join('')}<div class="topic-meta"><span>语言：待确认</span><span>版本：待确认</span><span>修订日期：待确认</span></div></article><aside class="doc-aside" aria-label="对应视频与文件">${!cert ? `<section class="media-box"><div class="media-screen" aria-label="视频占位，尚未添加"><span class="play-outline">${icon('play')}</span><small>VIDEO · 待加入</small></div><div class="media-text"><h3>对应操作视频</h3><p>有适用视频时，会和本主题说明一起显示。</p></div></section>` : ''}<section class="aside-box"><h3>${cert ? '独立证书文件' : '对应说明文件'}</h3><div class="file-row">${icon(cert ? 'shield' : 'file')}<div>${cert ? '产品证书汇编' : '正式手册 / 补充说明'}<small>文件与版本待加入</small></div></div><button class="disabled-download" disabled>${cert ? '证书汇编待加入' : '下载文件待加入'}</button></section><section class="aside-box"><h3>资料适用信息</h3><p>产品与配置：${e(names.join(' / '))}<br>资料身份：${e(audienceName(audience))}<br>适配与内容：待核对</p></section><section class="aside-box"><h3>继续查找</h3><a class="text-link" href="${e(productHref(product,audience,q))}">返回产品目录 ${icon('arrow')}</a></section></aside></div></div>`;
  }
  function developerPage(route) {
    const selected = productOf(route.params.get('product'));
    return `<div class="wrap">${crumb([{label:'开发者资料规划'}])}<section class="page-head"><div class="planned-hero"><p class="eyebrow">DEVELOPER RESOURCES</p><span class="badge gray">规划中</span></div><h1>为未来的集成与开发，<br>预留资料入口。</h1><p class="lede">沿用相同的产品目录，未来按实际产品与开放能力启用开发者资料。当前展示目录位置，不提供开发包或接口文件。</p></section></div><section class="section"><div class="wrap"><div class="section-header"><div><h2>未来资料分区${selected ? ' · ' + e(selected.name) : ''}</h2><p>以下分类为架构预留，具体内容随产品确认。</p></div></div><div class="developer-grid">${C.developerModules.map(m => `<div class="module-card">${icon(m.icon)}<h3>${e(m.title)}</h3><p>${e(m.description)}</p><span class="badge gray" style="margin-top:18px">待启用</span></div>`).join('')}</div></div></section><section class="section tint"><div class="wrap"><div class="section-header"><div><h2>共用产品目录</h2><p>无需为开发者再建立一套产品名称与版本。</p></div></div>${productsGrid('developers')}</div></section>`;
  }
  function filterSelect(name, label, items, chosen) {
    return `<div class="filter-group"><label for="filter-${e(name)}">${e(label)}</label><select id="filter-${e(name)}" name="${e(name)}" data-route-filter>${options(items,chosen)}</select></div>`;
  }
  function libraryPage(route) {
    const audience = roleOf(route);
    const product = productOf(route.params.get('product'));
    const type = route.params.get('type');
    const allowedTypes = C.resourceTypes.filter(t => audience === 'dealers' || !['certificate','service','training'].includes(t.id));
    const topics = C.topics.filter(t => t.audiences.includes(audience) && (product ? product.topicIds.includes(t.id) : C.products.some(p => p.topicIds.includes(t.id))) && (!type || type === 'all' || t.kind === type));
    const resources = C.resources.filter(r => r.status === 'published' && r.audiences.includes(audience) && (!product || r.productId === product.id) && (!type || type === 'all' || r.type === type) && (!route.params.get('language') || r.language === route.params.get('language')));
    return `<div class="wrap">${crumb([{label:'视频与下载'}])}<section class="page-head"><div class="head-row"><div><p class="eyebrow">VIDEOS & DOWNLOADS</p><h1>视频与下载</h1><p class="lede">按身份、产品和资料类型筛选。视频与文件同时关联到对应的使用主题，便于找到上下文。</p></div><span class="badge red">资料待填</span></div></section><div class="filter-panel">${filterSelect('audience','资料身份',[{id:'users',name:'用户支持'},{id:'dealers',name:'代理商专区'}],audience).replace('<option value="all">全部</option>','')}${filterSelect('product','产品',C.products.map(p => ({id:p.id,name:p.name})),product?.id)}${filterSelect('type','资料类型',allowedTypes,type)}${filterSelect('language','语言',[{id:'zh-CN',name:'中文'},{id:'de-DE',name:'Deutsch'},{id:'en',name:'English'}],route.params.get('language'))}</div><div class="results-bar"><span>${e(audienceName(audience))} ${product ? ' / ' + e(product.name) : '/ 全部产品'}</span><span>${resources.length} 份已发布资料</span></div>${resources.length ? `<div class="topic-results">${resources.map(r => {const p = productOf(r.productId);const t = topicOf(r.topicId);return `<a class="result-card" href="${e(topicHref(p,t,audience))}">${icon('file')}<div><h3>${e(r.title || t.title)}</h3><p>${e(p.name)}</p><div class="result-meta">${e(r.language)} · ${e(r.revision)}</div></div></a>`;}).join('')}</div>` : `<div class="empty-state">${icon('folder')}<h2>资料将在结构确认后加入</h2><p>当前没有正式文件或操作视频。你可以先打开下方主题，查看说明、视频与下载在页面中的位置。</p></div>`}<section class="section"><div class="section-header"><div><h2>浏览待填主题</h2><p>以下是目录主题，不是已发布文件。</p></div></div><div class="topic-results">${topics.map(t => {const p = product || C.products.find(p => p.topicIds.includes(t.id));return `<a class="result-card" href="${e(topicHref(p,t,audience))}">${icon(t.icon)}<div><h3>${e(t.title)}</h3><p>${e(t.summary)}</p><div class="result-meta">${e(p.name)} · ${e(typeName(t.kind))} · 待填</div></div></a>`;}).join('') || '<p class="design-note">此筛选条件下没有预留主题。</p>'}</div></section></div>`;
  }
  function searchTopics(query, audience) {
    const normalized = String(query || '').trim().toLocaleLowerCase();
    if (!normalized) return {products:[],topics:[]};
    const words = normalized.split(/\s+/);
    const matches = value => words.every(w => value.toLocaleLowerCase().includes(w));
    return {
      products:C.products.filter(p => matches(`${p.name} ${p.family} ${p.code}`)),
      topics:C.products.flatMap(p => C.topics.filter(t => p.topicIds.includes(t.id) && t.audiences.includes(audience) && matches(`${p.name} ${t.title} ${t.summary} ${typeName(t.kind)}`)).map(t => ({product:p,topic:t})))
    };
  }
  function searchPage(route) {
    const audience = roleOf(route);
    const query = (route.params.get('q') || '').slice(0,200);
    const results = searchTopics(query,audience);
    const count = results.products.length + results.topics.length;
    return `<div class="wrap">${crumb([{label:'搜索'}])}<section class="page-head"><p class="eyebrow">SEARCH SUPPORT</p><h1>搜索产品与资料主题</h1><p class="lede">当前搜索范围：${e(audienceName(audience))}。正式材料填入后，可在同一入口继续查找。</p>${searchForm(audience,query)}</section><div class="results-bar"><span>${query.trim() ? '关键词：' + e(query) : '输入关键词开始查找'}</span><span>${count} 项产品或主题</span></div>${count ? `<div class="topic-results">${results.products.map(p => `<a class="result-card" href="${e(productHref(p,audience))}">${icon('grid')}<div><h3>${e(p.name)}</h3><p>${e(p.description)}</p><div class="result-meta">产品目录</div></div></a>`).join('')}${results.topics.map(({product:p,topic:t}) => `<a class="result-card" href="${e(topicHref(p,t,audience))}">${icon(t.icon)}<div><h3>${e(t.title)}</h3><p>${e(t.summary)}</p><div class="result-meta">${e(p.name)} · ${e(typeName(t.kind))} · 主题待填</div></div></a>`).join('')}</div>` : `<div class="empty-state">${icon('search')}<h2>${query.trim() ? '没有找到匹配的产品或主题' : '试试产品名、充电、配件或跟随'}</h2><p>也可以直接进入产品目录浏览。</p><a class="button-secondary" href="${e(href(audience))}">浏览${e(audienceName(audience))} ${icon('arrow')}</a></div>`}<div style="height:42px"></div></div>`;
  }
  function architecturePage() {
    const branchTopics = [['首次使用、日常操作','配件、加装与功能说明','维护、排障与操作视频','对应手册与补充说明'],['正式证书独立汇编','安装、改装与交付','维修、备件与技术培训','直接引用共用用户说明'],['硬件接口与通信协议','SDK / API 与集成示例','模型、图纸与工程资料','版本与兼容信息']];
    const rows = [
      ['产品','产品名称、系列、车型和配置','添加产品目录即可复用页面；各产品只启用适用主题。'],
      ['读者与可见范围','用户 / 代理商 / 开发者；公开 / 受限','共用内容引用同一份资料；限制内容在正式上线前落实权限。'],
      ['主题与形式','主题 ID；网页说明、视频、PDF、附件','同一任务的说明和文件放在一起，下载页从同一目录索引。'],
      ['语言与版本','语言、资料修订、产品版本、修订日期','各语言与版本明确关联，历史版与现行版分别标记。'],
      ['来源与状态','原文件、内容负责人、审核状态','草稿 → 核对 → 发布；来源只供内部管理，不进入客户页面。']
    ];
    return `<div class="wrap">${crumb([{label:'网站架构方案'}])}<section class="page-head"><div class="head-row"><div><p class="eyebrow">STRUCTURE REVIEW / V0.1</p><h1>一个资料中心，<br>面向不同读者与产品。</h1><p class="lede">先确定入口、目录和资料页关系，再填正式内容。这一轮是可点击的架构与视觉预览。</p></div><span class="badge red">方案页</span></div></section><p class="architecture-intro"><b>读者 → 产品 → 主题 → 说明 / 视频 / 文件。</b><br>用户与代理商入口先落地，开发者入口预留。产品目录与资料内容独立管理，新产品沿用同一页面结构。</p><div class="architecture-grid">${C.audiences.map((a,i) => `<article class="architecture-card"><header>${icon(a.icon)}<div><h3>${e(a.name)}</h3><small>${a.status === 'planned' ? '未来启用' : '首期搭建'}</small></div></header><ul>${branchTopics[i].map(t => `<li>${e(t)}</li>`).join('')}</ul></article>`).join('')}</div><section class="section"><div class="section-header"><div><h2>网站的页面层级</h2><p>每一层只解决一个查找问题。</p></div></div><div class="structure-table"><table><thead><tr><th>页面</th><th>读者要解决的问题</th><th>页面内容</th></tr></thead><tbody><tr><td>支持首页</td><td>我应该从哪里进入？</td><td>身份入口、产品入口、搜索、常用主题。</td></tr><tr><td>身份入口页</td><td>我能找到哪些资料？</td><td>用户或代理商的资料范围与产品目录。</td></tr><tr><td>产品资料页</td><td>我的产品有哪些说明？</td><td>车型 / 配置选择、主题目录、资料适用提示。</td></tr><tr><td>主题说明页</td><td>这个任务怎么操作？</td><td>正文、步骤图、对应视频与文件、版本信息。</td></tr><tr><td>视频与下载</td><td>直接查视频或文件。</td><td>按身份、产品、类型、语言筛选同一资料目录。</td></tr></tbody></table></div></section><section class="section" style="padding-top:0"><div class="section-header"><div><h2>为新增产品留好位置</h2><p>页面模板保持通用，主题按产品实际情况配置。</p></div></div><div class="flow-strip"><div><b>01 · 新增产品目录</b><p>设置产品名称、系列、车型和配置，不改变网站主导航。</p></div><div><b>02 · 启用适用主题</b><p>选择该产品的用户、代理商和开发者资料分类。</p></div><div><b>03 · 接入正式资料</b><p>关联已确认的说明、视频、文件与版本，进入相应页面。</p></div></div><p class="design-note">用户与代理商共用的操作说明只维护一份。代理商的证书汇编独立成册，逐车文件单独处理。开发者入口只有在产品实际开放相关资料后才启用。</p></section><section class="section" style="padding-top:0"><div class="section-header"><div><h2>每份材料需要的信息</h2><p>先核对适用范围和来源，再决定呈现形式。</p></div></div><div class="structure-table"><table><thead><tr><th>维度</th><th>必备信息</th><th>管理方式</th></tr></thead><tbody>${rows.map(r => `<tr>${r.map(x => `<td>${e(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div><details class="architecture-details"><summary>查看资料目录的实现约定</summary><p class="design-note">产品、身份、主题和资源分别登记。网页正文、视频和附件属于同一资源集合，按元信息建立索引。当前资源集合为空。</p><pre>product: id / family / modelOptions / seatOptions / sectionIds / topicIds\nresource: id / productId / topicId / audiences / variantIds\n          type / title / language / revision / publishedAt\n          status / visibility / content / assets / sourceRefs</pre></details><div class="release-note"><strong>本轮范围：</strong>首页、身份入口、产品目录、主题页、搜索与筛选、开发者规划页。黑白红视觉延续品牌风格。<br><strong>下一轮：</strong>以最新提供材料和官网资料核对内容，先填用户操作与配件，再整理代理商证书汇编。<br><strong>上线权限：</strong>当前为公开可访问的结构预览，页面中的身份切换用于展示目录。证书文件尚未加入；代理商证书按需提供，受限资料需采用实际授权的交付方式，不能依赖页面隐藏。</div></section></div>`;
  }
  function notFound() { return `<div class="wrap"><section class="section"><div class="empty-state">${icon('folder')}<h1 style="font-size:26px">这个目录尚未建立</h1><p>返回资料入口，选择产品和主题。</p><a class="button-secondary" href="#/">返回首页 ${icon('arrow')}</a></div></section></div>`; }
  function pageFor(route) {
    const key = route.parts[0];
    if (!key) return {title:'使用与支持',html:homepage()};
    if (key === 'users' || key === 'dealers') return {title:audienceName(key),html:audiencePage(key)};
    if (key === 'developers') return {title:'开发者资料规划',html:developerPage(route)};
    if (key === 'library') return {title:'视频与下载',html:libraryPage(route)};
    if (key === 'search') return {title:'搜索',html:searchPage(route)};
    if (key === 'architecture') return {title:'网站架构方案',html:architecturePage()};
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
  window.RJSupportUI = {parseRoute,href,pageFor,shell,searchTopics,topicsFor};
  render(false);
})();
