import { Elementload } from './elementload';

export class Sheetload {
  static load(url: string): Promise<HTMLLinkElement> {
    const link: HTMLLinkElement = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', url);
    const p: Promise<HTMLLinkElement> = Elementload.load(link)
      .then(() => {
        link.setAttribute('disabled', 'disabled');
        return link;
      });
    return p;
  }
}
