# `@quickey/core`

> Quickey creates keyboard shortcuts for your web apps

## Intro

Quickey is a tool that helps you bind keyboard keys to actions in your web app. You can bind multiple actions to specific elements in your page to help your users navigate your application more efficiently and easily.

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

For your convenience, we created this [**Fiddle**](http://jsfiddle.net/udidu/y6phe5ok/8/), so you can take Quickey for a quick spin.

## API

### Quickey

#### Quickey([options])

Type: `constructor`

##### options

Type: `object`

###### id

Type: `string`

You can supply an id to the quickey object so you can access it later.

###### title

Type: `string`

Describe this object with a title.

###### actions

Type: `Array`

A list of actions.

###### onDestroy()

Type: `function`

Destroy callback function.

###### target

Type: `EventTarget`

The key binder keyboard target.

***Note!*** Although you can create a new Quickey with this constructor, you should avoid this method and use only the `createQuickey` helper function.

> All options are optionals

#

#### .addAction([options|[options]])

Add Quickey action or actions.

##### options

Type: `object` | `Array`

###### id

Type: `string` - optional

You can supply an id to the key binding so you can
remove it later if you want to.

###### keys

Type: `string`

The combination of keys to bind to.  
For **Combination** binding (hold them together to activate) create a list of keys separated with the `+` sign. For example:  
`Ctrl + H`, `Ctrl + Alt + Delete`, `Shift + R`  

For **Stream** binding (enter one after another to activate) create a list of keys separated with the `>` sign. For example:  
`I > D > D > Q > D`, `Ctrl > Ctrl`, `H > E > L > L > O`

For **Single** binding (enter one key) supply the key you want to bind to. For example:  
`J`, `F`, `K`

See [this list](/packages/binder/src/constants.ts) for uniqe key options.

###### alias

Type: `Array` - optional

You can supply a list of `options` to the alias option to create aliases with this action.

###### delay

Type: `number` - optional

The delay between key strokes when using Stream bindings.

###### strict

Type: `boolean` - optional

In Combination bindings, strict mode will activate only if the binded keys are the only active keys in the keyboard.  
In Stream bindings, each key must be released before the next one is active.

###### description

Type: `string` - optional

Describe the action.

###### callback([keyBinding,target])

Type: `function`

A callback to trigger when the action key combination is detected.

#

#### .removeAction([id])

Remove a specific action.

##### id

Type: `string`

#

#### .removeAllActions()

Removes all actions at once.

#

#### .enable()

Enables the underlying key binder.

#

#### .disable()

Disables the underlying key binder.

#

#### .destroy()

Destroy the Quickey object.

#

#### .id

Type: `string`

Get the id of the current instance.

#

#### .title

Type: `string`

Get the title of the current instance.

#

#### .disabled

Type: `boolean`

Get the disabled state of the current instance.

#

#### .actions

Type: `Array`

Get the list of actions of the current instance.

---

#### createQuickey([options|[options]])

Type: `function`

Creates new Quickey or Quickeys

Returns: `object` | `Array`

##### options

Type: `object` | `Array`

See [.addAction([options|[options]])](#.addAction([options|[options]])) options.

---

#### getQuickeyInstance([id|[id]])

Type: `function`

Returns: `object` | `Array`

##### id

Type: `string` | `Array`

Quickey id or ids.

---
[&larr; Go back](/README.md) to Quickey