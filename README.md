<p align="center">
    <img alt="quickey" src="https://raw.githubusercontent.com/quickey/quickey/master/assets/keyboard_cropped.png"/>
</p>
<h2 align="center">
⚡️Quickey creates keyboard shortcuts for your web apps
</h2>

<p align="center">
  <a href="https://travis-ci.org/quickey/quickey"><img alt="Travis Status" src="https://img.shields.io/travis/quickey/quickey/master.svg?label=build&maxAge=43200"></a>
  <a href="https://www.npmjs.com/package/@quickey/core"><img alt="NPM Version" src="https://img.shields.io/npm/v/@quickey/core.svg?maxAge=43200"></a>

<img alt="Depencencies" src="https://img.shields.io/badge/dependency-free-ff69b4.svg?maxAge=43200">
  <a href="https://github.com/quickey/quickey/blob/master/LICENSE"><img alt="License" src="https://img.shields.io/github/license/quickey/quickey.svg?label=license&maxAge=43200"></a>
<a href="https://twitter.com/intent/tweet?text=%E2%9A%A1%EF%B8%8FQuickey%20creates%20keyboard%20shortcuts%20for%20your%20web%20app&url=https://github.com/quickey/quickey&via=uditalias&hashtags=javascript,keybinding,shortcuts,developers,webdeveloper">
<img alt="Tweet" src="https://img.shields.io/badge/tweet-🐦-efefef.svg?maxAge=43200"></a>
</p>

## Intro

Quickey is a tool that helps you bind keyboard keys to actions in your web app. You can bind multiple actions to specific elements in your page to help your users navigate your application more efficiently and easily. It also includes UI elements that can be easily integrated into your web app. For example, The **Quickey Legend** element: 
<p align="center">
    <img alt="quickey" src="https://raw.githubusercontent.com/quickey/quickey/master/assets/ui.png"/>
</p>

Checkout [@quickey/ui](packages/ui/README.md) for details.

## Quickey Start

If you want a quick intro about how to use Quickey, we suggest that you jump to the [@quickey/core](packages/core/README.md) package or read the next sections.

## Install

Quickey can be installed via [npm](https://www.npmjs.com):
```sh
$ npm install --save @quickey/core
```

Or via [yarn](https://yarnpkg.com):
```sh
$ yarn add @quickey/core
```

Or using the [CDN](https://unpkg.com):

```html
<script src="https://unpkg.com/@quickey/core@latest/umd/quickey.core.js"></script>
```
Or the minified version:
```html
<script src="https://unpkg.com/@quickey/core@latest/umd/quickey.core.min.js"></script>
```

## Usage

```javascript
import { createQuickey } from "@quickey/core";

// Or when using the UMD module

const createQuickey = Quickey.core.createQuickey;

// First, create a new Quickey instance
const quickey = createQuickey();

// Adding actions to your quickey is simple as
const { id } = quickey
    .addAction({
        keys: "I > D > D > Q > D",
        alias: [{ keys: 'Ctrl + G' }],
        callback: (keyBinding, target) => {
            console.log("GOD Mode!");
        }
    });

// Remove action
quickey
    .removeAction(id);
```
Checkout [@quickey/core](packages/core/README.md) for more options.

For your convenience, we created this [**Fiddle**](http://jsfiddle.net/udidu/y6phe5ok/9/), so you can take Quickey for a quick spin.

## Packages

Quickey is built over a few independant packages. Each one can be used by installing via the npm or by importing the UMD module from the CDN.  
Each package has its own documentations, explore the list of packages below.

### Lib ⚙️
- [@quickey/core](packages/core/README.md)
- [@quickey/binder](packages/binder/README.md)
- [@quickey/keyboard](packages/keyboard/README.md)

### UI 🌈
- [@quickey/ui](packages/ui/README.md)
- [@quickey/react](packages/react/README.md)
- ~~@quickey/vue~~
- ~~@quickey/angular~~

## Reporting Issues

We use GitHub Issues as the official bug tracker for Quickey. Here are some advices for our users that want to report an issue:

1. Make sure that you are using the latest version of Quickey. The issue that you are about to report may be already fixed in the latest master branch version: https://github.com/quickey/quickey/tree/master.
2. Providing us reproducible steps for the issue will shorten the time it takes for it to be fixed. A JSFiddle is always welcomed, and you can start from this [basic one](http://jsfiddle.net/udidu/y6phe5ok/9/).
3. Some issues may be browser specific, so specifying in what browser you encountered the issue might help.

## Contributions

Pull requests are welcome. For major changes, please [open an issue](https://github.com/quickey/quickey/issues/new/choose) first to discuss what you would like to change.

This project is built as monorepo. In the packages folder you can find all it's packages.
For more information about monorepos, checkout [Lerna](https://github.com/lerna/lerna/blob/master/README.md) docs.

Please make sure to update tests as appropriate.

## Todo

- [x] Give Quickey a Star and become a Stargazer!
- [x] Add alias to key binding
- [x] Support single key binding
- [x] Finish documentations for all packages
- [ ] Add more UI elements to [@quickey/ui](./packages/ui/README.md)
- [ ] Create the `@quickey/vue` package
- [ ] Create the `@quickey/angular` package

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Links
* [JavaScript Event KeyCodes](https://keycode.info/)
* [Lerna](https://lernajs.io/)