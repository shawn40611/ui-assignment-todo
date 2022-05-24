import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../share.css']
})
export class SignupComponent {

  signupForm = this.formBuilder.group({ 
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
      error: (error: Error) => {console.log(error)},
      complete: () => { this.router.navigate(['account', 'login'])}
    }
    this.api.signup(this.signupForm).subscribe(observer);
  }
}
