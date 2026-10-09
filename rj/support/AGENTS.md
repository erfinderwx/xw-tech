# RJ Tech support website maintenance

These instructions apply to `rj/support/`. Follow the human user's explicit scope and version choices first.

## Version management

- The website's recorded baseline is V1.0. `VERSION` contains the current numeric website version; `catalog.js` site.version and every local asset cache query in `index.html` must match it.
- Public content, copy, downloads, videos, minor interface changes and fixes require the next minor version (V1.1, V1.2, etc.). Major architecture, navigation or resource-organisation changes require the next major version with minor reset to zero (V2.0, V3.0, etc.). Never publish changed customer content under an unchanged release number.
- Before publishing, synchronise `VERSION`, `catalog.js`, the newest `CHANGELOG.md` entry, the rendered Website version label and the local asset cache queries. Preserve previous release entries. The initial V1.0 version-management setup belongs to the baseline release.
- Website versions are independent of PDF/DOCX/manual revisions. Do not relabel a user manual or change its source revision when the website version changes.
- Start from the latest `main`, preserve concurrent and unrelated project changes, run syntax checks and `node scripts/check-rj-support.cjs` from the repository root, and resolve any failures.
- Complete GitHub Pages deployment and verify the live Website version before reporting a release complete. Record the release number, Git commit, successful deployment and verification in the handoff. Keep a screenshot of the visible version label.
- Freeze each verified release commit in a snapshot branch named `rj-support-v<major>.<minor>`, and link it from its changelog entry. Check for an existing ref first; never overwrite a historical snapshot. `main` remains the deployment branch. Use recorded snapshots for review or rollback.

## Existing scope

- Keep all product entrances and the existing User support, Dealer resources and Developer resources architecture unless the user requests a change.
- Steinadler resources currently use L7e without model or seat selectors. The optional range extender is retained. Seat-frame and accessory conditions remain in instructions.
- Keep the English interface and customer copy, original source records and files, video audio and existing service guide. The Chinese interface stays hidden; Chinese source materials remain reference records.
- Following stays a configuration enquiry until approved source material is supplied. Do not invent tutorials or parameters.
- Private certificates are supplied separately on request. Do not publish them or internal development material to the website or public Git history.

## Luchs family public resources

- Luchs A and B are hardware versions of one family. Preserve both existing entrances and routes, the A/B version links and separate technical/document scope. Do not restore Steinadler model/seat filters.
- `luchs.js` holds native English records from the owner-supplied external family package. User and dealer information stays separate from integration-only developer files. Shared ROS records use `productIds` and one canonical source file.
- Preserve Preliminary labels for B documents and Draft labels for LCI. Do not merge LCI with the separate VCU V2.6 interface or imply unverified firmware compatibility.
- Website, document, software and firmware versions are independent. Preserve original source revisions and the file hashes in `files/luchs/SOURCES.json`.
- Include `luchs.js` in syntax checks. Downloads and topic sidebars remain file-only for all three support areas. Missing service instructions, B STEP files and private certificates are not supplied by this release.
