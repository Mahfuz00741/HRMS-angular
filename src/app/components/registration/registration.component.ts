import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Registration} from "../../models/registration";
import {RegistrationService} from "../../services/registration.service";
import {UserService} from "../../modules/admin/services/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  //roles: any = ['ADMIN', 'USER'];
  registrationForm: FormGroup;
  model: Registration = new Registration();
  modelList: Registration[] = new Array();
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: RegistrationService,
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initializeFormValue();
    this.getAll();
    //this.passwordMatch();
  }



  initializeFormValue(): any {
    this.registrationForm = this.formBuilder.group(
      {
        code: ['', [Validators.required]],
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        mobileNo: ['', [Validators.required]],
        password: ['', [Validators.required]],
        matchPassword: ['', [Validators.required]]
      }
    )
  }


  getAll(): any {
    this.userService.getList().subscribe(
      res => {
        this.modelList = res.content;
        console.log(this.modelList);
      }
    )
  }


  generateModel(): any {
    this.model.code = this.registrationForm.value.code;
    this.model.name = this.registrationForm.value.name;
    this.model.email = this.registrationForm.value.email;
    this.model.mobileNo = this.registrationForm.value.mobileNo;
    this.model.password = this.registrationForm.value.password;
    this.model.matchPassword = this.registrationForm.value.matchPassword;
  }

  submit(): any {

    if(!this.isCodeUnique(this.registrationForm.value.code)){
      this.message = "code is already used";
      console.log('code is already used');
      return;
    }

    if(!this.isEmailUnique(this.registrationForm.value.email)){
      this.message = "email is already used";
      console.log('email is already used');
      return;
    }

    if(!this.isMobileNoUnique(this.registrationForm.value.mobileNo)){
      this.message = "Mobile no is already used";
      console.log('Mobile no is already used');
      return;
    }
    this.generateModel();
    console.log(this.model);
    this.service.create(this.model).subscribe(
      res => {
        if (res.status === 'SUCCESS'){
          console.log('Registration success');
          this.message = 'Registration success';
          this.router.navigate(['/']);
        }else {
          console.log('Registration unsuccessfully');
          this.message = 'Registration unsuccessfully';
        }
      }, error => {
        console.log('unable to access data');
        this.message = 'unable to access data';
      }
    )

  }


  isCodeUnique(code: string): boolean{
    // return this.modelList.find(model => model.code === code) ? false : true;
    for(let model of this.modelList){
      if(model.code == code){
        return false;
      }
    }
    return true;
  }
  isEmailUnique(email: string): boolean{
    for(let model of this.modelList){
      if(model.email == email){
        return false;
      }
    }
    return true;
  }

  isMobileNoUnique(mobileNo: string): boolean{

    for(let model of this.modelList){
      if(model.mobileNo == mobileNo){
        return false;
      }
    }
    return true;
  }

}
