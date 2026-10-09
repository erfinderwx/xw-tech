# RJ Tech product support

Support centre: https://xw-tech.de/rj/support/
Existing service guide: https://xw-tech.de/rj/

The existing User support, Dealer resources and Developer resources architecture and all on-page resource copy are in English, including instructions, tables, scopes, image captions, video titles and source labels. The black, white and red design and product expansion model are unchanged. Following remains a configuration enquiry; developer resources are not yet available.

## Files and content languages

- `index.html`: entry point, English document language and cache versions.
- `catalog.js`: audiences, products, model/seat options and topics. `site.language: 'en'` selects the interface language. `site.visibleResourceLanguages: ['en','zh-CN']` retains translated guides and original video audio; `site.downloadLanguages: ['en']` selects English downloads. `site.archivedResourceIds` excludes the older website manual from current listings.
- `content.js`: all 40 original resource records, comprising 23 online guides/enquiries, 8 downloads and 9 videos. The original Chinese text, configuration scopes, sources and asset URLs are retained unchanged.
- `content-en.js`: complete English display copy for all 40 records. Online guides use English as the displayed content language; `sourceLanguage` preserves the original language. Documents and videos retain their original file/audio language. Translation does not alter original records, technical values or source files.
- `app.js`: shared page templates, navigation, search and filters. English copy and the current download policy apply consistently to topics, directory results, search, direct links and sidebars under the original model, seat and audience scope. Chinese duplicate source links are omitted; archived manual citations retain their source titles without download links.
- `styles.css`: responsive layout and existing visual design.
- `files/`: public manuals, remote/FPV instructions and prepared dual-seat/footrest installation diagrams.
- `assets/`: original instruction images and two accessory installation videos. Seven service videos reuse the existing service guide media, with English-only caption tracks derived from its existing bilingual subtitles. Original photographs remain source references; their captions and explanations are in English.

The support centre exposes its English version only. There is no Chinese interface switch or separate Chinese site version. All 40 original records and eight source files are retained for provenance and recovery. Current customer listings show 37 resources: 23 English online guides/enquiries, five English downloads, and nine Chinese-audio videos. Remote control and FPV downloads each offer their English original only. Steinadler Pro L7e-A1 V06 is the current downloadable vehicle manual; the older Offroad website reference is archived. Its existing model scope is preserved, so the L7e manual is not offered as an Offroad replacement. Language options reflect the selected resource type, and old Chinese-document filter links recover to the current English download list. Seven service videos default to English captions; the two installation videos retain their original audio without supplied subtitles. Adding a product still requires only catalogue data, scoped resource records and English display copy, without new page templates.

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

Checks cover all rendered English copy, complete original translations, preserved technical values/configuration/provenance, five current English downloads, removal of archived/Chinese-file links from every rendered surface, old direct/filter routes, English subtitle text and timings, audience scope, escaped queries and adding another product. After deployment verify the five-file download list, V06 manual, remote/FPV English downloads, original video playback and service guide entry.
