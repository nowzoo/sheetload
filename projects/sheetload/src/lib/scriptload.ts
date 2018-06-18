
import { Elementload } from './elementload';

export class Scriptload {
  static load(url: string): Promise<HTMLScriptElement> {
    const script: HTMLScriptElement = document.createElement('script');
    script.setAttribute('src', url);
    const p: Promise<HTMLScriptElement> = Elementload.load(script) as Promise<HTMLScriptElement>;
    return p;
  }
}
