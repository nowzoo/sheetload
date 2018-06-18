import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { Sheetload } from './sheetload';
import { Elementload } from './elementload';

describe('Sheetload', () => {
  let loadSpy;
  let linkEl;
  beforeEach(() => {
    linkEl = document.createElement('link');
    spyOn(linkEl, 'setAttribute').and.callThrough();
    spyOn(document, 'createElement').and.returnValue(linkEl);
    loadSpy = spyOn(Elementload, 'load').and.callFake((el) => Promise.resolve(el));
  });
  it('should create the element correctly', () => {
    Sheetload.load('http://localhost/foo.css');
    expect(document.createElement).toHaveBeenCalledWith('link');
    expect(linkEl.setAttribute).toHaveBeenCalledWith('rel', 'stylesheet');
    expect(linkEl.setAttribute).toHaveBeenCalledWith('href', 'http://localhost/foo.css');
  });
  describe('load(url)', () => {
    it('should reject if Elementload.load fails', fakeAsync(() => {
      const err = new Error('foo');
      loadSpy.and.callFake(() => Promise.reject(err));
      let rejected;
      Sheetload.load('http://localhost/foo.css').catch(e => rejected = e);
      tick();
      expect(rejected).toBe(err);
    }));
    it('should resolve with the link if Elementload.load succeeds', fakeAsync(() => {
      let resolved;
      Sheetload.load('http://localhost/foo.css').then(r => resolved = r);
      tick();
      expect(resolved).toBe(linkEl);
    }));
    it('should set disabled on the link', fakeAsync(() => {
      let resolved;
      Sheetload.load('http://localhost/foo.css').then(r => resolved = r);
      tick();
      expect(linkEl.setAttribute).toHaveBeenCalledWith('disabled', 'disabled');
    }));
  });

});
