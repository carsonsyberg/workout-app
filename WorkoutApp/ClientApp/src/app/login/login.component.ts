import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { User } from '../classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  logginIn = true;

  loginForm = this.fb.group({
    userOrEmail: [''],
    password: [''],
  });

  registerForm = this.fb.group({
    Name: [''],
    Email: [''],
    Password: [''],
  })

  constructor(private fb: FormBuilder, private accountService: AccountService) {

  }

  toggleLogginIn() {
    this.clearLogin();
    this.clearRegister();
    this.logginIn = !this.logginIn;
  }

  login() {
    console.log(this.loginForm.value);
    this.accountService.login(this.loginForm.value.userOrEmail as string, this.loginForm.value.password as string).subscribe((res) => {
      if (res) {
        console.log("logged in");
      }
      else {
        console.log("error logging in");
      }
    });
  }

  register() {
    console.log(this.registerForm.value);
    this.accountService.register(this.registerForm.value as User).subscribe((res) => console.log(res));
  }

  clearLogin() {
    this.loginForm.reset();
  }

  clearRegister() {
    this.registerForm.reset();
  }
}
