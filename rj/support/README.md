# RJ Tech product support

Support centre: https://xw-tech.de/rj/support/
Existing service guide: https://xw-tech.de/rj/

## Website version management

The current recorded website release is **V2.0**. `VERSION` is the release record; `catalog.js` site.version, the rendered Website version and the asset cache versions in `index.html` must match. Release history and the V1.0 content baseline are recorded in `CHANGELOG.md`. Website versions are independent of document revisions such as user manual V06.

Each public content, copy, file, small interface update or fix increments the minor version (V1.1, V1.2, etc.). Major architecture, navigation or resource-organisation changes increment the major version and reset the minor version (V2.0, V3.0, etc.). Synchronise the version locations and prepend a dated changelog entry before publishing; preserve older entries. Record each release's Git commit and successful Pages deployment, and verify the live version. Internal maintenance with no public website change does not require a new website version. The initial V1.0 labelling and records are part of this baseline release.

Each verified release has a frozen snapshot branch, `rj-support-v<major>.<minor>`, pointing at its recorded commit. Preserve existing snapshots; publish updates through `main`. The [V2.0 snapshot](https://github.com/erfinderwx/xw-tech/tree/rj-support-v2.0/rj/support) records the current release. The [V1.2 snapshot](https://github.com/erfinderwx/xw-tech/tree/rj-support-v1.2/rj/support) and [V1.1 snapshot](https://github.com/erfinderwx/xw-tech/tree/rj-support-v1.1/rj/support) are preserved. The original [V1.0 snapshot](https://github.com/erfinderwx/xw-tech/tree/rj-support-v1.0/rj/support) provides the versioned code and records for review or rollback.

The existing User support, Dealer resources and Developer resources architecture and all on-page resource copy are in English, including instructions, tables, scopes, image captions, video titles and source labels. The black, white and red design and product expansion model are unchanged. Following remains a configuration enquiry. Public Luchs developer materials are available; Steinadler developer materials remain pending.

## Files and content languages

- `index.html`: entry point, English document language and cache versions.
- `catalog.js`: audiences, products and topics. `site.language: 'en'` selects the interface language. `site.visibleResourceLanguages: ['en','zh-CN']` retains translated guides and original video audio; `site.downloadLanguages: ['en']` selects English downloads. `site.archivedResourceIds` excludes the older website manual and three superseded Offroad guides. Steinadler Pro uses the fixed `supportScope: 'L7e'`. Original model/seat metadata is retained for source records, without public configuration selectors.
- `content.js`: all 40 original resource records, comprising 23 online guides/enquiries, 8 downloads and 9 videos. The original Chinese text, configuration scopes, sources and asset URLs are retained unchanged.
- `content-en.js`: complete English display copy for all 40 records. Online guides use English as the displayed content language; `sourceLanguage` preserves the original language. Documents and videos retain their original file/audio language. Translation does not alter original records, technical values or source files.
- `app.js`: shared page templates, navigation, search and download filters. The top-level Downloads entry shows only current file downloads, without online-guide/video listings, resource-type controls or a topic directory. Support-area, product and file-language filters remain. Download titles and buttons link directly to files; old library URLs and type/language parameters recover to the current downloads. Guides and videos remain in product topics and search. Topic-page sidebar resource cards list downloadable files only and are absent when the topic has no files; online guides and videos remain in the main content. File links support direct downloads. Existing help and product-navigation cards are retained. English copy and the L7e publication policy apply consistently to topics, directory results, search, direct links and sidebars. Model and seat selectors are removed; their old URL parameters have no effect and are not propagated in navigation. Installation-specific seat information remains in instructions. Chinese duplicate and archived manual references are omitted from customer pages; source records retain their original citations.
- `styles.css`: responsive layout and existing visual design.
- `files/`: public manuals, remote/FPV instructions and prepared dual-seat/footrest installation diagrams.
- `assets/`: original instruction images and two accessory installation videos. Seven service videos reuse the existing service guide media, with English-only caption tracks derived from its existing bilingual subtitles. Original photographs remain source references; their captions and explanations are in English. `assets/products/` holds compact card images for Steinadler Pro, Luchs A and Luchs B; `SOURCES.md` records provenance. Luchs A/B remain two entrances and version links within one Luchs family.

The support centre exposes its English version only. There is no Chinese interface switch or separate Chinese site version. All 40 original Steinadler records and eight source files are retained for provenance and recovery. Current Steinadler dealer listings retain 34 resources: 20 English online guides/enquiries, five English downloads, and nine original videos. The first-use, everyday-operation and charger-indicator guides for the old Offroad configuration are withdrawn. The optional range extender retains its operation guide and English PDF for L7e. Remote control and FPV downloads each offer their English original only. Steinadler Pro L7e-A1 V06 is the only current downloadable vehicle manual; the older website reference is archived. The Downloads language filter reflects available files; old Chinese-document and non-file resource-type links recover to the current English download list. Seven service videos default to English captions; the two installation videos remain unchanged without supplied subtitles. All three product entrances remain visible. Luchs A and B now link to their external product, operation and integration resources. Adding a product still requires only catalogue data, resource records and English display copy, without new page templates.

## Customer copy and scope

The structure is support area → product → topic → guides, videos and files. Steinadler Pro support content is presented for L7e, with accessory and installation conditions explained in each resource.

- User support covers first use, everyday operation, accessories, functions, care, videos and manuals.
- Dealer resources covers certification, installation/delivery, technical service, training and shared user instructions.
- Developer resources reserves interfaces, protocols, SDK/API, examples, engineering files and compatibility. The supplied external Luchs integration materials are public. No private certificates or internal development material is published.
- Keep original product, model, seat, audience, language, revision, date, source and visibility metadata on source records. The owner confirms the new Offroad and L7e vehicles share mechanical and electrical systems; this edition presents Steinadler content only as L7e. Retain actual accessory, seat-frame and charger requirements in instructions.
- File `origin` values distinguish `original` (Original file), `derived` (Prepared diagrams) and `reference` (Website reference). Unknown origins use the neutral Download files label.
- Do not invent missing steps, videos, files, version data or following instructions. Following is a configuration enquiry, parts are identified by enquiry, and certificates are available on request.
- The separately compiled private certificate file stays outside the public repository and public Git history. Internal review notes, research and unconfirmed drafts are not customer resources.

## Deployment and checks

The existing GitHub Pages workflow deploys `main`. Preserve unrelated projects, concurrent changes and the original `rj/index.html` service guide.

```sh
node --check rj/support/catalog.js
node --check rj/support/content.js
node --check rj/support/content-en.js
node --check rj/support/luchs.js
node --check rj/support/app.js
node scripts/check-rj-support.cjs
```

Checks cover all rendered English copy, preserved original records, source technical values and media, all product entrances, 34 active resources, five current English downloads including the optional L7e range extender, removal of configuration selectors and obsolete source links, old direct/filter routes, English subtitle text and timings, audience scope, escaped queries and adding another product. After deployment verify the five-file download list, V06 manual, L7e range extender, remote/FPV English downloads, original video playback and service guide entry.

## Luchs family external materials

Luchs A and B are versions of the same family, with the original `luchs-a` and `luchs-b` routes retained. Each version uses the same topic structure and an A/B version switch; hardware parameters, manuals and protocols stay scoped to their version. The existing three support areas, three product entrances, L7e scope and black/white/red design remain.

`luchs.js` adds 28 native English records without editing the original Steinadler data or translation files. Each version has its product page, web data sheet, web manual, three original PDFs and one product film in 1080p/720p. User and dealer Downloads have 11 files: five Steinadler files plus six Luchs PDFs. Online pages and films remain in topics and search. Topic sidebars list files only.

Developer resources use the existing six categories: hardware/interfaces, protocols, SDK/API, integration examples, models and compatibility. Developer Downloads have 18 files: the six Luchs PDFs plus 12 integration files. CAN/serial spreadsheets and DBC files are version-specific; the two byte-identical ROS 1/ROS 2 v1.1.0 packages are stored once and shared by A and B. The C++ SDK and URDF descriptions are included in those packages. STEP and GLB models cover only A-4WS IP54. A B STEP model is not supplied.

Luchs B brochures, data sheets and manual retain their Preliminary status. LCI v1.0 protocol/DBC files retain Draft status and are separate from the VCU V2.6 interface for units before LCI firmware. Document, software, firmware and website versions are independent. The public bundle is source documentation, not a claim of vehicle or SDK runtime validation. Missing service procedures, certification files and unsupported models remain pending or available on request.

`files/luchs/SOURCES.json` records the source path, length and SHA-256 of all 28 canonical imported files. Original PDFs, videos, software archives, protocols and engineering models are unchanged. The only source HTML correction is the embedded A film filename, to match the supplied versioned MP4. Embedded document images are kept in the web sources; unused image folders and the external ZIP are retained separately for reference.

Checks cover English routes, user/dealer/developer separation, version switches, shared ROS links, preliminary/draft labels, direct file links, file-only download recovery, source-byte integrity and all original Steinadler behaviour.
