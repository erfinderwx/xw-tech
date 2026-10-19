# PUDU Bluetooth gate integration: A variants + common B

German customer guidance. Web edition 1.0, 2026-10-19. Material and sample preparation are documented; on-site electrical verification and final acceptance remain outstanding.

## Content model

- index.html is the family entry point.
- anschluss/index.html is A: choose the appropriate wiring variant and check applicability.
- anschluss/a1-huhtamaki-ronsberg/index.html is A1, the currently documented customer-specific roller-door connection.
- roboter-einrichtung/index.html is the single canonical B guide for PuduBot 2 App configuration and testing. All A variants link to this page. Do not duplicate B per customer.
- variants.json records the current variants and canonical B. A2, A3 and A4 are future real wiring variants, not published placeholder cases.

## Add another A variant

Add the verified customer-specific wiring page under anschluss/a2-descriptive-name/, its selected assets and PDF. Record the A2 entry in variants.json and add its card to A and the family overview. End the new page with the link to the existing B page. Do not copy the terminal numbers or electrical mapping from A1 unless the actual original controller plan supports them.

## Electrical distinctions

A1 uses J2 red for supply +24 V and J2 black for supply 0 V; combined J2 yellow/green is function 3 COM to input 8/02L+, while combined J9 black/green is function 4 OPEN to +24 V 9/01L+. J9 red and yellow are individually insulated and unused. Function numbers are documentation identifiers, not manufacturer pin numbers. COM is not automatically supply 0 V. The specific relay/output type, permissible switching voltage/current/load and original controller circuit must be verified before energization. Supply 12-24 V DC does not establish contact switching limits. No relay rating is invented.

## Sources and downloads

A1 and general-condition PDFs are the approved 6-page version1.3 editions. B is the 12-page common version1.4: its electrical-document reference now points to the A index instead of a named customer. Its operational steps, approved screenshots, caption labels and layout are preserved. The EPLAN SVG is a vector viewport of the figure from the approved A1 PDF, not a newly interpreted circuit.

Real wiring photos and 11 German reference captures were supplied by the author. Two test illustrations are English translations of source manufacturer views and are prominently identified as translations. Other supplementary English views are identified as manufacturer originals. User-approved map geometry, routes and point labels remain visible; map names are hidden in the two designated safe screenshot assets.

## Publication boundary

Publish only this technical guide family and selected assets. Never add internal email, price calculations, receipts, draft/send arguments, personal contact data, raw unmasked customer map captures, source manifests with local paths, or private case correspondence. A public repository and noindex metadata do not provide access control.

## Design and operation

The existing PUDU guide shell provides navy navigation, a white article, teal/orange accents, responsive sections and print styles. Raster source assets are copied without modification. The family has no external JavaScript dependency; guide.js adds print and accessible image enlargement with keyboard close/focus return. The PUDU catalogue continues to support its existing Chinese/English/German selector; this guide family is German.
