import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseUrl = " http://localhost:5100/record";

  postRecord(data: any){
    return this.http.post<any>(this.baseUrl, data);
  }

  getRecord(){
    return this.http.get<any>(this.baseUrl);
  }

  putRecord(data: any, id: number){
    return this.http.put<any>(this.baseUrl + id, data);
  }

  deleteRecord(id: number){
    return this.http.delete<any>(this.baseUrl + id);
  }

}
