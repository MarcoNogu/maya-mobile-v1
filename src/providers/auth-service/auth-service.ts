import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'https://api.maa.com.br/Token';

@Injectable()
export class AuthServiceProvider {
  
      constructor(public http: Http) {
  
      }
  
      postData(username, password) { 
          return new Promise((resolve, reject) => {
              let headers = new Headers({}); 
              headers.append('Content-Type', 'application/x-www-form-urlencoded');
              this.http.post(apiUrl, "username=" + username + "&password=" + password + "&grant_type=password", {
                  headers: headers
              }).
              subscribe(res => {
                  resolve(res.json());
              }, (err) => {
                  reject(err);
              });  
          });  
      }
  
  }