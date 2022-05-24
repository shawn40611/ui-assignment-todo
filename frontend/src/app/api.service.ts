import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable, map } from 'rxjs';


export interface ToDo {
  title: string,
  detail: string,
  id: string,
  is_done: boolean,
}

interface isLoginResponse  {
  is_login: boolean
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  _isLogin: boolean|null = null;

  constructor(private http: HttpClient) { }

  isLogin() {
    if (this._isLogin == null) {
      let url = "/api/account/is_login/"
      this.http.get<isLoginResponse>(url).subscribe(
        result => {
          this._isLogin = result.is_login;
          return this._isLogin;
        }
      )
    }
    return this._isLogin;
  }

  login(loginForm: FormGroup) {
    let formData = new FormData();
    formData.append('username', loginForm.get('username')?.value);
    formData.append('password', loginForm.get('password')?.value);
    let url = "/api/account/login/"
    return this.http.post(url, formData).pipe(
      map((result: any) => {
        this._isLogin = result.status == 200;
        return result
      })
    )
  }

  logout() {
    let url = "/api/account/logout/"
    return this.http.get(url).pipe(
      map((result: any) => {
        this._isLogin = result.status == 200? false: this._isLogin;
        return result
      })
    )
  }

  signup(signupForm: FormGroup) {
    let formData = new FormData();
    formData.append('username', signupForm.get('username')?.value);
    formData.append('password', signupForm.get('password')?.value);
    let url = "/api/account/signup/"
    return this.http.post(url, formData)
  }

  getToDoList(searchParams: {}): Observable<ToDo[]> {
    let url = "/api/todo/";
    let params = new HttpParams({
      fromObject: searchParams
    });
    return this.http.get<ToDo[]>(url, {params: params});
  }

  createToDo(data: ToDo) {
    let url = "api/todo/";
    return this.http.post(url, data);
  }

  updateToDo(id:string, updateForm: FormGroup) {
    let url = `/api/todo/${id}/`;
    console.log(id);
    console.log(url);
    let data = {
      'title': updateForm.get('title')?.value,
      'detail': updateForm.get('detail')?.value,
      'is_done': updateForm.get('is_done')?.value,
    }
    return this.http.patch(url, data);
  }

  markDone(ids: string[]) {
    let url = "api/todo/mark_done/";
    return this.http.patch(url, {'ids': ids});
  }


}
