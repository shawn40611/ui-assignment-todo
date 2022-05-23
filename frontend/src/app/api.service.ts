import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(loginForm: FormGroup) {
    let formData = new FormData();
    formData.append('username', loginForm.get('username')?.value);
    formData.append('password', loginForm.get('password')?.value);
    let url = "/account/login/"
    return this.http.post(url, formData)
  }
}
