# Chrome Extension Starter

![Chrome Extension Starter Logo](.github/images/logo.png)

Chrome Extension starter using Nx workspace and Angular.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Features](#features)
- [Get Started](#get-started)
- [Project Structure](#project-structure)
- [Commands](#commands)
- [Release](#release)

## Prerequisites

- [Node.js](https://nodejs.org) (>= 16 required)
- npm package manager (>= 8 required)
- [Chrome](https://www.google.com/chrome)

## Features

✅ Nx Workspace

✅ Angular

✅ Typescript

✅ Chrome Types

✅ Live Reload

✅ Very Fast Build

✅ All In One Command

✅ Support Manifest V3

✅ Popup Page

✅ Options Page

✅ Devtools Panel

✅ Background Script

✅ Content Script

## Get Started

1. Install dependencies

```shell
npm i
```

2. Run development live reload

```shell
npm run start:dev
```

3. Open Chrome browser
4. Go to this url: `chrome://extensions`
5. Click on `"Developer mode"`
6. Click on `"Load unpacked"`
7. Choose the `extension` directory from this root directory
8. Yay, you did it! 😏
9. Now update the code as you want! 😛

> ℹ️ More info about developing Chrome extension can be found [here](https://developer.chrome.com/docs/extensions/mv3)

## Project Structure

So the purpose is to take the advantage of the type system of TypeScript and to use the power of Nx workspace to create multiple applications with the powerful framework Angular!

So we have 3 applications:

1. Popup (`apps/popup`) - used for the upper popup
2. Options (`apps/options`) - used for the options page
3. DevTools Panel (`apps/devtools-panel`) - used for the devtools panel

In every Chrome extension we have background script that communicate with the content scripts, which can be found in `libs/scripts/background/src/index.ts`.

We are also injection content script which can be found in `libs/scripts/content/src/index.ts`.

All the applications and libs have already the Chrome types so can just `chrome` and the editor will recognize it.

## Commands

Start with development configuration

```shell
npm run start:dev
```

Start with production configuration.

```shell
npm run start:prod
```

Build with development configuration.

```shell
npm run build:dev
```

Build with production configuration.

```shell
npm run build:prod
```

## Release

I recommend making the release automatic with GitHub actions or other ci service.

- Bump the version number in `manifest.json`
- Create a git tag containing the version you are releasing using `git tag -a <version>`
- Run `npm run build:prod`
- Create zip file from the extension directory
- Upload the zip to the Chrome developer dashboard

# License

[MIT](LICENSE)
