import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDo';
  constructor(
    public cookie: CookieService,
    private api: ApiService,
    private router: Router
    ) {}
  logout() {
    this.api.logout().subscribe(
      () => {
        this.router.navigate(['account', 'logout'])
      }
    )
  }
}
