import { Component, OnInit, Renderer2 } from '@angular/core';
import { Sheetload } from '@nowzoo/sheetload';

@Component({
  selector: 'app-demo-sheets',
  templateUrl: './demo-sheets.component.html',
  styleUrls: ['./demo-sheets.component.css']
})
export class DemoSheetsComponent implements OnInit {

  themes = [
    {url: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css', label: 'Bootstrap Base'},
    {url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/cerulean/bootstrap.min.css', label: 'Cerulean'},
    {url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/cosmo/bootstrap.min.css', label: 'Cosmo'},
    {url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/cyborg/bootstrap.min.css', label: 'Cyborg'},
    {url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/darkly/bootstrap.min.css', label: 'Darkly'},
    {url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/flatly/bootstrap.min.css', label: 'Flatly'},
    {url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/journal/bootstrap.min.css', label: 'Journal'},
    {url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/litera/bootstrap.min.css', label: 'Litera'},
    {url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/lumen/bootstrap.min.css', label: 'Lumen'},
    {url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/lux/bootstrap.min.css', label: 'Lux'},
    {url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/materia/bootstrap.min.css', label: 'Materia'},
    {url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/minty/bootstrap.min.css', label: 'Minty'},
    {url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/pulse/bootstrap.min.css', label: 'Pulse'},
    {url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/sandstone/bootstrap.min.css', label: 'Sandstone'},
    {url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/simplex/bootstrap.min.css', label: 'Simplex'},
    {url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/sketchy/bootstrap.min.css', label: 'Sketchy'},
    {url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/slate/bootstrap.min.css', label: 'Slate'},
    {url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/solar/bootstrap.min.css', label: 'Solar'},
    {url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/spacelab/bootstrap.min.css', label: 'Spacelab'},
    {url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/superhero/bootstrap.min.css', label: 'Superhero'},
    {url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/united/bootstrap.min.css', label: 'United'},
    {url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/yeti/bootstrap.min.css', label: 'Yeti'},
    {url: '/assets/not-found/bootstrap.min.css', label: 'Not Found (Error Demo)'},
  ];

  error: string = null;
  status: string = null;
  link: HTMLLinkElement = null;
  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.loadTheme(null, this.themes[0]);
  }

  loadTheme(event: Event, rec: {label: string, url: string}) {
    if (event) {
      event.preventDefault();
    }

    this.error = null;
    this.status = `Loading ${rec.label} from ${rec.url}...`;
    Sheetload.load(rec.url)
      .then((link: HTMLLinkElement) => {
        if (event) {
          this.status = `Loaded ${rec.label} from ${rec.url}!`;
        } else {
          this.status = null;
        }
        if (this.link) {
          this.renderer.removeChild(document.head, this.link);
        }
        this.renderer.removeAttribute(link, 'disabled');
        this.link = link;
      })
      .catch(err => {
        this.status = null;
        this.error = `${rec.url} could not be loaded.`;
      });

  }

}
