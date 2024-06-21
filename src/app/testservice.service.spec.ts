import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { TestserviceService } from './testservice.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('TestserviceService', () => {
  let service: TestserviceService;
  let httpMock:HttpTestingController

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TestserviceService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getTopStoryList should give top stories list',()=>{
//arrange
const apiUrl='http://localhost:7105/api/Test/GetTopStories'
const executedData='[{"by" : "marcodiego","descendants" : 0,"id" : 40729250,"score" : 1,"time" : 1718811366,"title" : "MuseBook RISC-V Laptop","type" : "story","url" : "https://arace.tech"},{"by" : "marcodiego","descendants" : 0,"id" : 40729250,"score" : 1,"time" : 1718811366,"title" : "MuseBook RISC-V Laptop","type" : "story","url" : "https://arace.tech"},{"by" : "marcodiego","descendants" : 0,"id" : 40729250,"score" : 1,"time" : 1718811366,"title" : "MuseBook RISC-V Laptop","type" : "story","url" : "https://arace.tech"}]';

//Act
service.getTopStoryList().subscribe(result=> expect(result).toEqual(executedData));
//Assert
const req=httpMock.expectOne(apiUrl);
expect(req.request.method).toEqual('GET');
req.flush(executedData);
  });
});
