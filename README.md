# Sheetload

Load stylesheets dynamically. Also scripts.

## Quick Start

```bash
npm i @nowzoo/sheetload --save
```

Load a stylesheet...

```ts
import { Sheetload } from '@nowzoo/sheetload';
//...
Sheetload.load(url)
  .then((el: HTMLLinkElement) => {
    //links are disabled at this point...
    el.removeAttribute(el, 'disabled')
  })
  .catch((error: any) => {
    //...
  })
```

Load a script...

```ts
import { Scriptload } from '@nowzoo/sheetload';
//...
Scriptload.load(url)
  .then((el: HTMLScriptElement) => {
    //...
  })
  .catch((error: any) => {
    //...
  })
```


## API

### `Sheetload`

#### `static load(url: string): Promise<HTMLLinkElement>`
Loads a stylesheet, resolving with a newly created `link` element when it loads.

**Note:** The element's `disabled` attribute is set. You are responsible for enabling it:
```ts
this.renderer.removeAttribute(link, 'disabled');
```

**Note:** The element is appended to `document.head`. You are responsible for tracking the link tags yourself to prevent duplication.

### `Scriptload`

#### `static load(url: string): Promise<HTMLScriptElement>`
Loads a script, resolving with a newly created `script` element when the script loads.

**Note:** The element is appended to `document.head`. You are responsible for tracking the script elements yourself to prevent duplication.

### `Elementload`

#### `static load(el: HTMLElement): Promise<HTMLElement>`
Given an element, listens for `load` and `error` events. Resolves on load, rejects on error.
