import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDo';
  constructor(
    public api:ApiService,
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
