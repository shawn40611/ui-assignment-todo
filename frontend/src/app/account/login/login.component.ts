import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../share.css']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({ 
      'username': '',
      'password': '',
    })



  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router
    ) { }

  onSubmit() {
    let observer = {
      complete: () => { this.router.navigate(['todo']); },
      error: (error: Error) => {console.log(error)},
      next: () => {debugger;}
    }
    this.api.login(this.loginForm).subscribe(observer);
  }
}
