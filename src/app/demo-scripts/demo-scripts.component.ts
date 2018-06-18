import { Component, OnInit } from '@angular/core';
import { Scriptload } from '@nowzoo/sheetload';

@Component({
  selector: 'app-demo-scripts',
  templateUrl: './demo-scripts.component.html',
  styleUrls: ['./demo-scripts.component.css']
})
export class DemoScriptsComponent implements OnInit {

  error: string = null;
  status: string = null;
  messageFromScript: string = null;

  loaded: Map<string, HTMLScriptElement> = new Map();

  scripts = [
    {label: 'Script #1', url: '/assets/script1.js', f:  'getScript1Message'},
    {label: 'Script #2', url: '/assets/script2.js', f: 'getScript2Message'},
    {label: 'Script does not exist', url: '/assets/not-there.js', f: ''},
  ];
  constructor() { }

  ngOnInit() {
  }

  loadScript(event: Event, scriptRec: {label: string, url: string, f: string}) {
    event.preventDefault();
    this.error = null;
    this.messageFromScript = null;
    if (this.loaded.get(scriptRec.url)) {
      this.status = `Already loaded ${scriptRec.label} from ${scriptRec.url}!`;
      this.messageFromScript = window[scriptRec.f]();
      return;
    }
    this.status = `Loading ${scriptRec.label} from ${scriptRec.url}...`;
    Scriptload.load(scriptRec.url)
      .then((el: HTMLScriptElement) => {
        this.loaded.set(scriptRec.url, el);
        this.status = `Loaded ${scriptRec.label} from ${scriptRec.url}!`;
        this.messageFromScript = window[scriptRec.f]();
      })
      .catch(err => {
        this.status = null;
        this.error = `${scriptRec.url} could not be loaded.`;
      });

  }
}
