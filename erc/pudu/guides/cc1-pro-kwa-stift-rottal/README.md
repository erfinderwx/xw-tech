# KWA Stift Rottal · CC1 Pro

German, customer-specific visual operating guide. Version 1.2, 2026-10-19.

## Order and scope

1. Robot care, including tank, washable filterbox, dry blower sponge, roller chamber and water distributor.
2. Weekly workstation wastewater-inlet flush and three essential LED states.
3. Task parameters, task cleaning-speed inheritance and the system-speed menu.

Keep maintenance first. Prefer real pictures and short captions. The AI-control tutorial has been removed at the user's request. The central front wastewater receiving point was demonstrated on site and is now shown in an annotated original photo.

## Workstation photo

`assets/workstation-abwasseraufnahme-de.jpg` is a crop/cutout from the real site photo supplied by Xi Wang on 2026-10-19. It was rotated 18 degrees counterclockwise, isolated with a geometric mask and annotated. No relighting, generated component details, surface repainting or replacement product rendering is used in the selected asset. The final SVG and lossless PNG are retained locally in `output/kwa-stift-rottal/`; the source JPG remains unchanged.

The arrow points into the black porous mesh at the lower central wastewater receiving tray. It does not point at the metal contacts, the upper recess or the right-hand pipe. The German caption says Abwasseraufnahme / Hier langsam eingießen / Wöchentlich · ca. 60 °C. Other guide logic and section order remain as in version 1.1.

## Device screenshots

Six original German screenshots supplied by Xi Wang on 2026-10-19 are in assets/screen-*-de.png. Their bytes are unchanged. Numbered highlights are HTML/CSS overlays; tapping opens the intact original.

Confirmed path: Einstellungen > Aufgabenverwaltung > Bearbeiten. The task editor has separate Reinigungsparameter and Geschwindigkeit entries. For power levels choose Scheuern > Standard, then Bestätigen and Speichern.

The cleaning-speed inheritance switch is the SECOND row of the speed dialog: Geschwindigkeit: Bei Reinigung (m/s), with Auf Systemgeschwindigkeit einstellen. The first row is transit speed; the third row is edge cleaning.

The system-speed screenshot only shows the lower scrolled section. It confirms Einstellungen > Geschwindigkeit; the full mode-specific Scheuern speed label is not visible. The guide uses it only as a menu overview and tells operators to choose the matching cleaning mode. Do not identify Wischgeschwindigkeit as Scheuern speed. A future screenshot of the upper section with the complete Scheuern speed label would close this minor image gap. No additional screenshot is required to publish this revision.

Values such as 0.4/0.7 m/s and selections Stark/Hoch in screenshots are examples, not recommended settings.

## Maintenance sources

- PUDU Academy CC1 Pro Operation Guide V2: https://academy.pudutech.com/en/docs/PUDU-CC1-Pro-Operation-Guide-V2
- Workstation V4.0: https://academy.pudutech.com/zh/docs/gong-zuo-zhan-yong-hu-shou-ce-User-Manual-V4
- Original physical maintenance pictures are reused from the existing Konstanz guide.
- Site instruction: approximately 60 C water only into the demonstrated central front wastewater receiving opening, weekly. This is not a manufacturer temperature specification or a fresh-water tank instruction.
- Station LEDs per V4.0: steady blue ready without robot connection; steady green connected; flashing red fault. Less common transition states are omitted from the short guide.

Keep customer incident reports, robot serial numbers and personal contact details outside this public guide. Preserve the original Konstanz guide and its assets.
