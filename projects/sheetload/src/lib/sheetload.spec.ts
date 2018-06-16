import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { Sheetload } from './sheetload';

describe('Sheetload', () => {
  describe('getHeadElement()', () => {
    it('should return document.head', () => {
      expect(Sheetload.getHeadElement()).toBe(document.head);
    });
  });

  describe('load(url)', () => {
    let headEl: any;
    let linkEl: any;
    let url;
    beforeEach(() => {
      url = 'http://localhost/foo.css';
      headEl = {
        appendChild: jasmine.createSpy(),
        removeChild: jasmine.createSpy()
      };
      linkEl = document.createElement('link');
      spyOn(Sheetload, 'getHeadElement').and.returnValue(headEl);
      spyOn(document, 'createElement').and.returnValue(linkEl);
      spyOn(linkEl, 'addEventListener').and.callThrough();
      spyOn(linkEl, 'removeEventListener').and.callThrough();
      spyOn(linkEl, 'setAttribute').and.callThrough();
    });
    it('should create the link', fakeAsync(() => {
      Sheetload.load(url);
      expect(document.createElement).toHaveBeenCalledWith('link');
    }));
    it('should set the rel attr', fakeAsync(() => {
      Sheetload.load(url);
      expect(linkEl.setAttribute).toHaveBeenCalledWith('rel', 'stylesheet');
    }));
    it('should set the href attr', fakeAsync(() => {
      Sheetload.load(url);
      expect(linkEl.setAttribute).toHaveBeenCalledWith('href', url);
    }));
    it('should set the load listener', fakeAsync(() => {
      Sheetload.load(url);
      expect(linkEl.addEventListener).toHaveBeenCalledWith('load', jasmine.any(Function));
    }));
    it('should set the error listener', fakeAsync(() => {
      Sheetload.load(url);
      expect(linkEl.addEventListener).toHaveBeenCalledWith('error', jasmine.any(Function));
    }));
    it('should append the link', fakeAsync(() => {
      Sheetload.load(url);
      expect(headEl.appendChild).toHaveBeenCalledWith(linkEl);
    }));
    it('should resolve with the link element when loaded', fakeAsync(() => {
      let resolved;
      const event = new Event('load');
      Sheetload.load(url).then((r) => resolved = r);
      linkEl.dispatchEvent(event);
      tick();
      expect(resolved).toBe(linkEl);
    }));
    it('should unlisten to the load event on success', fakeAsync(() => {
      let resolved;
      const event = new Event('load');
      Sheetload.load(url).then((r) => resolved = r);
      linkEl.dispatchEvent(event);
      tick();
      expect(linkEl.removeEventListener).toHaveBeenCalledWith('load', jasmine.any(Function));
    }));
    it('should unlisten to the error event on success', fakeAsync(() => {
      let resolved;
      const event = new Event('load');
      Sheetload.load(url).then((r) => resolved = r);
      linkEl.dispatchEvent(event);
      tick();
      expect(linkEl.removeEventListener).toHaveBeenCalledWith('error', jasmine.any(Function));
    }));
    it('should set the disabled attr on the link', fakeAsync(() => {
      let resolved;
      const event = new Event('load');
      Sheetload.load(url).then((r) => resolved = r);
      linkEl.dispatchEvent(event);
      tick();
      expect(linkEl.setAttribute).toHaveBeenCalledWith('disabled', 'disabled');
    }));
    it('should reject with the event on failure', fakeAsync(() => {
      let rejected;
      const event = new Event('error');
      Sheetload.load(url).catch((e) => rejected = e);
      linkEl.dispatchEvent(event);
      tick();
      expect(rejected).toBe(event);
    }));
    it('should remove the link on error', fakeAsync(() => {
      let rejected;
      const event = new Event('error');
      Sheetload.load(url).catch((e) => rejected = e);
      linkEl.dispatchEvent(event);
      tick();
      expect(headEl.removeChild).toHaveBeenCalledWith(linkEl);
    }));
    it('should unlisten to load on error', fakeAsync(() => {
      let rejected;
      const event = new Event('error');
      Sheetload.load(url).catch((e) => rejected = e);
      linkEl.dispatchEvent(event);
      tick();
      expect(linkEl.removeEventListener).toHaveBeenCalledWith('load', jasmine.any(Function));
    }));
    it('should unlisten to error on error', fakeAsync(() => {
      let rejected;
      const event = new Event('error');
      Sheetload.load(url).catch((e) => rejected = e);
      linkEl.dispatchEvent(event);
      tick();
      expect(linkEl.removeEventListener).toHaveBeenCalledWith('error', jasmine.any(Function));
    }));
  });

});
