import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean> = of(true);
  
  constructor(
      private authService: AuthService,
      private router: Router
    ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  newCustomer(){
    this.router.navigateByUrl('/add');
  }

  onLogout(){
    this.authService.logout();
  }
}
