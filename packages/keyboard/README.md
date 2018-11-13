# `@quickey/keyboard`

> Keyboard events as streams

## Intro

Quickey Keyboard is a tool which simplify the way you add listeners to keyboard events. instead of creating event listeners, the keyboard creates only one listener and pipes it to your streams.

## Install

Quickey Keyboard can be installed via [npm](https://www.npmjs.com):
```sh
$ npm install --save @quickey/keyboard
```

Or via [yarn](https://yarnpkg.com):
```sh
$ yarn add @quickey/keyboard
```

Or using the [CDN](https://unpkg.com):

```html
<script src="https://unpkg.com/@quickey/keyboard@latest/umd/quickey.keyboard.js"></script>
```
Or the minified version:
```html
<script src="https://unpkg.com/@quickey/keyboard@latest/umd/quickey.keyboard.min.js"></script>
```

## Usage

```javascript
import { keyboard, Keyboard } from "@quickey/keyboard";

// Or when using the UMD module

const { keyboard, Keyboard } = Quickey.keyboard;

keyboard.getStream('keydown').pipe(console.log);

const k = new Keyboard(document.querySelector("input[type=text]"));

k.getStream('keyup').pipe(console.log);

keyboard.getStream('keydown').unpipe(console.log);
```

For your convenience, we created this [**Fiddle**](http://jsfiddle.net/udidu/y2vm67wj/11/), so you can take Quickey Keyboard for a quick spin.

## API

[&larr; Go back](/README) to Quickey