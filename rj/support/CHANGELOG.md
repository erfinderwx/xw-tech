# RJ Tech support website versions

Website versions use `V<major>.<minor>` and are separate from document revisions such as user manual V06.

- Content, copy, files, minor interface changes and fixes increment the minor version: V1.1, V1.2, and so on.
- Major changes to the support architecture, navigation or resource organisation increment the major version and reset the minor version: V2.0, V3.0, and so on.
- Every public website update must update the website version, this changelog, the page version display and asset cache versions before deployment. Internal repository maintenance that does not change the public website does not need a new website version.
- Add new entries at the top. Retain released entries and identify each published version by its Git commit and deployment record. After verification, freeze its commit in a snapshot branch named `rj-support-v<major>.<minor>`; never change an older snapshot. Main remains the deployment branch. A rollback reuses the recorded version and commit.
- The owner establishes the existing L7e edition as V1.0 on 2026-10-09. Earlier unnumbered work is not a separate numbered release.

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
