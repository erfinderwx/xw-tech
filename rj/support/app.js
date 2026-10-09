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
  const typeName = id => (C.resourceTypes.find(t => t.id === id) || {}).name || 'Resource';
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
  const languageName = id => ({'zh-CN':'Chinese','en':'English','de-DE':'German'}[id] || id);
  function resourceLanguageLabel(resource) {
    if (resource.type === 'document') return 'File: ' + languageName(resource.language);
    if (resource.type === 'video') return 'Audio: ' + languageName(resource.sourceLanguage || resource.language);
    return languageName(resource.language);
  }
  function publishedResources(product, audience) {
    const languages = C.site.visibleResourceLanguages || [C.site.language];
    const archived = r => C.site.archivedResourceIds?.includes(r.id);
    const allowedDownload = r => r.type !== 'document' || !C.site.downloadLanguages || C.site.downloadLanguages.includes(r.language);
    const fileKey = url => String(url || '').split('#')[0].replace(/^\.\//,'');
    const excludedFiles = new Map(C.resources.filter(r=>r.type === 'document' && (archived(r) || !allowedDownload(r))).flatMap(r=>r.assets.filter(a=>a.kind === 'file').map(a=>[fileKey(a.url),archived(r) ? 'archived' : 'language'])));
    return C.resources.filter(r => languages.includes(r.language) && !archived(r) && allowedDownload(r) && r.status === 'published' && r.visibility === 'public' && r.audiences.includes(audience) && (!product || r.productId === product.id)).map(r => {
      const metadata = C.site.language === 'en' ? window.RJSupportEnglishMetadata?.[r.id] : null;
      const displayed = metadata ? {...r,...metadata} : r;
      return {...displayed,sourceRefs:(displayed.sourceRefs || []).flatMap(ref=>{
        const excluded = excludedFiles.get(fileKey(ref.url));
        if (excluded === 'language') return [];
        if (excluded === 'archived') return [{title:ref.title + ' · Archived reference'}];
        return [ref];
      })};
    });
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
    if (!matching.length) return all.length ? 'Other configurations' : product.topicStatuses?.[topic.id] || 'Not yet available';
    const available = matching.find(r => !r.displayStatus);
    return available ? 'Available' : product.topicStatuses?.[topic.id] || matching[0].displayStatus;
  }
  function resourceScope(resource, product) {
    const config = [ ...(resource.modelIds || []).map(id => product.modelOptions.find(x=>x.id === id)?.name), ...(resource.seatIds || []).map(id => product.seatOptions.find(x=>x.id === id)?.name) ].filter(Boolean);
    return config.join(' / ') || 'Check delivered configuration';
  }
  function fileOriginLabel(asset) {
    return ({original:'Original file',derived:'Prepared diagrams',reference:'Website reference'})[asset.origin] || 'Download files';
  }
  function assetButtons(resource) {
    return (resource.assets || []).map(a => a.kind === 'file' ? `<a class="button-secondary" href="${e(a.url)}" target="_blank" rel="noopener noreferrer" download>${icon('file')} Download · ${e(a.format)} · ${e(fileOriginLabel(a))}</a>` : a.guideUrl ? `<a class="text-link" href="${e(a.guideUrl)}" target="_blank" rel="noopener noreferrer">Open the complete service guide ${icon('external')}</a>` : '').join('');
  }
  function audioLabel(resource, asset) {
    return (resource.sourceLanguage || resource.language) === 'zh-CN' ? 'Chinese audio' + (asset.captions ? ' · ' + (asset.captionLanguage === 'en' ? 'English captions' : 'Chinese / English captions') : '') : asset.audio;
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
    return `<section class="resource-panel${selected === resource.id ? ' selected' : ''}" id="resource-${e(resource.id)}"><div class="resource-head"><div><span class="badge dark">${e(resourceScope(resource,product))}</span><h2>${e(resource.title)}</h2></div><span class="resource-language">${e(resourceLanguageLabel(resource))}</span></div>${resource.scope ? `<p class="resource-scope">${e(resource.scope)}</p>` : ''}${resource.content.map(s=>`<section class="content-section"><h3>${e(s.title)}</h3>${s.blocks.map(renderBlock).join('')}</section>`).join('')}${resource.assets.filter(a=>a.kind === 'video').map(a=>`<div class="content-video"><video controls playsinline preload="none" ${a.poster ? `poster="${e(a.poster)}"` : ''} aria-label="${e(resource.title)}"><source src="${e(a.url)}" type="video/mp4">${a.captions ? `<track kind="captions" src="${e(a.captions)}" srclang="${e(a.captionLanguage || 'zh')}" label="${e(a.captionLabel || 'Chinese / English')}" default>` : ''}Your browser cannot play this video. Use the link below to open it.</video><div class="video-meta"><span>${e(a.duration)} · ${e(audioLabel(resource,a))}</span><a class="text-link" href="${e(a.url)}" target="_blank" rel="noopener noreferrer">Open video ${icon('external')}</a></div></div>`).join('')}<div class="resource-actions">${assetButtons(resource)}</div>${resource.sourceRefs?.length ? `<details class="resource-sources"><summary>Source materials</summary>${resource.sourceRefs.map(s=>s.url ? `<a href="${e(s.url)}" target="_blank" rel="noopener noreferrer">${e(s.title)} ${icon('external')}</a>` : `<span>${e(s.title)}</span>`).join('')}</details>` : ''}</section>`;
  }
  function resourceCard(resource, audience) {
    const product = productOf(resource.productId), topic = topicOf(resource.topicId);
    return `<article class="result-card resource-card">${icon(resource.type === 'video' ? 'play' : resource.type === 'document' ? 'file' : topic.icon)}<div><a class="result-title" href="${e(topicHref(product,topic,audience,{resource:resource.id}))}"><h3>${e(resource.title)}</h3></a><p>${e(resource.scope || product.name)}</p><div class="result-meta">${e(product.name)} · ${e(typeName(resource.type))} · ${e(resourceLanguageLabel(resource))}${resource.type === 'document' ? ' · ' + e(resource.revision) : ''}</div><div class="resource-card-actions">${assetButtons(resource)}</div></div></article>`;
  }
  function crumb(items) {
    return `<nav class="breadcrumb" aria-label="Current location"><a href="#/">Support home</a>${items.map(x => icon('chevron') + (x.url ? `<a href="${e(x.url)}">${e(x.label)}</a>` : `<span aria-current="page">${e(x.label)}</span>`)).join('')}</nav>`;
  }
  function searchForm(audience, query, dialog) {
    return `<form class="searchbox" data-search-form role="search"><input type="hidden" name="audience" value="${e(audience)}">${icon('search')}<input name="q" type="search" aria-label="Search products or support topics" placeholder="Search products, accessories or topics" value="${e(query || '')}" ${dialog ? 'id="dialog-search"' : ''}><button type="submit">Search</button></form>`;
  }
  function shell(body, route) {
    const active = route.parts[0] || 'home';
    const role = roleOf(route);
    const links = [['home','Support home',''],['users','User support','users'],['dealers','Dealer resources','dealers'],['developers','Developer resources','developers'],['library','Videos and downloads','library']];
    return `<header class="site-header"><div class="wrap header-inner"><a class="brand" href="#/" aria-label="RJ Tech support home"><span class="brand-mark"></span><span><strong>RJ TECH</strong><small>SUPPORT CENTER</small></span></a>
    <nav class="main-nav" id="main-nav" aria-label="Main navigation">${links.map(([id,name,path]) => `<a class="nav-link${active === id || (active === 'product' && role === id) ? ' active' : ''}" ${active === id ? 'aria-current="page"' : ''} href="${e(href(path, id === 'library' ? {audience:role === 'developers' ? 'users' : role} : null))}">${name}${id === 'developers' ? '<em>Not yet available</em>' : ''}</a>`).join('')}</nav>
    <div class="header-actions"><button class="icon-button" data-action="search" aria-label="Open search">${icon('search')}</button><a class="official-link" href="https://www.rjtech-offroad.com/" target="_blank" rel="noopener noreferrer">Brand website ↗</a><button class="icon-button menu-toggle" data-action="menu" aria-controls="main-nav" aria-expanded="false" aria-label="Open navigation">${icon('menu')}</button></div></div></header>
    <main id="main" tabindex="-1">${body}</main>
    <footer class="footer"><div class="wrap footer-inner"><div><strong>RJ TECH</strong><span>Product use and technical support</span></div><nav class="footer-links" aria-label="Footer navigation"><a href="#/users">User support</a><a href="#/dealers">Dealer resources</a><a href="../">Battery replacement and wiring guide</a></nav></div></footer>
    <dialog class="search-dialog" id="search-dialog" aria-labelledby="search-dialog-title"><div class="dialog-top"><span id="search-dialog-title">Search ${role === 'dealers' ? 'dealer' : 'user'} resources</span><button data-action="close-search" aria-label="Close search">${icon('close')}</button></div>${searchForm(role === 'dealers' ? 'dealers' : 'users', '', true)}<p>Search product models, operation, accessories and maintenance topics.</p></dialog>`;
  }
  function productsGrid(audience) {
    return `<div class="product-grid">${C.products.map(p => {const ready = audience !== 'developers' && publishedResources(p,audience).length; return `<a class="product-card" href="${e(audience === 'developers' ? href('developers',{product:p.id}) : productHref(p,audience))}"><div class="product-visual" aria-hidden="true"><small>${e(p.family.toUpperCase())}</small><span class="product-code">${e(p.code)}</span><span class="badge${ready ? ' red' : ' gray'}">${ready ? 'View resources' : 'Resources pending'}</span></div><div class="product-body"><h3>${e(p.name)}</h3><p>${e(p.description)}</p><div class="card-footer"><span>${e(p.label)}</span>${icon('arrow')}</div></div></a>`;}).join('')}</div>`;
  }
  function quickLinks(audience) {
    const p = C.products[0];
    const ids = audience === 'dealers' ? ['certificates','installation','delivery','repair'] : ['first-use','charging','seat-footrest','follow'];
    return `<div class="quick-grid">${ids.filter(id => p.topicIds.includes(id)).map(id => {const t = topicOf(id);return `<a class="quick-item" href="${e(topicHref(p,t,audience))}">${icon(t.icon)}<span>${e(t.title)}</span>${icon('chevron','end')}</a>`;}).join('')}</div>`;
  }
  function homepage() {
    const product = C.products[0];
    return `<section class="hero"><div class="wrap hero-grid"><div><p class="eyebrow">RJ TECH / PRODUCT SUPPORT</p><h1>Product support,<br>all in one place.</h1><p class="lede">Find vehicle operation, accessory and maintenance resources.<br>Select your product to browse support topics.</p>${searchForm('users')}</div><div class="hero-rail"><a class="hero-rail-item" href="${e(productHref(product,'users'))}">${icon('book')}<div><b>Getting started</b><p>First use, charging and everyday operation</p></div></a><a class="hero-rail-item" href="${e(productHref(product,'users',{section:'accessories'}))}">${icon('layers')}<div><b>Accessories and installation</b><p>Seats, footrests, trailers and range extenders</p></div></a><a class="hero-rail-item" href="${e(productHref(product,'users',{section:'care'}))}">${icon('tool')}<div><b>Maintenance and troubleshooting</b><p>Routine care, checks and common issues</p></div></a></div></div></section>
    <section class="section"><div class="wrap"><div class="section-header"><div><h2>Choose your support area</h2><p>Select support for vehicle use or dealer service.</p></div></div><div class="audience-grid">${C.audiences.filter(a => a.status === 'active').map(a => `<a class="audience-card" href="${e(href(a.id))}"><span class="audience-icon">${icon(a.icon)}</span><div><span class="card-eyebrow">${a.en}</span><h3>${e(a.name)}</h3><p>${e(a.summary)}</p><span class="arrow-end">Browse ${a.name} ${icon('arrow')}</span></div></a>`).join('')}</div><div class="planned-row">${icon('code')}<div><b>Developer resources</b> <span class="badge gray">Not yet available</span><p>Interfaces, communication protocols and development tools.</p></div><a class="text-link" href="#/developers">Learn more ${icon('arrow')}</a></div></div></section>
    <section class="section tint"><div class="wrap"><div class="section-header"><div><h2>Find your product</h2><p>Select your product model.</p></div><a class="text-link" href="#/users">View user support ${icon('arrow')}</a></div>${productsGrid('users')}</div></section>
    <section class="section"><div class="wrap"><div class="section-header"><div><h2>Common topics</h2><p>Find first-use, charging, accessory and function topics.</p></div></div>${quickLinks('users')}</div></section>`;
  }
  function audiencePage(audience) {
    const a = C.audiences.find(x => x.id === audience);
    const dealer = audience === 'dealers';
    const modules = ['certification','handover','service','training'].map(sectionOf);
    return `<div class="wrap">${crumb([{label:a.name}])}<section class="page-head"><div class="head-row"><div><p class="eyebrow">${a.en}</p><h1>${e(a.title)}</h1><p class="lede">${dealer ? 'Select your product for certification, installation, delivery, service and technical training.' : 'Select your product for operating instructions, accessories, maintenance and common questions.'}</p></div></div></section></div>
    <section class="section"><div class="wrap"><div class="section-header"><div><h2>Select a product</h2><p>Select the product you need help with.</p></div></div>${productsGrid(audience)}</div></section>
    <section class="section tint"><div class="wrap"><div class="section-header"><div><h2>${dealer ? 'Common dealer resources' : 'Start with common topics'}</h2><p>${dealer ? 'Certification, installation, delivery, service and technical training.' : 'First use, charging, accessory installation and vehicle functions.'}</p></div><a class="text-link" href="${e(href('library',{audience}))}">Videos and downloads ${icon('arrow')}</a></div>${dealer ? `<div class="dealer-modules">${modules.map(s => `<a class="module-card" href="${e(productHref(C.products[0],audience,{section:s.id}))}">${icon(s.icon)}<h3>${e(s.title)}</h3><p>${e(s.description)}</p><span class="text-link">Browse topics ${icon('arrow')}</span></a>`).join('')}</div><div class="certificate-panel"><div class="certificate-icon">${icon('shield')}</div><div><h3>Request product certification</h3><p>Contact RJ Tech with the product model, vehicle configuration and certificate you need.</p></div><a class="button-secondary" href="${e(topicHref(C.products[0],topicOf('certificates'),'dealers'))}">How to request certificates ${icon('arrow')}</a></div>` : quickLinks(audience)}</div></section>`;
  }
  function roleSwitch(product, audience, route) {
    const q = validConfig(product,route);
    return `<nav class="role-switch" aria-label="Choose a support area"><span>Support area</span>${['users','dealers'].map(id => `<a class="${id === audience ? 'active' : ''}" href="${e(productHref(product,id,{model:q.model,seat:q.seat}))}" ${id === audience ? 'aria-current="page"' : ''}>${audienceName(id)}</a>`).join('')}</nav>`;
  }
  function options(items, chosen, allLabel) { return `<option value="all">${e(allLabel || 'All')}</option>${items.map(x => `<option value="${e(x.id)}"${chosen === x.id ? ' selected' : ''}>${e(x.name)}</option>`).join('')}`; }
  function configBar(product, route) {
    const q = validConfig(product,route);
    if (!product.modelOptions.length && !product.seatOptions.length) return '';
    const parts = `${product.modelOptions.length ? `<div class="form-group"><label for="model-choice">Vehicle model</label><select id="model-choice" name="model" data-route-filter>${options(product.modelOptions,q.model,'All models')}</select></div>` : ''}${product.seatOptions.length ? `<div class="form-group"><label for="seat-choice">Seat configuration</label><select id="seat-choice" name="seat" data-route-filter>${options(product.seatOptions,q.seat,'All seats')}</select></div>` : ''}`;
    return `<div class="config-bar">${parts}<span class="badge gray">Select your vehicle configuration</span></div>`;
  }
  function topicsFor(product, audience, sectionId) {
    return C.topics.filter(t => product.topicIds.includes(t.id) && t.audiences.includes(audience) && (sectionId === 'shared' ? t.audiences.includes('users') : t.sectionId === sectionId));
  }
  function sideNav(product, audience, route, doc) {
    const q = validConfig(product,route);
    const active = doc ? (doc.audiences.includes('users') && audience === 'dealers' ? 'shared' : doc.sectionId) : route.params.get('section');
    return `<aside class="${doc ? 'doc-nav' : 'side-nav'}" aria-label="Product support topics"><p class="side-label">${e(product.name.toUpperCase())}</p><a class="side-item${!active ? ' active' : ''}" href="${e(productHref(product,audience,q))}">${icon('grid')}All topics</a>${(product.sectionIds[audience] || []).map(id => {const s = sectionOf(id);return `<a class="side-item${active === id ? ' active' : ''}" href="${e(productHref(product,audience,{...q,section:id}))}">${icon(s.icon)}${e(s.title)}</a>`;}).join('')}<p class="side-note">Choose an operation, accessory or maintenance topic.</p></aside>`;
  }
  function productPage(product, route) {
    const audience = roleOf(route), q = validConfig(product,route);
    const selected = route.params.get('section'), all = product.sectionIds[audience] || [];
    const sections = (all.includes(selected) ? [selected] : all).map(sectionOf);
    const ready = publishedResources(product,audience).some(r=>matchesConfig(r,q));
    return `<div class="wrap">${crumb([{label:audienceName(audience),url:href(audience)},{label:product.name}])}<section class="page-head"><div class="head-row"><div><p class="eyebrow">${e(product.family)} / ${audience === 'dealers' ? 'DEALER RESOURCES' : 'USER SUPPORT'}</p><h1>${e(product.name)}</h1><p class="lede">${audience === 'dealers' ? 'Find certification, installation, delivery, service, parts and training resources for this product.' : 'Select your model and configuration to find operation, accessory, function and maintenance resources.'}</p></div>${roleSwitch(product,audience,route)}</div></section>${configBar(product,route)}<div class="product-layout">${sideNav(product,audience,route)}<div>${ready ? `<div class="catalog-note">${icon('info')}<p>Model and seat filters show matching resources. Check installation kits, remote controls and chargers against the equipment supplied with your vehicle.</p></div>` : `<div class="empty-note">${icon('info')}<p><strong>Resources for this product are being prepared.</strong> Contact RJ Tech for specific instructions.</p></div>`}<div class="section-grid">${sections.map(s => {const topics = topicsFor(product,audience,s.id);return `<section class="section-card"><div class="section-card-head">${icon(s.icon)}<div><h3>${e(s.title)}</h3><p>${e(s.description)}</p></div></div><div class="topic-list">${topics.length ? topics.map(t => `<a class="topic-item" href="${e(topicHref(product,t,audience,q))}">${icon(t.icon)}<span>${e(t.title)}</span><span class="mini${resourcesFor(product,t,audience,q).length ? ' available' : ''}">${e(topicStatus(product,t,audience,q))}</span>${icon('chevron')}</a>`).join('') : '<p class="design-note" style="padding:8px 7px;margin:0">No public resources in this category yet.</p>'}</div></section>`;}).join('')}</div></div></div></div>`;
  }
  function topicPage(product, topic, route) {
    const audience = roleOf(route), q = validConfig(product,route);
    const resources = resourcesFor(product,topic,audience,q);
    const otherConfig = resourcesFor(product,topic,audience,{}).length && !resources.length;
    const chosen = route.params.get('resource');
    const enquiry = !resources.length && product.topicStatuses?.[topic.id];
    resources.sort((a,b) => (b.id === chosen) - (a.id === chosen) || ({guide:0,accessory:0,function:0,service:0,training:0,certificate:0,video:1,document:2}[a.type] || 0) - ({guide:0,accessory:0,function:0,service:0,training:0,certificate:0,video:1,document:2}[b.type] || 0));
    const names = [product.name, ...(q.model ? [product.modelOptions.find(x=>x.id===q.model).name] : []), ...(q.seat ? [product.seatOptions.find(x=>x.id===q.seat).name] : [])];
    const files = resources.filter(r=>r.assets.some(a=>a.kind === 'file'));
    const videos = resources.filter(r=>r.type === 'video');
    const contact = `<a class="button-secondary" href="mailto:sales@rjtech-offroad.com">Contact RJ Tech ${icon('external')}</a>`;
    return `<div class="wrap">${crumb([{label:audienceName(audience),url:href(audience)},{label:product.name,url:productHref(product,audience,q)},{label:topic.title}])}${configBar(product,route)}<div class="doc-layout">${sideNav(product,audience,route,topic)}<article class="doc-content"><p class="doc-kicker">${e(product.name)} / ${e(typeName(topic.kind))}</p><h1>${e(topic.title)}</h1><p class="doc-description">${e(topic.summary)}</p><div class="metadata">${names.map(n=>`<span class="badge dark">${e(n)}</span>`).join('')}<span class="badge${resources.length ? ' red' : ' gray'}">${e(topicStatus(product,topic,audience,q))}</span></div>${resources.length ? resources.map(r=>resourceBody(r,product,chosen)).join('') : `<section class="doc-slot"><h2>${otherConfig ? 'Resources for other configurations' : enquiry || 'No resources available yet'}</h2><p>${otherConfig ? 'Adjust the model or seat filter to see matching resources. Confirm installation and operation requirements for your configuration with the supplying dealer.' : 'Contact RJ Tech with your product model and vehicle configuration for help with this topic.'}</p>${otherConfig ? `<a class="button-secondary" href="${e(topicHref(product,topic,audience))}">View all configurations ${icon('arrow')}</a>` : contact}</section>`}</article><aside class="doc-aside" aria-label="Related resources"><section class="aside-box"><h3>Topic resources</h3>${resources.length ? `<p>${resources.filter(r=>r.content.length).length} online guides · ${videos.length} videos · ${files.length} files</p><ul class="aside-index">${resources.map(r=>`<li><a href="${e(topicHref(product,topic,audience,{...q,resource:r.id}))}">${e(r.title)}</a></li>`).join('')}</ul>` : '<p>Select your vehicle configuration or contact support.</p>'}</section>${files.length ? `<section class="aside-box"><h3>Download files</h3>${files.map(r=>`<a class="aside-file" href="${e(r.assets.find(a=>a.kind==='file').url)}" target="_blank" rel="noopener noreferrer">${icon('file')}<span>${e(r.title)}<small>${e(languageName(r.language))} · ${e(r.assets.find(a=>a.kind==='file').format)} · ${e(fileOriginLabel(r.assets.find(a=>a.kind==='file')))}</small></span></a>`).join('')}</section>` : ''}<section class="aside-box"><h3>Need help?</h3><p>Provide your product model, VIN and accessory photos so we can confirm the configuration.</p><a class="text-link" href="mailto:sales@rjtech-offroad.com">Contact RJ Tech ${icon('external')}</a></section><section class="aside-box"><h3>Keep browsing</h3><a class="text-link" href="${e(productHref(product,audience,q))}">Back to product resources ${icon('arrow')}</a></section></aside></div></div>`;
  }
  function developerPage(route) {
    const selected = productOf(route.params.get('product'));
    return `<div class="wrap">${crumb([{label:'Developer resources'}])}<section class="page-head"><div class="planned-hero"><p class="eyebrow">DEVELOPER RESOURCES</p><span class="badge gray">Not yet available</span></div><h1>Developer resources</h1><p class="lede">Developer resources are not yet available. Contact RJ Tech for information about interfaces, communication protocols or integration.${selected ? '<br>Selected product: ' + e(selected.name) : ''}</p><a class="button-secondary" href="https://www.rjtech-offroad.com/" target="_blank" rel="noopener noreferrer">Contact RJ Tech ${icon('external')}</a></section></div><section class="section"><div class="wrap"><div class="section-header"><div><h2>Development and integration${selected ? ' · ' + e(selected.name) : ''}</h2><p>These resources are not yet available.</p></div></div><div class="developer-grid">${C.developerModules.map(m => `<div class="module-card">${icon(m.icon)}<h3>${e(m.title)}</h3><p>${e(m.description)}</p><span class="badge gray" style="margin-top:18px">Not yet available</span></div>`).join('')}</div></div></section><section class="section tint"><div class="wrap"><div class="section-header"><div><h2>Select a product</h2><p>Include your product model and integration requirements when contacting us.</p></div></div>${productsGrid('developers')}</div></section>`;
  }
  function filterSelect(name, label, items, chosen) {
    return `<div class="filter-group"><label for="filter-${e(name)}">${e(label)}</label><select id="filter-${e(name)}" name="${e(name)}" data-route-filter>${options(items,chosen)}</select></div>`;
  }
  function libraryPage(route) {
    const audience = roleOf(route), product = productOf(route.params.get('product'));
    const type = route.params.get('type'), requestedLanguage = route.params.get('language');
    const allowedTypes = C.resourceTypes.filter(t => audience === 'dealers' || !['certificate','service','training'].includes(t.id));
    const topics = C.topics.filter(t=>t.audiences.includes(audience) && (product ? product.topicIds.includes(t.id) : C.products.some(p=>p.topicIds.includes(t.id))) && (!type || type === 'all' || t.kind === type));
    const matchingType = publishedResources(product,audience).filter(r=>!type || type === 'all' || r.type === type);
    const availableLanguages = (C.site.visibleResourceLanguages || [C.site.language]).filter(id=>matchingType.some(r=>r.language === id));
    const language = availableLanguages.includes(requestedLanguage) ? requestedLanguage : null;
    const resources = matchingType.filter(r=>!language || r.language === language);
    const files = resources.filter(r=>r.type === 'document').length, videos = resources.filter(r=>r.type === 'video').length;
    return `<div class="wrap">${crumb([{label:'Videos and downloads'}])}<section class="page-head"><div class="head-row"><div><p class="eyebrow">VIDEOS & DOWNLOADS</p><h1>Videos and downloads</h1><p class="lede">Online guides and downloads are in English. Use the vehicle scope to choose matching files; videos retain their original audio language.</p></div></div></section><div class="filter-panel">${filterSelect('audience','Support area',[{id:'users',name:'User support'},{id:'dealers',name:'Dealer resources'}],audience).replace('<option value="all">All</option>','')}${filterSelect('product','Product',C.products.map(p=>({id:p.id,name:p.name})),product?.id)}${filterSelect('type','Resource type',allowedTypes,type)}${filterSelect('language','Language',availableLanguages.map(id=>({id,name:languageName(id)})),language)}</div><div class="results-bar"><span>${e(audienceName(audience))} ${product ? ' / ' + e(product.name) : '/ All products'}</span><span>${resources.length} resources · ${videos} videos · ${files} files</span></div>${resources.length ? `<div class="topic-results">${resources.map(r=>resourceCard(r,audience)).join('')}</div>` : `<div class="empty-state">${icon('folder')}<h2>No resources match these filters</h2><p>Adjust the product, resource type or language filter. Contact RJ Tech if the resources you need are not yet available.</p></div>`}<section class="section"><div class="section-header"><div><h2>Browse by topic</h2><p>Choose an operation, accessory or maintenance topic.</p></div></div><div class="topic-results">${topics.map(t=>{const p=product || C.products.find(p=>p.topicIds.includes(t.id));return `<a class="result-card" href="${e(topicHref(p,t,audience))}">${icon(t.icon)}<div><h3>${e(t.title)}</h3><p>${e(t.summary)}</p><div class="result-meta">${e(p.name)} · ${e(typeName(t.kind))} · ${e(topicStatus(p,t,audience))}</div></div></a>`;}).join('') || '<p class="design-note">No topics match these filters.</p>'}</div></section></div>`;
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
    return `<div class="wrap">${crumb([{label:'Search'}])}<section class="page-head"><p class="eyebrow">SEARCH SUPPORT</p><h1>Search products and support topics</h1><p class="lede">Search ${e(audienceName(audience))} for products, operation, accessories and maintenance topics.</p>${searchForm(audience,query)}</section><div class="results-bar"><span>${query.trim() ? 'Search: ' + e(query) : 'Enter a search term to get started'}</span><span>${count} results</span></div>${count ? `<div class="topic-results">${results.resources.map(r=>resourceCard(r,audience)).join('')}${results.products.map(p=>`<a class="result-card" href="${e(productHref(p,audience))}">${icon('grid')}<div><h3>${e(p.name)}</h3><p>${e(p.description)}</p><div class="result-meta">Product topics</div></div></a>`).join('')}${results.topics.map(({product:p,topic:t})=>`<a class="result-card" href="${e(topicHref(p,t,audience))}">${icon(t.icon)}<div><h3>${e(t.title)}</h3><p>${e(t.summary)}</p><div class="result-meta">${e(p.name)} · ${e(typeName(t.kind))} · ${e(topicStatus(p,t,audience))}</div></div></a>`).join('')}</div>` : `<div class="empty-state">${icon('search')}<h2>${query.trim() ? 'No matching resources, products or topics' : 'Try a product name, charging, accessories or following'}</h2><p>You can also browse the product topics.</p><a class="button-secondary" href="${e(href(audience))}">Browse ${e(audienceName(audience))} ${icon('arrow')}</a></div>`}<div style="height:42px"></div></div>`;
  }
  function notFound() { return `<div class="wrap"><section class="section"><div class="empty-state">${icon('folder')}<h1 style="font-size:26px">Page not found</h1><p>Return to support home and select your product or support topic.</p><a class="button-secondary" href="#/">Back to support home ${icon('arrow')}</a></div></section></div>`; }
  function pageFor(route) {
    const key = route.parts[0];
    if (!key) return {title:'Product support',html:homepage()};
    if (key === 'users' || key === 'dealers') return {title:audienceName(key),html:audiencePage(key)};
    if (key === 'developers') return {title:'Developer resources',html:developerPage(route)};
    if (key === 'library') return {title:'Videos and downloads',html:libraryPage(route)};
    if (key === 'search') return {title:'Search',html:searchPage(route)};
    if (key === 'product') {
      const product = productOf(route.parts[1]);
      if (product && route.parts.length === 2) return {title:product.name,html:productPage(product,route)};
      const topic = topicOf(route.parts[3]);
      if (product && route.parts[2] === 'topic' && route.parts.length === 4 && topic && product.topicIds.includes(topic.id) && topic.audiences.includes(roleOf(route))) return {title:topic.title + ' · ' + product.name,html:topicPage(product,topic,route)};
    }
    return {title:'Page not found',html:notFound()};
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
      action.setAttribute('aria-label',open ? 'Close navigation' : 'Open navigation');
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
