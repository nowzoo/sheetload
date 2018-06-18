import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { Scriptload } from './scriptload';
import { Elementload } from './elementload';

describe('Scriptload', () => {
  let loadSpy;
  let scriptEl;
  beforeEach(() => {
    scriptEl = document.createElement('script');
    spyOn(scriptEl, 'setAttribute').and.callThrough();
    spyOn(document, 'createElement').and.returnValue(scriptEl);
    loadSpy = spyOn(Elementload, 'load').and.callFake((el) => Promise.resolve(el));
  });
  it('should create the element correctly', () => {
    Scriptload.load('http://localhost/foo.js');
    expect(document.createElement).toHaveBeenCalledWith('script');
    expect(scriptEl.setAttribute).toHaveBeenCalledWith('src', 'http://localhost/foo.js');
  });
  describe('load(url)', () => {
    it('should reject if Elementload.load fails', fakeAsync(() => {
      const err = new Error('foo');
      loadSpy.and.callFake(() => Promise.reject(err));
      let rejected;
      Scriptload.load('http://localhost/foo.js').catch(e => rejected = e);
      tick();
      expect(rejected).toBe(err);
    }));
    it('should resolve with the script if Elementload.load succeeds', fakeAsync(() => {
      let resolved;
      Scriptload.load('http://localhost/foo.js').then(r => resolved = r);
      tick();
      expect(resolved).toBe(scriptEl);
    }));
  });

});
