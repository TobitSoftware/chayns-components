<p align="center">
    <img src="./assets/logo.png" alt="Project Logo" width="500" />
</p>

<h1 align="center">Development Guidelines</h1>

These guidelines define the coding, styling, and structural standards for all packages in the **@chayns-components** monorepo.  
They ensure consistency, maintainability, and clarity across components, hooks, and utilities.

---

## Table of Contents

- [1. General Principles](#1-general-principles)
- [2. Project Structure](#2-project-structure)
- [3. Code Style](#3-code-style)
- [4. Component Guidelines](#4-component-guidelines)
- [5. Styling & Theming](#5-styling--theming)
- [6. TypeScript Conventions](#6-typescript-conventions)
- [7. File Naming](#7-file-naming)
- [8. Documentation](#8-documentation)

---

## 1. General Principles

- All packages must use **TypeScript**.
- Follow a **functional component** approach.
- Keep all logic **encapsulated** within components or hooks.
- Code must remain **framework-agnostic** – avoid browser-specific logic unless required.
- Maintain **backward compatibility** and avoid breaking changes.

---

## 2. Project Structure

Each package follows the same internal structure:

```
packages/
└── PACKAGE/
    ├── docs/ # Example for each component
    ├── lib/ # Compiled output (build target)
    ├── src/
    │   ├── api/ # Local API helpers
    │   ├── components/ # Main and sub-components
    │   ├── constants/ # Constant values used across components
    │   ├── types/ # Local type definitions
    │   ├── hooks/ # Local hooks
    │   ├── utils/ # Local helper functions
    │   └── index.ts # Public exports
    ├── stories/ # Storybook stories for visual testing
    ├── .eslintrc.js
    ├── babel.config.mjs
    ├── package.json
    ├── README.md
    └── tsconfig.json
```

Global or cross-package utilities are stored in `@chayns-components/core`.

---

## 3. Code Style

- Use **ESLint** and **Prettier** configuration from the root project.
- Use **named exports** only; avoid default exports.
- Use **const** and arrow functions consistently.
- Prefer **early returns** to reduce nesting.
- Keep functions **pure** whenever possible.
- Avoid magic numbers and inline strings — extract constants.

---

## 4. Component Guidelines

- Each component must be **self-contained** and **theme-aware**.
- Props should be defined in a dedicated `.types.ts` file.
- Optional props must be clearly marked as such.
- Avoid unnecessary re-renders — use `React.memo` when beneficial.
- Add motion effects only when they are **contextually justified**.

---

## 5. Styling & Theming

- Use **linaria** for all styles.
- Never hardcode colors — use theme tokens from the ColorSchemeProvider.
- Use the `WithTheme` type to access theme variables.
- Keep styles modular and colocated with their component.

Example:

```tsx
comming soon
```

---

## 6. TypeScript Conventions

- Prefer **explicit** types over inferred ones in public APIs.
- Avoid `any` — use generic constraints or utility types.
- Keep internal types local (not exported).
- Shared types belong in `@chayns-components/core`.
- Use `Pick`, `Omit`, and `Partial` instead of redefining types.

---

## 7. File Naming

| Type       | Format                  | Example             |
|------------|-------------------------|---------------------|
| Components | `PascalCase`            | `Button.tsx`        |
| Styles     | `PascalCase.styles.ts`  | `Button.styles.ts`  |
| Types      | `PascalCase.types.ts`   | `Button.types.ts`   |
| Hooks      | `PascalCase.hooks.ts`   | `Button.hooks.ts`   |
| Utils      | `PascalCase.utils.ts`   | `Button.utils.ts`   |
| Context    | `PascalCase.context.ts` | `Button.context.ts` |
| Docs       | `PascalCase.docs.ts`    | `Button.docs.ts`    |

---

## 8. Documentation

- Each component must include a corresponding `.docs.tsx` file demonstrating its usage.
- Documentation examples should be minimal and clear.
- Use Storybook stories for live previews and developer testing.
- Update README or component docs when changing props or behavior.

---

<p align="center">
  <sub>Maintained by the chayns-components team · Built with React, TypeScript and Linaria</sub>
</p>
