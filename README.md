# Monorepo boilerplate using RESTful api (nodejs, typescript, express, mongoose), REACT and Yarn Workspaces

This is a boilerplate created to build modular and scalable projects. It contains a template for both back-end (node.js) and front-end (react).

It uses OpenAPI to document all API endpoints - (see [backend-readme](/backend))

It utilizes the advantage of [yarn](https://classic.yarnpkg.com/en/docs/install/) workspaces to manage dependencies.

Due to this fact, it is super-easy to manage packages, add new ones, edit existing ones - and keep the good code structure overall.

It also wraps the database in a separate layer, so if you decide to e.g. change the DB to the different one - nothing simpler. Just change the `monorepo-boilerplate/db` package to your own one, and change the implementation of the `api-models` package.

For more details, please refer to [backend-readme](/backend) and [frontend-readme](/frontend)

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Basic structure](#basic-structure)

## Prerequisites
You need [yarn](https://classic.yarnpkg.com/en/docs/install/) to manage repo dependencies.

```bash
npm i yarn -g
```

You also need to follow prerequisites described in [backend-readme](/backend).

## Installation

Use [yarn](https://classic.yarnpkg.com/en/docs/install/) to install all dependencies.

```bash
yarn
```

Build the app

```bash
yarn build
```

Start the app using

```bash
yarn dev
```

Go to `http://localhost:3000`

### Usage
- `build` - Transpile TypeScript to ES6 & builds the react front-end
- `dev` - To run the app without transpile to ES6, with nodemon watch
- `start` - Run the transpiled app

### Basic structure
```
package.json             // common dev deps and workspace-wide scripts
backend                  // back-end of the app
      package.json
frontend                  // front-end of the app
      package.json
packages/
  some-package/
      src/
         index.ts
      test/
         test.spec.ts
      package.json         // package-specific deps and scripts
  .../
  .../
```
