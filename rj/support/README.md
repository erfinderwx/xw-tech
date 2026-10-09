# RJ Tech product support

Support centre: https://xw-tech.de/rj/support/
Existing service guide: https://xw-tech.de/rj/

The existing User support, Dealer resources and Developer resources architecture uses English navigation, topics, filters, search, statuses and help text. The black, white and red design and product expansion model are unchanged. Following remains a configuration enquiry; developer resources are not yet available.

## Files and content languages

- `index.html`: entry point, English document language and cache versions.
- `catalog.js`: audiences, products, model/seat options and topics. `site.visibleResourceLanguages: ['en']` controls which resource languages appear throughout the support centre.
- `content.js`: all 40 original resource records, comprising 23 online guides/enquiries, 8 downloads and 9 videos. The original Chinese text, configuration scopes, sources and asset URLs are retained unchanged.
- `content-en.js`: English titles, scopes and revision labels for the six existing English downloads. This display metadata does not alter the original records or the files.
- `app.js`: shared page templates, navigation, search and filters. The language policy applies before topic, directory and search results are built. Old direct links to Chinese records cannot reveal them in the support centre.
- `styles.css`: responsive layout and existing visual design.
- `files/`: public manuals, remote/FPV instructions and prepared dual-seat/footrest installation diagrams.
- `assets/`: original instruction images and two accessory installation videos. Seven service videos reuse the existing service guide assets.

Only the six English downloads currently appear. The Chinese online text, two Chinese downloads and all nine Chinese-language video records remain in the repository but are hidden from the support centre's directory, search and topic pages. This is a display preference, not access control; public asset URLs and the existing service guide remain unchanged. To restore Chinese resources later, update the central language policy and provide the intended language presentation. Adding a product still requires only catalogue data and scoped resource records, without new page templates.

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

Checks cover English page output, retained source records, the language policy on direct routes/search/filters, configuration and audience scope, source files, escaped queries and adding another product. After deployment verify the live English navigation, English downloads, hidden Chinese records, responsive layout and original service guide entry.
