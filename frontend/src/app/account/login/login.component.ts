import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { HttpXsrfTokenExtractor } from '@angular/common/http'
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  xsrfToken = this.tokenExtractor.getToken();
  loginForm = this.formBuilder.group({ 
      'username': '',
      'password': '',
    })



  constructor(
    private tokenExtractor: HttpXsrfTokenExtractor,
    private formBuilder: FormBuilder,
    private api: ApiService
    ) { }

  ngOnInit(): void {
      this.xsrfToken = this.tokenExtractor.getToken();
  }

  onSubmit() {
    let observer = {
      error: (error: Error) => {console.log('error')}
    }
    this.api.login(this.loginForm).subscribe(observer);
  }
}
