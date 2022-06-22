import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: any;
  const mockUrl = 'myUrl';
  let callUrl = '';

  beforeEach(() => {
    httpMock = jasmine.createSpyObj('HttpClient', ['get', 'delete', 'patch', 'post']);
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpMock }]
    });

    service = TestBed.inject(ApiService);

    callUrl = mockUrl;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it(' should return http.get with the same url', () => {
      const txt = 'test1';


      let getspy = httpMock.get.and.returnValue(of(txt));
      service.get(mockUrl).subscribe();
      expect(getspy.calls.any()).toBe(true, txt);
      expect(httpMock.get).toHaveBeenCalledOnceWith(callUrl, undefined);
    });

    it(' should return http.get with the same url and given options', () => {
      const txt = 'test1';
      const mockOptions = { test: 'wot1' }
      httpMock.get.and.returnValue(of(txt));
      service.get(mockUrl, mockOptions).subscribe();
      expect(httpMock.get).toHaveBeenCalledOnceWith(callUrl, { ...mockOptions });
    });


  })

  describe('delete', () => {
    it(' should return http.delete with the same url', () => {
      const txt = 'test1';
      httpMock.delete.and.returnValue(of(txt));
      service.delete(mockUrl).subscribe();
      expect(httpMock.delete).toHaveBeenCalledOnceWith(callUrl, undefined);
    });

    it(' should return http.delete with the same url and given options', () => {
      const txt = 'test1';
      const mockOptions = { test: 'wot1' }
      httpMock.delete.and.returnValue(of(txt));
      service.delete(mockUrl, mockOptions).subscribe();
      expect(httpMock.delete).toHaveBeenCalledOnceWith(callUrl, { ...mockOptions });
    });


  })

  describe('patch', () => {
    const data = { wot3: 'wot3' };
    it(' should return http.patch with the same url', () => {
      const txt = 'test1';
      httpMock.patch.and.returnValue(of(txt));
      service.patch(mockUrl, data).subscribe();
      expect(httpMock.patch).toHaveBeenCalledOnceWith(callUrl, data, undefined);
    });

    it(' should return http.patch with the same url and given options', () => {
      const txt = 'test1';
      const mockOptions = { test: 'wot1' }
      httpMock.patch.and.returnValue(of(txt));
      service.patch(mockUrl, data, mockOptions).subscribe();
      expect(httpMock.patch).toHaveBeenCalledOnceWith(callUrl, data, { ...mockOptions });
    });


  })

  describe('post', () => {
    const data = { wot3: 'wot3' };
    it(' should return http.post with the same url', () => {
      const txt = 'test1';
      httpMock.post.and.returnValue(of(txt));
      service.post(mockUrl, data).subscribe();
      expect(httpMock.post).toHaveBeenCalledOnceWith(callUrl, data, undefined);
    });

    it(' should return http.post with the same url and given options', () => {
      const txt = 'test1';
      const mockOptions = { test: 'wot1' }
      httpMock.post.and.returnValue(of(txt));
      service.post(mockUrl, data, mockOptions).subscribe();
      expect(httpMock.post).toHaveBeenCalledOnceWith(callUrl, data, { ...mockOptions });
    });


  })




});
