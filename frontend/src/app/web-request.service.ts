import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({  
  providedIn: 'root'
})
export class WebRequestService {

  // this file is the connection point of angular frontend with nodejs backend 
  // apis will be called
  // but this file's methods will be called in the task.service.ts file
  

  readonly ROOT_URL;

  constructor(private http: HttpClient) { 
    this.ROOT_URL = 'http://localhost:3000';
  }

  get(uri: string){
     return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: Object){
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri: string, payload: Object){
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }
 
  delete(uri: string){
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }
}
