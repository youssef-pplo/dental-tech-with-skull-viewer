# dental-tech-with-skull-viewer

CRANIA — Anatomy Atlas: a responsive study site for dental and head-and-neck anatomy.

A responsive Vite + React + TypeScript study website for dental and head-and-neck anatomy. The app runs from bundled local assets. It combines original SVG illustrations with a real CT-derived skull model.

## Run locally

From this folder:

    npm install
    npm run dev

Create a production build with npm run build. The built site is in dist/ and can be hosted as a static website. Local model and decoder assets are stored in site-assets/.

## Deploy on Vercel

Import this GitHub repository in Vercel. Use `npm run build` as the build command and `dist` as the output directory. Vercel can install dependencies from the included pnpm lockfile.

## Included

- Four chapters covering bone basics, joints, facial muscles and scalp, and norma frontalis/CNS.
- An illustrated bone atlas with region filters and a searchable catalog.
- A filterable joint comparison table.
- An orbitable CT-derived skull model with view presets, multi-angle studio lighting, wireframe, and focus controls. Surface clicks use skull-local regions, with upper and lower teeth labeled separately.
- 19 multiple-choice questions, including the ten questions in the supplied brief. Each option has an explanation.
- Chapter completion and quiz history saved in local storage.
- Responsive layouts, keyboard search (Ctrl/Cmd + K), and a light appearance toggle.

## Course files used

- Intro  bones.pdf
- Skeletal System - correctedCopy.ppt
- joints, Dalia.pptx
- Anatomy of the face.pptx
- General anatomy The muscles of the face.pdf
- gemini-code-1792795102462.md and the repeated pasted-text copies of the same CRANIA brief

The older PPT file and scanned facial PDF were read from their original local files. Course-specific wording is retained where useful, with standard anatomical terms added where they improve clarity (for example, “marginal mandibular” branch and “glabella” as the smooth area above nasion).

## Reference checks

Joint classifications were checked against [OpenStax Anatomy & Physiology, Classification of Joints](https://openstax.org/books/anatomy-and-physiology/pages/9-1-classification-of-joints) and [Fibrous Joints](https://openstax.org/books/anatomy-and-physiology/pages/9-2-fibrous-joints). Face nerve supply and meninges/CSF descriptions were checked against [NCBI Bookshelf: Face](https://www.ncbi.nlm.nih.gov/books/NBK551530/) and [NCBI Bookshelf: Subarachnoid Space](https://www.ncbi.nlm.nih.gov/books/NBK557521/).

## Skull model attribution

The skull mesh is adapted from [Visible Human Male Skull, NIH 3D model 3DPX-012260](https://3d.nih.gov/entries/3dpx-012260), by K. Browne (NIH/NIAID), under the [Creative Commons Attribution 4.0 license](https://creativecommons.org/licenses/by/4.0/). The app ships a compressed copy for local rendering. The high-detail scan is one continuous surface; surface-click labels identify broad regions, while bone names and landmark pins are study guides rather than individually segmented clinical geometry.

The bundled Draco browser decoder is distributed under the [Apache License 2.0](https://github.com/google/draco/blob/main/LICENSE).
