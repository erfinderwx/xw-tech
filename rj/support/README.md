# RJ Tech product support

Support centre: https://xw-tech.de/rj/support/
Existing service guide: https://xw-tech.de/rj/

The existing User support, Dealer resources and Developer resources architecture and all on-page resource copy are in English, including instructions, tables, scopes, image captions, video titles and source labels. The black, white and red design and product expansion model are unchanged. Following remains a configuration enquiry; developer resources are not yet available.

## Files and content languages

- `index.html`: entry point, English document language and cache versions.
- `catalog.js`: audiences, products, model/seat options and topics. `site.language: 'en'` selects the interface language; `site.visibleResourceLanguages: ['en','zh-CN']` independently lists the available resource languages.
- `content.js`: all 40 original resource records, comprising 23 online guides/enquiries, 8 downloads and 9 videos. The original Chinese text, configuration scopes, sources and asset URLs are retained unchanged.
- `content-en.js`: complete English display copy for all 40 records. Online guides use English as the displayed content language; `sourceLanguage` preserves the original language. Documents and videos retain their original file/audio language. Translation does not alter original records, technical values or source files.
- `app.js`: shared page templates, navigation, search and filters. English copy is used for topic pages, directory results, search and direct links under the original model, seat and audience scope.
- `styles.css`: responsive layout and existing visual design.
- `files/`: public manuals, remote/FPV instructions and prepared dual-seat/footrest installation diagrams.
- `assets/`: original instruction images and two accessory installation videos. Seven service videos reuse the existing service guide media, with English-only caption tracks derived from its existing bilingual subtitles. Original photographs remain source references; their captions and explanations are in English.

The support centre exposes its English version only. There is no Chinese interface switch or separate Chinese site version. The Language filter uses English for translated online guides and the original file or audio language for downloads and videos. All 40 public resource records are available within their audience and configuration scope: 23 English online guides/enquiries, 8 original downloads (6 English and 2 Chinese), and 9 Chinese-audio videos. Seven service videos default to English captions. The two original installation videos do not have supplied subtitle tracks. Original Chinese source records and files are retained; only English display copy is rendered. Adding a product still requires only catalogue data, scoped resource records and English display copy, without new page templates.

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

Checks cover all rendered English copy, translation coverage, preserved technical values/configuration/source URLs, original Chinese and English attachments, English subtitle text and timings, direct routes/search/language filters, audience scope, escaped queries and adding another product. After deployment verify English instructions and tables, both Chinese downloads with English labels, video playback with English captions, and the original service guide entry.
