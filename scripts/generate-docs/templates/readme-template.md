<div align="center">
    <h1>
        <img src="https://raw.githubusercontent.com/TobitSoftware/chayns-components/master/assets/logo.png" width="600px" alt="chayns-components" />
    </h1>
    <p>A set of beautiful React components for developing chayns® applications.</p>
    <div>
        <img src="https://img.shields.io/npm/dm/chayns-components.svg?style=for-the-badge" alt="" />
        <img src="https://img.shields.io/npm/v/chayns-components?style=for-the-badge" alt="" />
        <img src="https://img.shields.io/github/license/TobitSoftware/chayns-components?style=for-the-badge" alt="" />
        <img src="https://img.shields.io/github/contributors/TobitSoftware/chayns-components?style=for-the-badge" alt="" />
    </div>
</div>

---

## Installation

First you should install the `chayns-components` package into your project:

```bash
# Yarn
yarn add chayns-components

# NPM
npm install chayns-components
```

The styles to our components are provided via the
[`chayns-css`](https://github.com/TobitSoftware/chayns-css) library and some of
the components also rely on the
[`chayns-js`](https://github.com/TobitSoftware/chayns-js) API, so you should
include these in your HTML:

```html
<!-- CSS styles -->
<script
    src="https://api.chayns-static.space/css/v4/compatibility/compatibility.min.js"
    version="4.2"
></script>

<!-- JS api -->
<script src="https://api.chayns-static.space/js/v4.0/chayns.min.js"></script>
```

By default, the whole library is imported when using any component. If you care
about your bundle size you should follow our
[tree-shaking guide](./tree-shaking.md).

## Components Overview

The following components are part of this package:

{{ componentList }}

## Utility Functions

We also provide a set of common utility functions:

| Function                                       | Description                                               |
| ---------------------------------------------- | --------------------------------------------------------- |
| [imageUpload](/src/utils/imageUpload.js)       | Function to upload images to tsimg.cloud                  |
| [isTobitEmployee](/src/utils/tobitEmployee.js) | Get the information if user is an tobit employee          |
| [createLinks](/src/utils/createLinks.js)       | Creates a string with links from a string with URLs       |
| [removeHtml](/src/utils/removeHtml.js)         | Removes HTML Tags from a string                           |
| [ColorUtils](/src/utils/color/README.md)       | Utility functions to convert color values (hex, rgb, hsv) |
| [equalizer](/src/utils/equalizer.js)           | Utility functions to equalize the width of html elements  |

## Development

If you want to contribute to `chayns-components`, check out the
[CONTRIBUTING.md](/CONTRIBUTING.md) file.
