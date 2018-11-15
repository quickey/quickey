# `@quickey/binder`

> Subscribe to keyboard key bindings

## Intro

Quickey Binder will help you to craete keyboard key combination subscriptions. Want to know when
a user presses Ctrl + H? or maybe you want to create an easteregg for your web app and want to know
that a user entered a combination of keys? Quickey Binder is the tool you need.

## Install

Quickey Binder can be installed via [npm](https://www.npmjs.com):
```sh
$ npm install --save @quickey/binder
```

Or via [yarn](https://yarnpkg.com):
```sh
$ yarn add @quickey/binder
```

Or using the [CDN](https://unpkg.com):

```html
<script src="https://unpkg.com/@quickey/binder@latest/umd/quickey.binder.js"></script>
```
Or the minified version:
```html
<script src="https://unpkg.com/@quickey/binder@latest/umd/quickey.binder.min.js"></script>
```

## Usage

```javascript
import { KeyBinder } from "@quickey/binder";

// Or when using the UMD module

const { KeyBinder } = Quickey.binder;

const keyBinder = new KeyBinder();

keyBinder.delegate = {
  didMatchFound: function(binder, matches, target) {
    console.log(binder, matches, target);
  }
}

keyBinder.bind({
  keys: "I > D > D > Q > D"
});

keyBinder.bind({
  keys: "Ctrl + H"
});
```

For your convenience, we created this [**Fiddle**](https://jsfiddle.net/udidu/1a56thy9/19/), so you can take Quickey Binder for a quick spin.

## API

### KeyBinder

#### KeyBinder([options])

Type: `constructor`

Creates a new KeyBinder.

##### options

Type: `object` - optional

KeyBinder options.

###### bindings

Type: `Array`

A list of combinations to bind to. See [keyBindingOptions](#keyBindingOptions) for details.

###### disabled

Type: `boolean`

Should the key binder listen or halt key bindings.

###### target

Type: `EventTarget`

KeyBinder creates a [Keyboard](/packages/keyboard/README.md) under the hood, this is the keyboard's `EventTarget`.

> All options are optionals

#### .disable()

Disables the key binder.

#### .enable()

Enables the key binder.

#### .bind([keyBindingOptions])

Subscribe to key binding.

##### keyBindingOptions

Type: `object`

###### id

Type: `string` - optional

You can supply an id to the bindings so you can
remove it later if you want to.

###### keys

Type: `string`

The combination of keys to bind to.  
For **Combination** binding (hold them together to activate) create a list of keys separated with the `+` sign. For example:  
`Ctrl + H`, `Ctrl + Alt + Delete`, `Shift + R`  

For **Stream** binding (enter one after another to activate) create a list of keys separated with the `>` sign. For example:  
`I > D > D > Q > D`, `Ctrl > Ctrl`, `H > E > L > L > O`

See [this list](/packages/binder/src/constants.ts) for uniqe key options.


###### delay

Type: `number`

The delay between key strokes when using Stream bindings.

###### strict

Type: `boolean`

In Combination bindings, strict mode will activate only if the binded keys are the only active keys in the keyboard.  
In Stream bindings, each key must be released before the next one is active.

#### .bind([keyBindingId])

Unsubscribe from key binding.

##### keyBindingId

Type: `string`

#### .removeAll()

Unsubscribe all key bindings.

#### .destroy()

Unsubscribe all key bindings and destroys the [Keyboard](/packages/keyboard/README.md).

#### .disabled

Get the key binder disabled state.

Type: `boolean`

#### .delegate

Attach a delegate to KeyBinder instance.

Type: `object`

##### didMatchFound([binder,matches,target])

This function gets called each time a subscribed key binding is detected.

Type: `function`

###### binder

Type: `object`

The key binder instance in which the detection occurred.

###### matches

Type: `Array`

A list of key binding matches.

###### target

Type: `EventTarget`

The key binder keyboard target.

[&larr; Go back](/README.md) to Quickey