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

**Note:** You are responsible for tracking the script and link tags yourself.


## API

### `Sheetload`

#### `static load(url: string): Promise<HTMLLinkElement>`
Loads a stylesheet, resolving with the `link` tag when it loads.

**Note:** The link tag's `disabled` attribute is set. You are responsible for enabling it:
```typescript
this.renderer.removeAttribute(link, 'disabled');
```

**Note:** You are responsible for tracking the link tags yourself to prevent duplication.

### `Scriptload`

#### `static load(url: string): Promise<HTMLScriptElement>`
Loads a script, resolving with a `script` tag when the script loads.

**Note:** You are responsible for tracking the script tags yourself to prevent duplication.

### `Elementload`

#### `static load(el: HTMLElement): Promise<HTMLElement>`
Given an element, listens for `load` and `error` events. Resolves on load, rejects on error.
