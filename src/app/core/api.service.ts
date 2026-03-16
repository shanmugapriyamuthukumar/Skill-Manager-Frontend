import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = "http://localhost:9090";

  constructor(private http: HttpClient) {}

  private getHeaders() {

    const token = localStorage.getItem("token");

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  get(url: string) {
    return this.http.get(this.baseUrl + url, this.getHeaders());
  }

  post(url: string, data: any) {
    return this.http.post(this.baseUrl + url, data, this.getHeaders());
  }

  put(url: string, data: any) {
    return this.http.put(this.baseUrl + url, data, this.getHeaders());
  }

  delete(url: string) {
    return this.http.delete(this.baseUrl + url, this.getHeaders());
  }
}