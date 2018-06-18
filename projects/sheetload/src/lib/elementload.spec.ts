import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { Elementload } from './elementload';

describe('Elementload', () => {
  describe('getHeadElement()', () => {
    it('should return document.head', () => {
      expect(Elementload.getHeadElement()).toBe(document.head);
    });
  });

  describe('load(url)', () => {
    let headEl: any;
    let el: any;
    let url;
    beforeEach(() => {
      url = 'http://localhost/foo.css';
      headEl = {
        appendChild: jasmine.createSpy(),
        removeChild: jasmine.createSpy()
      };
      el = document.createElement('link');
      spyOn(Elementload, 'getHeadElement').and.returnValue(headEl);
      spyOn(el, 'addEventListener').and.callThrough();
      spyOn(el, 'removeEventListener').and.callThrough();
      spyOn(el, 'setAttribute').and.callThrough();
    });


    it('should set the load listener', fakeAsync(() => {
      Elementload.load(el);
      expect(el.addEventListener).toHaveBeenCalledWith('load', jasmine.any(Function));
    }));
    it('should set the error listener', fakeAsync(() => {
      Elementload.load(el);
      expect(el.addEventListener).toHaveBeenCalledWith('error', jasmine.any(Function));
    }));
    it('should append the link', fakeAsync(() => {
      Elementload.load(el);
      expect(headEl.appendChild).toHaveBeenCalledWith(el);
    }));
    it('should resolve with the link element when loaded', fakeAsync(() => {
      let resolved;
      const event = new Event('load');
      Elementload.load(el).then((r) => resolved = r);
      el.dispatchEvent(event);
      tick();
      expect(resolved).toBe(el);
    }));
    it('should unlisten to the load event on success', fakeAsync(() => {
      let resolved;
      const event = new Event('load');
      Elementload.load(el).then((r) => resolved = r);
      el.dispatchEvent(event);
      tick();
      expect(el.removeEventListener).toHaveBeenCalledWith('load', jasmine.any(Function));
    }));
    it('should unlisten to the error event on success', fakeAsync(() => {
      let resolved;
      const event = new Event('load');
      Elementload.load(el).then((r) => resolved = r);
      el.dispatchEvent(event);
      tick();
      expect(el.removeEventListener).toHaveBeenCalledWith('error', jasmine.any(Function));
    }));

    it('should reject with the event on failure', fakeAsync(() => {
      let rejected;
      const event = new Event('error');
      Elementload.load(el).catch((e) => rejected = e);
      el.dispatchEvent(event);
      tick();
      expect(rejected).toBe(event);
    }));
    it('should remove the link on error', fakeAsync(() => {
      let rejected;
      const event = new Event('error');
      Elementload.load(el).catch((e) => rejected = e);
      el.dispatchEvent(event);
      tick();
      expect(headEl.removeChild).toHaveBeenCalledWith(el);
    }));
    it('should unlisten to load on error', fakeAsync(() => {
      let rejected;
      const event = new Event('error');
      Elementload.load(el).catch((e) => rejected = e);
      el.dispatchEvent(event);
      tick();
      expect(el.removeEventListener).toHaveBeenCalledWith('load', jasmine.any(Function));
    }));
    it('should unlisten to error on error', fakeAsync(() => {
      let rejected;
      const event = new Event('error');
      Elementload.load(el).catch((e) => rejected = e);
      el.dispatchEvent(event);
      tick();
      expect(el.removeEventListener).toHaveBeenCalledWith('error', jasmine.any(Function));
    }));
  });

});
