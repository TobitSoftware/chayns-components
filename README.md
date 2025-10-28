<p align="center">
    <img src="./assets/logo.png" alt="Project Logo" width="500" />
</p>

<h1 align="center">@chayns-components</h1>

<p align="center">
A modular React monorepo providing reusable components, utilities, and hooks for building chayns-based web applications.
</p>

---

## Table of Contents

- [Overview](#overview)
- [Monorepo Structure](#monorepo-structure)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Development](#development)
- [Contribution](#contribution)
- [Guidelines](#guidelines)
- [License](#license)

---

## Overview

The **@chayns-components** project provides a collection of reusable UI components, hooks, and utilities  
for developing scalable and consistent **chayns web applications**.

All packages are managed in a single **Lerna + TypeScript** monorepo, allowing shared configuration,  
centralized dependency management, and unified release workflows.

This repository serves as the foundation for all modern chayns projects.

---

## Monorepo Structure

```
packages/
├── core/                # Core UI components and base utilities
├── code-highlighter/    # Syntax highlighting component
├── color-picker/        # Color picker components (HueSlider, TransparencySlider, etc.)
├── date/                # Date and time picker components
└── ...
```

Each package includes:
- `src/` – TypeScript source files
- `docs/` – Generated documentation
- `lib/` – Compiled output
- `stories/` – Storybook files for component previews
- `package.json` – Metadata and Lerna configuration

---

## Technologies

- **React** – UI library for component-based development
- **TypeScript** – Static type system for reliability
- **Linaria** – Scoped CSS and theming
- **Lerna** – Monorepo management and versioning
- **ESLint + Prettier** – Code style enforcement
- **Storybook** – Component documentation and preview

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/chayns-components/chayns-components.git
cd chayns-components
```

Install dependencies:

```bash
npm install
```

---

## Development

To build all packages:

```bash
npm run lerna:build
```

To start Storybook for local component development:

```bash
npm run storybook
```

---

## Contribution

Contributions are welcome.  
Before opening a PR, please read the [Contribution Guide](./docs/CONTRIBUTING.md)  
for coding standards, commit messages, and branch structure.

---

## Guidelines

For design rules, component structure, naming conventions, and code style,  
see the [Development Guidelines](./docs/DEVELOPMENT.md).

These guidelines define:
- Component folder and type organization
- Naming conventions
- Styling and theming rules
- TypeScript and export standards

---

## License

This project is licensed under the [MIT License](./LICENSE).








---

<p align="center">
  <sub>Maintained by the chayns-components team · Built with React, TypeScript and Linaria</sub>
</p>