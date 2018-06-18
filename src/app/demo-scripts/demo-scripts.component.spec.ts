import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoScriptsComponent } from './demo-scripts.component';

describe('DemoScriptsComponent', () => {
  let component: DemoScriptsComponent;
  let fixture: ComponentFixture<DemoScriptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoScriptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoScriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
