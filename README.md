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
