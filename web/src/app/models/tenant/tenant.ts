import {Component} from '@angular/core';
import { User } from '../user/user';

@Component({
  selector: 'tenant',
  template: ''
})

export class Tenant extends User {

	companyName:String;
	companyAddress: String;
	website: String;
	govId3: String;

	constructor() {
		super();
	}

	getCompanyName(){
		return this.companyName;
	}

	setCompanyName(companyName: String){
		this.companyName = companyName;
	}
	
}