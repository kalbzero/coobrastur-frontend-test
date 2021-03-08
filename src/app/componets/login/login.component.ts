import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    console.log(this.loginForm.value);
  }

  onSubmit(){
    console.log(this.loginForm.value);
    if(this.loginForm.valid){
      
      this.authService.login(this.loginForm.value);
    }
  }
}
