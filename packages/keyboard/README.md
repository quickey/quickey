# `@quickey/keyboard`

> Keyboard events as streams

## Intro

Quickey Keyboard is a tool that simplify the way you add listeners to keyboard events. instead of creating event listeners, the keyboard creates only one listener and pipes it to your streams.

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

### Keyboard

#### Keyboard([target])

Type: `constructor`

Creates a new keyboard.

##### target

Type: `EventTarget`

The target EventTarget to bind keyboard events.

#### .getStream([event])

Get or create event stream.

##### event

Type: `string`

Can be any keyboard event name (e.g. `keyup`, `keydown`).

Returns: `KeyboardEventReadStream`

#### .createEventReadStream([event])

Create event stream.

##### event

Type: `string`

Can be any keyboard event name (e.g. `keyup`, `keydown`).

Returns: `KeyboardEventReadStream`

#### .isKeyActive([key])

Checks if a key is active (pressed down).

##### key

Type: `string`

The key, character or name, lower cased (e.g. `a`, `b`, `control`, `alt`).

Returns: `boolean`

#### .reset()

Reset active keys.

#### .destroy()

Destroys the keyboard and closes all streams.

#### .target

Type: `EventTarget`

Get the keyboard target.

#### .activeKeys

Type: `number`

Get the number of active keys.

---

### KeyboardEventReadStream

#### KeyboardEventReadStream([event,target])

Type: `constructor`

Creates a new KeyboardEventReadStream.

##### event

Type: `string`

Can be any keyboard event name (e.g. `keyup`, `keydown`).

##### target

Type: `EventTarget`

The stream target.

#### .pipe([targetStream])

Pipe the event to the given stream.

##### targetStream

Type: `KeyboardEventWriteStream`

Returns: Current `KeyboardEventReadStream` instance.

#### .unpipe([targetStream])

Unpipe the given stream.

##### targetStream

Type: `KeyboardEventWriteStream`

Returns: Current `KeyboardEventReadStream` instance.

#### .close()

Closes the stream.

#### .isOpen

Type: `boolean`

Get the current state of the stream.

---

### KeyboardEventWriteStream

#### KeyboardEventWriteStream([input])

A function that receives a keyboard input, if the function returns
`false`, the write stream will stop the chain for the given event and won't
continue for the next stream.

##### input

Type: `object`

###### key

Type: `string`

###### code

Type: `number`

Returns: `boolean` | `void`

[&larr; Go back](/README.md) to Quickey