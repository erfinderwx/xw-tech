# RJ Tech support website versions

Website versions use `V<major>.<minor>` and are separate from document revisions such as user manual V06.

- Content, copy, files, minor interface changes and fixes increment the minor version: V1.1, V1.2, and so on.
- Major changes to the support architecture, navigation or resource organisation increment the major version and reset the minor version: V2.0, V3.0, and so on.
- Every public website update must update the website version, this changelog, the page version display and asset cache versions before deployment. Internal repository maintenance that does not change the public website does not need a new website version.
- Add new entries at the top. Retain released entries and identify each published version by its Git commit and deployment record. After verification, freeze its commit in a snapshot branch named `rj-support-v<major>.<minor>`; never change an older snapshot. Main remains the deployment branch. A rollback reuses the recorded version and commit.
- The owner establishes the existing L7e edition as V1.0 on 2026-10-09. Earlier unnumbered work is not a separate numbered release.

## V2.11 — 2026-10-21

Show the owner-requested black paint version of the Steinadler backrest-and-mirror rendering.

Version snapshot: [rj-support-v2.11](https://github.com/erfinderwx/xw-tech/tree/rj-support-v2.11/rj/support).

- Recolour the existing gold-painted vehicle illustration to satin black, preserving its camera, equipment, tyre/rim design, red mechanical accents and transparent presentation. Use the new image for the shared product hero and the labelled gallery rendering.
- Update the product-image labels and configuration captions to black. Keep the single-seat and dual-seat real photographs in their original colours and retain the earlier gold illustration as a source asset.
- Record the source and output hashes in assets/products/v211/SOURCES.json. Synchronise website version and cache labels to V2.11; retain existing support resources, downloads, product videos and TAR A branding.

## V2.10 — 2026-10-20

Add genuine whole-vehicle photographs of single-seat and dual-seat Steinadler configurations to the product gallery.

Version snapshot: [rj-support-v2.10](https://github.com/erfinderwx/xw-tech/tree/rj-support-v2.10/rj/support).

- Put real single-seat and dual-seat product photographs first in the gallery, with explicit seating and equipment captions. The product-gallery entrance thumbnail follows the first real photograph.
- Retain the approved gold product rendering after the photographs and identify it as a rendering. Record photo dimensions, sources and original byte hashes in assets/products/v210/SOURCES.json.
- Synchronise the website version and asset cache labels to V2.10. Keep the selected TAR A mark, existing support architecture, videos and file revisions.

## V2.9 — 2026-10-20

Display the owner-selected blue TAR concept A on the support platform for appearance review.

Version snapshot: [rj-support-v2.9](https://github.com/erfinderwx/xw-tech/tree/rj-support-v2.9/rj/support).

- Replace the temporary TAR typography in the shared header and footer with the original concept A PNG. Keep the official RJ Tech logo above it and scale both brand rows for desktop and mobile.
- Clip only the new image's blank canvas in CSS and retain its original bytes, colours and proportions. Record source dimensions and SHA256; preserve the previous temporary SVG as history.
- Synchronise the website version and local asset cache labels to V2.9. The support navigation, released red interface, product media, downloads and document revisions are unchanged.

## V2.8 — 2026-10-20

Remove the owner-selected Steinadler footboard detail photograph from the public product gallery.

Version snapshot: [rj-support-v2.8](https://github.com/erfinderwx/xw-tech/tree/rj-support-v2.8/rj/support).

- Remove the footboard detail gallery entry and its visible captions. Update the gallery introduction to describe the retained gold backrest-and-mirror illustration; the image count follows the selected gallery entries.
- Retain the approved Steinadler V4 product illustration, all product and support videos, other product galleries, original source photograph, source records and historical snapshots.
- Synchronise the website version and local asset cache labels to V2.8.

## V2.7 — 2026-10-20

Add selected Steinadler application footage, official YouTube films and the owner-supplied Luchs B presentation.

Version snapshot: [rj-support-v2.7](https://github.com/erfinderwx/xw-tech/tree/rj-support-v2.7/rj/support).

- Retain the approved V2.6 product images, galleries and three existing showcase clips. Add four silent, continuous Steinadler excerpts showing speed-bump crossing, low-speed steering, trailer manoeuvring and winter yard driving, with genuine source-frame posters.
- Add the complete visual sequence of the supplied Luchs B film as a silent presentation. Its caption distinguishes real driving, sensor-equipped visualisations and the offline public-dataset example; original accelerated-footage labels remain.
- Add two external official RJ Tech Global YouTube films for agriculture/transport and mountain/rough-road applications. Verify channel ownership through the brand website; keep original YouTube hosting without downloaded videos, thumbnails or embedded third-party requests.
- Extend each product media page to multiple videos and show the matching video count on product cards. Use explicit playback controls, portrait-friendly layouts and direct video links. Keep video browsing separate from file-only Downloads.
- Record source hashes, original filenames, excerpt boundaries, processing and configuration differences in assets/products/v27/SOURCES.json. Keep full originals and private source paths outside the public repository; do not convert source filenames or older promotional claims into current L7e specifications.
- Synchronise the website version and cache labels to V2.7; preserve existing documents, source files, software preview links, branding, red theme and release snapshots.

## V2.6 — 2026-10-12

Publish the approved transparent product images and corresponding product showcase videos for Steinadler, Luchs A and Luchs B.

Version snapshot: [rj-support-v2.6](https://github.com/erfinderwx/xw-tech/tree/rj-support-v2.6/rj/support).

- Use the selected shadow-free A/B raster renders and the owner-approved Steinadler V4 illustration with coordinated front-quarter views. Keep the original images and source materials.
- Link product images to an enlarged product gallery. Identify renderings, real photographs and film stills in their captions, and present each product's own silent driving showcase with a genuine film-frame poster.
- Replace the Steinadler card's accessory-installation video entrance with whole-vehicle driving footage. Preserve all accessory installation and service videos in their existing support topics. State that the black single-saddle vehicle in the film differs from the gold backrest-and-mirror image.
- Preserve all manuals, downloads, public protocols, original films, fixed software preview links and document revisions. Private models and review material remain outside the public repository. Retain the released red theme and existing branding.
- Synchronise the website version and cache labels to V2.6, and retain all prior snapshots.

## V2.5 — 2026-10-11

Unify the Luchs product views, add model-specific real-product media and use the official RJ Tech logo with a temporary secondary TAR wordmark.

Version snapshot: [rj-support-v2.5](https://github.com/erfinderwx/xw-tech/tree/rj-support-v2.5/rj/support).

- Use the previously prepared A and B raster renders with matching camera orientation and proportional display. Preserve their source images, existing card assets and private render/model files; publish only the selected raster outputs.
- Add photo and video entrances beneath product images, with separate product media pages, photo enlargement, accurate configuration captions and corresponding existing films. Identify film stills and accessory-installation footage explicitly; do not fill a gallery with rendered or repeated photographs.
- Replace the approximate header mark with the byte-identical official RJ Tech logo, retain its standard colours and add an owner-requested temporary TAR wordmark below it. Use a support-specific favicon without changing other websites' assets.
- Retain the existing red interface palette. The blue-theme sample is supplied separately for review and is not activated on the public website.
- Preserve all current manuals, downloads, software preview links, document editions, original media and source hashes. Synchronise the website version and cache labels to V2.5 and preserve previous snapshots.

## V2.4 — 2026-10-11

Replace the two ROS software main downloads with versioned GitHub development-preview entrances.

Version snapshot: [rj-support-v2.4](https://github.com/erfinderwx/xw-tech/tree/rj-support-v2.4/rj/support).

- Link the shared A/B ROS 2 Humble/Jazzy and ROS 1 Noetic records to the corresponding folders at `luchs-v1.1.0-preview.1` in `erfinderwx/rj-platform-developer`. Show View on GitHub, repository metadata, Development preview and the original v1.1.0 source baseline, plus the version development manual.
- Keep the original two ZIP files, source hashes and provenance links available. Repository entrances are not downloadable files; Downloads and topic sidebars remain file-only, with 23 current developer files and unchanged user/dealer file lists.
- Update only the ROS 2 quick-start reading guide to V0.2 with the versioned Git checkout and workspace layout. Keep its original V0.1 PDF and source record, the six other guides and every original imported file.
- Keep software-only examples, B dry-run defaults, VCU/draft-LCI separation and pending firmware, geometry and harness questions explicit. The preview does not claim real-vehicle validation.
- Synchronise the website release and cache labels to V2.4; preserve independent document/software versions and all earlier snapshots.

## V2.3 — 2026-10-11

Add prepared developer reading guides from the existing public ROS 2 v1.1.0 package.

Version snapshot: [rj-support-v2.3](https://github.com/erfinderwx/xw-tech/tree/rj-support-v2.3/rj/support).

- Add seven developer-only topics covering ROS 2 setup, CAN connection, ROS interfaces, sensor integration, communication diagnostics, A protocol reading and separate B VCU/draft-LCI reading. Supply a prepared PDF for each topic, with its own guide edition V0.1, source software version, source-file references and Apache-2.0 attribution.
- Reorganise the public source into explanations, passive decoding examples and software-only simulator examples. Keep B firmware, harness, geometry and planned-feature limitations explicit; do not turn a driver default or simulated behaviour into a delivered-vehicle claim.
- Keep all existing resource records, manuals, protocol files, software archives, product images, operating pages and user/dealer downloads unchanged. Add seven prepared PDFs to Developer Downloads; do not upload raw source documents or any internal, review or communication package.
- Synchronise the website release and cache labels to V2.3. Preserve the original manual/software revisions and earlier release snapshots.

## V2.2 — 2026-10-11

Unify the three product entrances with complete rendered product views.

Version snapshot: [rj-support-v2.2](https://github.com/erfinderwx/xw-tech/tree/rj-support-v2.2/rj/support).

- Use the official Steinadler Pro L7e three-quarter render facing right. Retain the existing owner-supplied Luchs A render and replace the previous Luchs B image with a render from the owner-confirmed chassis model. Show all three products in matching transparent 3:2 frames with proportional resizing and a shared baseline.
- Give Luchs B a visibly larger image footprint than Luchs A to reflect its larger chassis. These separately framed product cards are illustrative, not a technical drawing to a common dimensional scale.
- Preserve B's native exterior dimensions, deck outline, seams and fittings. Use real-product black paint and rubber/metal finishes, with tyre-surface detail and red steering/caliper finishes informed by the existing public product imagery. The B image has no sensors, antennas or product light strip.
- Keep the private B assembly and render scenes outside the public repository. Publish only the raster product images and record their approved source provenance.
- Retain the three support areas, all product routes and existing support content. Synchronise the website version, changelog, footer and cache identifiers to V2.2; preserve earlier release snapshots and independent document revisions.

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
