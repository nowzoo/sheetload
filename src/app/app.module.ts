import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DemoScriptsComponent } from './demo-scripts/demo-scripts.component';
import { DemoSheetsComponent } from './demo-sheets/demo-sheets.component';

@NgModule({
  declarations: [
    DemoScriptsComponent,
    DemoSheetsComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [
    DemoScriptsComponent,
    DemoSheetsComponent
  ]
})
export class AppModule { }
