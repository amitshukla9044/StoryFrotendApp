import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestserviceService {

  private baseURL='http://localhost:7105/api/';
  constructor(private http:HttpClient) { }

  getTopStoryList():Observable<any>
  {
    
     return this.http.get<any>(this.baseURL+'Test/GetTopStories').pipe(catchError(this.handleError));

  }

  private handleError(err:HttpErrorResponse):Observable<any>{
    return throwError(()=>{ `Error occurred ${err}`});
  }
}
