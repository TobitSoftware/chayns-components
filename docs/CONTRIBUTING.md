<p align="center">
    <img src="./assets/logo.png" alt="Project Logo" width="500" />
</p>

<h1 align="center">Contributing Guide</h1>

We appreciate your interest in improving this project!  
All contributions — from small bug fixes to major feature additions — are highly valued.

---

## Table of Contents

- [Local Development](#local-development)
- [Storybook](#storybook)
- [Pull Requests](#pull-requests)
- [Publishing a New Version](#publishing-a-new-version)
- [Design Guides](#design-guides)

---

## Local Development

After cloning the repository, install all dependencies:

```bash
npm install
```

Then build the local development environment:

```bash
npm run lerna:build
```

If you want to test your changes in another project, you can use [`npm link`](https://docs.npmjs.com/cli/v6/commands/npm-link) to link the local package.

---

## Storybook

We provide a [Storybook](https://storybook.js.org/) setup for component development and testing.

Start the Storybook environment with:

```bash
npm run storybook
```

Create a new package version with:

```bash
npm run lerna:version
```

> **Note:** We are working on integrating Storybook with the chayns environment.  
> Some components relying on the [chayns-api](https://github.com/TobitSoftware/chayns-api) may not fully function within Storybook yet.

---

## Pull Requests

If you find a bug or want to introduce a new feature, please follow these steps:

1. **Fork** this repository
2. **Implement** your changes and write clear, concise commit messages
3. **Submit a Pull Request** to the `v5` branch of this repository

> Please avoid including unrelated commits in your pull request.

---

## Publishing a New Version

Before publishing a new version, ensure that all components are built and tested successfully.

Run:

```bash
npm run lerna:version
```

This command handles versioning and publishing to npm.

---

## Design Guides

Please read our [Design Guides](/DESIGNGUIDES.md)  
to understand the visual language, color system, and component design principles.

---

<p align="center">
  <sub>Maintained with ❤️</sub>
</p>
