import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Sheetload } from '@nowzoo/sheetload';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  bootstrapURL = 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css';
  bootswatchURL = 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1';

  themes = [
    'bootstrap',
    'cerulean',
    'cosmo',
    'cyborg',
    'darkly',
    'flatly',
    'journal',
    'litera',
    'lumen',
    'lux',
    'materia',
    'minty',
    'pulse',
    'sandstone',
    'simplex',
    'sketchy',
    'slate',
    'solar',
    'spacelab',
    'superhero',
    'united',
    'yeti',
    'not-found',
  ];

  fc: FormControl;
  link: HTMLLinkElement = null;
  loading = false;
  error: any = null;
  constructor(
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    this.load(this.bootstrapURL);
    this.fc = new FormControl('bootstrap');
    this.fc.valueChanges.subscribe(val => {
      let url;
      if ('bootstrap' === val) {
        url = this.bootstrapURL;
      } else {
        url = `${this.bootswatchURL}/${val}/bootstrap.min.css`;
      }
      this.load(url);
    });
  }
  load(url) {
    this.loading = true;
    this.error = null;
    Sheetload.load(url)
      .then((link: HTMLLinkElement) => {
        this.loading = false;
        if (this.link) {
          this.renderer.removeChild(document.head, this.link);
        }
        this.renderer.removeAttribute(link, 'disabled');
        this.link = link;
      })
      .catch(err => {
        this.error = err;
        console.log(err);
        this.loading = false;
      });
  }


}
