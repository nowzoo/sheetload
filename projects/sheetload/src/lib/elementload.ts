
export class Elementload {
  static load(el: HTMLElement): Promise<HTMLElement> {
    const p: Promise<HTMLElement> = new Promise((resolve, reject) => {
      const head: HTMLHeadElement = Elementload.getHeadElement();
      const onLoaded = () => {
        el.removeEventListener('load', onLoaded);
        el.removeEventListener('error', onError);
        resolve(el);
      };
      el.addEventListener('load', onLoaded);

      const onError = (err) => {
        el.removeEventListener('load', onLoaded);
        el.removeEventListener('error', onError);
        head.removeChild(el);
        reject(err);
      };
      el.addEventListener('error', onError);
      head.appendChild(el);
    });
    return p;
  }
  static getHeadElement(): HTMLHeadElement {
    return document.head;
  }
}
