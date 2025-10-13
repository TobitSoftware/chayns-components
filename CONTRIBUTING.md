# Contributing

We are open to and grateful for any contributions made by the community.

## Overview

- [Local Development](#local-development)
- [Storybook](#storybook)
- [Pull Requests](#pull-requests)
- [Publishing a New Version](#publishing-a-new-version)

## Local Development

After cloning the repository first install the dependencies:

```bash
npm install
```

After the installation has completed you can build the local development environment:

```bash
npm run lerna:build
```

If you want to test your changes in another project, use
[`npm link`](https://docs.npmjs.com/cli/v6/commands/npm-link)

## Storybook

If you prefer to work within [Storybook](https://storybook.js.org/), we have that set up aswell.

To launch the Storybook development environment run:

```bash
npm run storybook
```

> We are working on integrating Storybook with the chayns environment, however many APIs are not
> available there yet. Some components that rely on the
> [chayns-api](https://github.com/TobitSoftware/chayns-api) API might not work within Storybook.

## Pull Requests

If you found a bug or miss a feature, you are welcome to create a pull request and add the desired
features yourself. Follow these steps:

1. Fork this repository
2. Do your changes and commit them
3. Create a pull request from your fork to the master branch of this repository

> Please avoid including unrelated commits to your pull request.
