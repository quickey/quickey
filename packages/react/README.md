# `@quickey/react`

> Create quickey for react elements

## Intro

With Quickey React you can create quickey objects from react JSX using the <QuickeyContext /> element.

## Install

Quickey React can be installed via [npm](https://www.npmjs.com):
```sh
$ npm install --save @quickey/react
```

Or via [yarn](https://yarnpkg.com):
```sh
$ yarn add @quickey/react
```

Or using the [CDN](https://unpkg.com):

```html
<script src="https://unpkg.com/@quickey/react@latest/umd/quickey.react.js"></script>
```
Or the minified version:
```html
<script src="https://unpkg.com/@quickey/react@latest/umd/quickey.react.min.js"></script>
```

## Peer Dependencies

You should install [@quickey/core](../core) in order to use this package.

## Usage

```jsx
import { QuickeyContext } from "@quickey/react";

// Or when using the UMD module

const { QuickeyContext } = Quickey.react;

function App() {
    return (
        <div>
            <header>...</header>
            <p>...</p>
            <QuickeyContext
                id="cheats"
                actions={[
                    { keys: "I > D > D > Q > D", callback: () => console.log("GOD Mode!") },
                    { keys: "I > D > K > F > A", callback: () => console.log("Full Inventory!") }
                ]}
            >
                <p>
                    Focus this element and use the quickey actions
                </p>
            </QuickeyContext>
            <p>...</p>
            <footer>...</footer>
        </div>
    );
}
```

For your convenience, we created this [**Fiddle**](http://jsfiddle.net/udidu/53boL7um/30/), so you can take Quickey React for a quick spin.


## API

### Quickey Context

#### <QuickeyContext {...props} />

##### props

Type: `object`

###### type

Type: `string`

Wrapper root element type (e.g. `div`, `span`...);

Default: `div`

###### global

Type: `boolean`

Whether to bind the quickey object to the current target element or use it as global (bound to the document).

###### id

Type: `string`

You can supply an id to the quickey object so you can access it later.

###### title

Type: `string`

Describe this object with a title.

###### actions

Type: `Array`

A list of actions.

###### onDestroy

Type: `function`

Destroy callback function.

---
[&larr; Go back](/README.md) to Quickey