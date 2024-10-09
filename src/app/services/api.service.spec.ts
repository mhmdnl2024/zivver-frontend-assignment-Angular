import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

describe('Test ApiService:', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('get function should return the proper response and call expected endpoint', () => {
    const mockResponse = 'test response';
    const endpoint = '/test';

    apiService.get(endpoint).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(environment.apiUrl + endpoint);
    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });
});
