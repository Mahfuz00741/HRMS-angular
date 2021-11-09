import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Login} from "../../models/login";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  model: Login = new Login();
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeFormValue();
  }

  initializeFormValue(): any {
    this.loginForm = this.formBuilder.group(
      {
        loginId: ['', [Validators.required]],
        password: ['', [Validators.required]],
      }
    )
  }

  generateModel(): any{
    this.model.loginId = this.loginForm.value.loginId;
    this.model.password = this.loginForm.value.password;
  }

  submit() {
    this.generateModel();
    console.log(this.model);
    this.service.login(this.model).subscribe(
      res => {
        if (res.status === 'SUCCESS'){
          console.log('Login success')
          this.message = 'Login success'
          this.router.navigate(['admin/user'])
        }
        else {
          this.message = 'Invalid Login'
        }
      }, error => {
        this.message = 'unable to access data';
      }
    )
  }
}
