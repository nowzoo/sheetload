import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoSheetsComponent } from './demo-sheets.component';

describe('DemoSheetsComponent', () => {
  let component: DemoSheetsComponent;
  let fixture: ComponentFixture<DemoSheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoSheetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
