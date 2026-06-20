# Third-Party Licenses

Project: Blockly Lab  
Maintainer: Younger Yang / Younger Dream Workshop  
Last updated: 2026-06-20

This document lists the third-party open source software packages directly used by this project.

The project's own software code is licensed separately under the MIT License unless otherwise stated. Educational content, curriculum materials, task descriptions, problem statements, worksheets, assessment materials, and course documents are licensed separately under CC BY-NC-SA 4.0 unless otherwise stated.

---

## 1. Direct npm Dependencies

The following packages are directly listed in package.json.

| Package | Version | Purpose | License |
|---|---:|---|---|
| blockly | 13.0.0 | Visual programming editor | Apache License 2.0 |
| vite | 8.0.16 | Frontend development server and build tool | MIT License |
| gh-pages | 6.3.0 | Deployment tool for GitHub Pages | MIT License |

---

## 2. Package Details

### 2.1 Blockly

Package: blockly

Version: 13.0.0

Purpose: Blockly is used as the visual programming editor in Blockly Lab. It provides the block-based workspace, toolbox, code generation framework, and visual programming user interface.

License: Apache License 2.0

Copyright and attribution: Blockly is developed by Google and the Blockly open source project.

Notes: Blockly Lab uses Blockly as a third-party open source library. Blockly Lab is not an official Google or Blockly project.

---

### 2.2 Vite

Package: vite

Version: 8.0.16

Purpose: Vite is used as the frontend development server and production build tool for Blockly Lab.

License: MIT License

Copyright and attribution: Vite is developed by the Vite open source project and its contributors.

Notes: Blockly Lab uses Vite as a third-party open source build tool. Blockly Lab is not an official Vite project.

---

### 2.3 gh-pages

Package: gh-pages

Version: 6.3.0

Purpose: gh-pages is used to deploy the generated dist folder to GitHub Pages.

License: MIT License

Copyright and attribution: gh-pages is developed by its open source maintainers and contributors.

Notes: Blockly Lab uses gh-pages as a deployment helper tool. Blockly Lab is not an official gh-pages project.

---

## 3. Platform Services and Browser APIs

The following services and browser APIs may be used by this project. They are not npm dependencies of this project and are not redistributed as part of the project's source code.

| Service / API | Purpose | Notes |
|---|---|---|
| GitHub Pages | Static website hosting | Provided by GitHub |
| Google Apps Script | Score upload endpoint | Provided by Google |
| Google Sheets | Score data storage | Provided by Google |
| Web Serial API | Browser-based serial communication | Implemented by supported browsers such as Chrome and Edge |

---

## 4. AI-Assisted Development

Parts of this project were developed with assistance from OpenAI ChatGPT, including code drafting, documentation drafting, architecture planning, classroom testing checklists, and debugging support.

All final content has been reviewed, tested, selected, modified, and integrated by the project maintainer.

OpenAI ChatGPT is not a third-party software dependency of this project and is not redistributed as part of the project source code.

---

## 5. License Scope Reminder

This file only lists third-party software and service references.

For the project's own software code license terms, see LICENSE.

For general project notices, attribution, AI-assisted development notice, and platform service notices, see NOTICE.md.

For more detailed educational content attribution and licensing notes, see docs/LICENSE_AND_ATTRIBUTION.md.

---

## 6. Maintenance Notes

When adding new npm packages, update this file after running:

    npm ls --depth=0

Recommended update checklist:

- Check package name.
- Check installed version.
- Check license.
- Check purpose in this project.
- Add package to the Direct npm Dependencies table.
- Add package details section if needed.
- Confirm npm run build passes.
