import {Component} from '@angular/core';

@Component({
  selector: 'user',
  template: ''
})

export class User {
	
	id:any;
	picture:String;
	fName:String;
	lName:String;
	email:String;
	
	constructor() {

	}

	getId(){
		return this.id;
	}

	getFirstName(){
		return this.fName;
	}

	setFirstName(fName: String){
		this.fName = fName;
	}

	getEmail(){
		return this.email;
	}

	setEmail(email: String){
		this.email = email;
	}

}