import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../share.css']
})
export class LoginComponent implements OnInit{
  loginForm = this.formBuilder.group({ 
      'username': '',
      'password': '',
    })



  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private cookie: CookieService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(this.cookie.check('is_login')) {
      this.router.navigate(['todo']);
    }
  }

  onSubmit() {
    let observer = {
      complete: () => { this.router.navigate(['todo']); },
      error: (error: Error) => {console.log(error)},
      next: () => {debugger;}
    }
    this.api.login(this.loginForm).subscribe(observer);
  }
}
