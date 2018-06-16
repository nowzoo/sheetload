
export class Sheetload {
  static load(url: string): Promise<HTMLLinkElement> {
    const p: Promise<HTMLLinkElement> = new Promise((resolve, reject) => {
      const head: HTMLHeadElement = Sheetload.getHeadElement();
      const link: HTMLLinkElement = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('href', url);
      const onLoaded = () => {
        link.removeEventListener('load', onLoaded);
        link.removeEventListener('error', onError);
        link.setAttribute('disabled', 'disabled');
        resolve(link);
      };
      link.addEventListener('load', onLoaded);

      const onError = (err) => {
        link.removeEventListener('load', onLoaded);
        link.removeEventListener('error', onError);
        head.removeChild(link);
        reject(err);
      };
      link.addEventListener('error', onError);
      head.appendChild(link);
    });
    return p;
  }
  static getHeadElement(): HTMLHeadElement {
    return document.head;
  }
}
