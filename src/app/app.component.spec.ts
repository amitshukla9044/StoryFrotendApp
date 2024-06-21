import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TestserviceService } from './testservice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';

describe('AppComponent', () => {
  let service: TestserviceService;
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const errorMessage = 'An error occurred';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [TestserviceService],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    service = TestBed.inject(TestserviceService);

  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'DemoApp'`, () => {

    expect(app.title).toEqual('DemoApp');
  });

  it(`Fetch data from Test Service and display`, () => {
    //arrange
    const expectedData = [{ "by": "marcodiego", "descendants": 0, "id": 40729250, "score": 1, "time": 1718811366, "title": "MuseBook RISC-V Laptop", "type": "story", "url": "https://arace.tech" }, { "by": "marcodiego", "descendants": 0, "id": 40729250, "score": 1, "time": 1718811366, "title": "MuseBook RISC-V Laptop", "type": "story", "url": "https://arace.tech" }, { "by": "marcodiego", "descendants": 0, "id": 40729250, "score": 1, "time": 1718811366, "title": "MuseBook RISC-V Laptop", "type": "story", "url": "https://arace.tech" }];
    spyOn(service, 'getTopStoryList').and.returnValue(of(expectedData));
    //action
    fixture.detectChanges();

    //Assert
    fixture.detectChanges();
    const tableRowItems = fixture.nativeElement.querySelectorAll('a')
    expect(tableRowItems.length).toBe(expectedData.length)

  });

  it(`Handle Service Error`, () => {
    //arrange
    const expextedMsg = 'Error Occurred';
    spyOn(service, 'getTopStoryList').and.returnValue(
      new Observable(observer => { observer.error(new Error('Error Occurred')) })
    );
    //action
    fixture.detectChanges();

    //Assert
    fixture.detectChanges();
    const errorMsg = app.errorMsg
    expect(errorMsg).toContain(expextedMsg);

  });

  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('DemoApp app is running!');
  // });
});
