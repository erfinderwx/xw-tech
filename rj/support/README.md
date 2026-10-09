# RJ Tech product support

Support centre: https://xw-tech.de/rj/support/
Existing service guide: https://xw-tech.de/rj/

The existing User support, Dealer resources and Developer resources architecture uses English navigation, topics, filters, search, statuses and help text. The black, white and red design and product expansion model are unchanged. Following remains a configuration enquiry; developer resources are not yet available.

## Files and content languages

- `index.html`: entry point, English document language and cache versions.
- `catalog.js`: audiences, products, model/seat options and topics. `site.language: 'en'` selects the interface language; `site.visibleResourceLanguages: ['en','zh-CN']` independently lists the available resource languages.
- `content.js`: all 40 original resource records, comprising 23 online guides/enquiries, 8 downloads and 9 videos. The original Chinese text, configuration scopes, sources and asset URLs are retained unchanged.
- `content-en.js`: English titles, scopes and revision labels for the six existing English downloads. This display metadata does not alter the original records or the files.
- `app.js`: shared page templates, navigation, search and filters. English interface labels are independent of resource language. Chinese records are available in topic pages, directory results, search and direct links under the original model, seat and audience scope.
- `styles.css`: responsive layout and existing visual design.
- `files/`: public manuals, remote/FPV instructions and prepared dual-seat/footrest installation diagrams.
- `assets/`: original instruction images and two accessory installation videos. Seven service videos reuse the existing service guide assets.

The support centre currently exposes its English interface only. There is no Chinese interface switch or separate Chinese site version. The Language filter selects resource language and does not change navigation, topic names or controls. All 40 public resource records are available within their audience and configuration scope: 23 online guides/enquiries, 8 downloads (6 English and 2 Chinese), and 9 Chinese-audio videos. Chinese source text and files remain in their original language. Resource language never determines whether a Chinese interface version is exposed. Adding a product still requires only catalogue data and scoped resource records, without new page templates.

## Customer copy and scope

The structure is support area → product and configuration → topic → guides, videos and files.

- User support covers first use, everyday operation, accessories, functions, care, videos and manuals.
- Dealer resources covers certification, installation/delivery, technical service, training and shared user instructions.
- Developer resources reserves interfaces, protocols, SDK/API, examples, engineering files and compatibility. No internal development material is published.
- Keep product, model, seat, audience, language, revision, date, source and visibility on each record. Do not combine unconfirmed configuration-specific parameters.
- File `origin` values distinguish `original` (Original file), `derived` (Prepared diagrams) and `reference` (Website reference). Unknown origins use the neutral Download files label.
- Do not invent missing steps, videos, files, version data or following instructions. Following is a configuration enquiry, parts are identified by enquiry, and certificates are available on request.
- The separately compiled private certificate file stays outside the public repository and public Git history. Internal review notes, research and unconfirmed drafts are not customer resources.

## Deployment and checks

The existing GitHub Pages workflow deploys `main`. Preserve unrelated projects, concurrent changes and the original `rj/index.html` service guide.

```sh
node --check rj/support/catalog.js
node --check rj/support/content.js
node --check rj/support/content-en.js
node --check rj/support/app.js
node scripts/check-rj-support.cjs
```

Checks cover the English interface, original Chinese and English resources, direct routes/search/language filters, configuration and audience scope, source files, escaped queries and adding another product. After deployment verify English navigation and controls, both Chinese downloads, Chinese-audio video playback and the original service guide entry.
