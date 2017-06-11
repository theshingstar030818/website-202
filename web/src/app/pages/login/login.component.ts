import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user-service';

import Parse from 'parse';

import 'style-loader!./login.scss';

@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(
      private fb:FormBuilder,
      private router: Router,
      private userService: UserService
    ) {

    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {    
    this.submitted = true;
    let me = this;
    if (this.form.valid) {
      this.userService.login(values).then((user)=>{
        me.router.navigate(['/pages']);
      }).catch((error)=>{
        alert(error.message);
      });
    }
  }
}
