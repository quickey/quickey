# `@quickey/ui`

> Quickey UI elements

## Intro

The Quickey UI package contains UI elements. This elements will save you development time when integrating Quickey into your app. For example, if you want to show your users a list of Quickey actions, you can use the **Quickey Legend** element:

<p align="center">
    <img alt="quickey" src="https://raw.githubusercontent.com/quickey/quickey/master/assets/ui.png"/>
</p>

## Install

Quickey UI can be installed via [npm](https://www.npmjs.com):
```sh
$ npm install --save @quickey/ui
```

Or via [yarn](https://yarnpkg.com):
```sh
$ yarn add @quickey/ui
```

Or using the [CDN](https://unpkg.com):

```html
<script src="https://unpkg.com/@quickey/ui@latest/umd/quickey.ui.js"></script>
```
Or the minified version:
```html
<script src="https://unpkg.com/@quickey/ui@latest/umd/quickey.ui.min.js"></script>
```

## CSS

Quickey UI contains css so you need to load it in order to make things look pretty. 💅

Use the CDN:

```html
<script src="https://unpkg.com/@quickey/ui@latest/umd/quickey.css"></script>
```

Or, if you're using a bundler with sass-loader, you can just import the style you want.

```javascript
import "@quickey/ui/lib/legend/styles/legend.scss";
```

## Usage

```javascript
const { createQuickey } = "@quickey/core";
import { createQuickeyLegend } from "@quickey/ui";

// Or when using the UMD module

const { createQuickey } = Quickey.core;
const { createQuickeyLegend } = Quickey.ui;

createQuickey([{
    id: "cheats",
    title: "Cheat Codes",
    actions: [...]
}, {
    id: "game",
    title: "Game Play",
    actions: [...]
}]);

const unmount = createQuickeyLegend({
    ids: ["cheats", "game"],
    el: document.querySelector(".legend")
});
```

For your convenience, we created this [**Fiddle**](http://jsfiddle.net/udidu/8ekzmns2/19/), so you can take Quickey UI for a quick spin.

## List of UI elements

* [Quickey Legend](#Quickey-Legend)
* ...


## API

### Quickey Legend

#### createQuickeyLegend([options])

Type: `function`

Creates and renders a new Quickey Legend element. It returns a `function` for unmounting the element from the DOM.

##### options

Type: `object`

###### ids

Type: `Array`

A list of Quickey ids.

###### el

Type: `Element`

The element container.

###### title

Type: `string` - optional

Default: `Keyboard Shortcuts`

Legend title.

###### showCredits

Type: `boolean` - optional

Default: `true`

Show footer credits.

###### searchBarPlaceholder

Type: `string` - optional

Default: `Search for shortcut...`

Placeholder for the legend search input.

###### style

Type: `object` - optional

If you want to add some css styles to the root element, use this object.

---
[&larr; Go back](/README.md) to Quickey