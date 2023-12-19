# `create-project-files`

![npm bundle size](https://img.shields.io/bundlephobia/minzip/create-project-files)
![npm bundle size](https://img.shields.io/bundlephobia/min/create-project-files)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/sandypockets/create-project-files/ci.yml)
![GitHub issues](https://img.shields.io/github/issues/sandypockets/create-project-files)
![GitHub pull requests](https://img.shields.io/github/issues-pr/sandypockets/create-project-files)
![npm](https://img.shields.io/npm/dt/create-project-files)
![npm](https://img.shields.io/npm/dw/create-project-files)
![NPM](https://img.shields.io/npm/l/create-project-files)

`create-project-files` is a Node.js command-line interface (CLI) that simplifies the process of setting up common files for a new project. It generates files like README, LICENSE, CONTRIBUTING guidelines, and more with just a few keystrokes. Any file templates that require specific information like your project name (or your GitHub username, etc) will prompt you for the information, and dynamically insert it into the file during creation.

### Dependencies
- `chalk`: `^5.3.0`
- `commander`: `^11.1.0`
- `inquirer`: `^9.2.12`

## How it Works
`create-project-files` guides you through an interactive command-line interface to select and customize various project files. It uses `inquirer` for prompts, `chalk` for more readable output, and `commander` for command-line argument parsing.

## Available Files

### Dot files
  - `.babelrc`
  - `.gitignore`
  - `.prettierrc`
  - `.prettierignore`

### GitHub files
  - `.github/ISSUE_TEMPLATE/bug_report.md`
  - `.github/ISSUE_TEMPLATE/feature_request.md`
  - `.github/ISSUE_TEMPLATE/question.md`
  - `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/workflows/ci.yml`

### Markdown documentation
  - `README.md`
      - If enabled, automatically inserts dependencies from `package.json`
  - `CODE_OF_CONDUCT.md`
  - `CONTRIBUTING.md`
  - `DOCUMENTATION.md`
  - `LICENSE.md`
    - `Apache 2.0`
    - `Boost Software License 1.0`
    - `GNU AGPL v3.0`
    - `GNU GPL v3.0`
    - `GNU LGPL v3.0`
    - `MIT`
    - `Mozilla Public License 2.0`
    - `The Unlicense`

## Getting Started

### Installation
Install `create-project-files` globally using npm:

```bash
npm install -g create-project-files
```

Or use it directly with `npx`:

```bash
npx create-project-files
```

Also works with `yarn`:

```bash
yarn create project-files
```

### Usage
To start the CLI, run:

```bash
npx create-project-files
```

Follow the interactive prompts to select and customize the project files you want to add to your project.

### Configuration
`create-project-files` does not require additional configuration. It works out of the box by guiding you through a series of interactive prompts.

#### Notes
* The CLI assumes you are running it in the root directory of your project.
* Files generated are based on common open-source project standards.

## Contributing
Contributions are welcome! Please see the [contributing guide](CONTRIBUTING.md) for more details.

## License
`create-project-files` uses the MIT license. See [license.md](LICENSE.md) for more details.