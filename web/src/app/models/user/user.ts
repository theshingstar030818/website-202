import {Component} from '@angular/core';

@Component({
  selector: 'user',
  template: ''
})

export class User {
	
	id:any;
	picture: String;
	email: String;
	password: String;
	firstName: String;
	lastName: String;
	phone: String;
	
	constructor() {

	}

	getId(){
		return this.id;
	}

	getFirstName(){
		return this.firstName;
	}

	setFirstName(firstName: String){
		this.firstName = firstName;
	}

	getEmail(){
		return this.email;
	}

	setEmail(email: String){
		this.email = email;
	}

}