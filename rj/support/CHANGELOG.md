# RJ Tech support website versions

Website versions use `V<major>.<minor>` and are separate from document revisions such as user manual V06.

- Content, copy, files, minor interface changes and fixes increment the minor version: V1.1, V1.2, and so on.
- Major changes to the support architecture, navigation or resource organisation increment the major version and reset the minor version: V2.0, V3.0, and so on.
- Every public website update must update the website version, this changelog, the page version display and asset cache versions before deployment. Internal repository maintenance that does not change the public website does not need a new website version.
- Add new entries at the top. Retain released entries and identify each published version by its Git commit and deployment record. After verification, freeze its commit in a snapshot branch named `rj-support-v<major>.<minor>`; never change an older snapshot. Main remains the deployment branch. A rollback reuses the recorded version and commit.
- The owner establishes the existing L7e edition as V1.0 on 2026-10-09. Earlier unnumbered work is not a separate numbered release.

## V2.1 — 2026-10-10

Fill Luchs operating topics with instructions extracted from the approved external manuals.

Version snapshot: [rj-support-v2.1](https://github.com/erfinderwx/xw-tech/tree/rj-support-v2.1/rj/support).

- Add separate A/B guides for first use, remote control, charging, routine care and observable fault checks. Use original control and charging figures. Replace repeated web-manual introductions in operating topics with actual steps and tables.
- Label all new extracts V0.1, including Basic guide and Partial guide labels where maintenance and diagnosis remain incomplete. Show the source manual revision separately; preserve A manual v1.4, B preliminary manual v0.9.5, Steinadler manual V06 and all original files.
- Put connector pinouts, mounting geometry, host connections and protocol-specific fault decoding in Developer resources. Keep B LCI drafts separate from VCU V2.6 and identify planned functionality. Flag conflicting B payload-power and steering values rather than inventing a specification.
- Fill product overview and web data-sheet summaries with version-specific features, values and conditions. Retain the source documents, product films, three support areas, all product entrances and file-only Downloads and topic sidebars.
- Keep unsupported battery replacement, workshop repairs, calibration and accessory installation instructions pending. Synchronise the website release, changelog, footer and cache identifiers to V2.1; retain earlier snapshots.

## V2.0 — 2026-10-10

Publish the external Luchs family materials and activate developer resources within the existing three support areas.

Version snapshot: [rj-support-v2.0](https://github.com/erfinderwx/xw-tech/tree/rj-support-v2.0/rj/support).

- Show the official Steinadler Pro vehicle image, the supplied Luchs A-4WS render and the official Luchs B image in consistent, responsive card frames. Keep the complete products visible and use compact local WebP assets.
- Treat Luchs A and B as versions of one family. Retain their existing entrances and URLs, add an A/B version switch, and use matching product-information and support topics. Keep product presentations distinct from operation instructions.
- Add each version's original English PDF brochure, data sheet and user manual, the corresponding web documents, and a product film with 1080p and 720p sources. Preserve document revisions and B's preliminary status. Correct only an outdated video filename in the supplied Luchs A web product page.
- Activate public developer categories for interfaces, protocols, SDK/software, examples, models and compatibility. Publish the supplied CAN/serial references and A-4WS IP54 models. Keep LCI drafts distinct from the B VCU V2.6 interface; share the identical ROS 1/ROS 2 packages between A and B.
- Keep Downloads and topic sidebars file-only. Add developer support-area filtering; keep online documents and films in product topics and search. Keep the 40 Steinadler source records, 34 active Steinadler resources, five Steinadler downloads, nine videos, seven caption tracks, L7e scope and original service guide unchanged.
- Record source-file hashes and image provenance. Synchronise the website version, rendered footer and cache identifiers to V2.0. Certificates, unsupported service procedures, unprovided models and unconfirmed functionality are not added.

## V1.2 — 2026-10-09

Make the top-level resource entry a file-only Downloads page.

Version snapshot: [rj-support-v1.2](https://github.com/erfinderwx/xw-tech/tree/rj-support-v1.2/rj/support).

- Rename the navigation entry and page to Downloads. List only downloadable files and link file titles and buttons directly to the original downloads.
- Remove online-guide/video listings, the topic directory, video/resource statistics and the unnecessary resource-type filter from this page. Retain support-area, product and file-language filters with responsive layout.
- Keep old library links working as downloads, including old video, guide and Chinese-language filter URLs. Preserve all guides, videos, product topics, search and original files.
- Retain the V1.1 download-only topic sidebar card and update all website version/cache records to V1.2.

## V1.1 — 2026-10-09

Simplify the topic-page resource card to downloadable files only.

Version snapshot: [rj-support-v1.1](https://github.com/erfinderwx/xw-tech/tree/rj-support-v1.1/rj/support).

- Remove the duplicate sidebar index of online guides and videos, together with its resource counts.
- Keep one Download files card for the files available in that topic; omit it when the topic has no downloadable files. File links support direct downloads.
- Retain all main-page guides, nine videos, five English downloads, help and product-navigation cards, the original service guide, and all source records.
- Update the release record, on-page Website V1.1 label and local asset cache versions together.

## V1.0 — 2026-10-09

Initial recorded version, based on the deployed [L7e content baseline](https://github.com/erfinderwx/xw-tech/commit/d8d52dd2b0cec477c163b6aefb061d176366ae95).

Version snapshot: [rj-support-v1.0](https://github.com/erfinderwx/xw-tech/tree/rj-support-v1.0/rj/support).

- Retain User support, Dealer resources and Developer resources, with all existing product entrances and the black, white and red design.
- Present Steinadler Pro resources for L7e; remove model and single-/dual-seat selectors while retaining actual installation conditions.
- Retain the optional L7e range extender guide and English PDF; withdraw three old Offroad operating guides and the older vehicle manual from current listings.
- Offer the L7e-A1 V06 manual, with 34 active resources, five English downloads and nine original videos. Seven service videos retain English captions.
- Keep the original service guide and source files. Following remains a configuration enquiry; Luchs A/B and developer resources remain pending. Private certificates and internal development materials remain outside the public release.
- Establish version records, an on-page Website V1.0 label and consistency checks for future updates.
