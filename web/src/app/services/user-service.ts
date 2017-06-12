import { Injectable } from '@angular/core';

import { PAGES_MENU } from '../pages/pages.menu';
import { PAGES_MENU_TENANT } from '../pages/pages.menu.tenant';
import { PAGES_MENU_SUPER } from '../pages/pages.menu.super';

import Parse from 'parse';

@Injectable()
export class UserService {

    constructor() { 

    }

    init(){
    	console.log("init parse");
    	Parse.initialize('202_app_id');
	    Parse.serverURL = 'http://162.243.118.87:1340/parse';
    }

    isLoggedIn(){
    	return Parse.User.current();
    }

    login(values){
    	return new Promise((resolve, reject) => {
	    	Parse.User.logIn(values["email"], values["password"], {
		        success: function(user) {
		          	resolve(user);
		        },
		        error: function(user, error) {
		          	reject(error);
		        }
		    });
		});
    }

    logOut(){
    	return new Promise((resolve, reject) => {
	    	Parse.User.logOut().then(() => {
			  	resolve();
			}).catch((error) => {
				reject(error);
			});
		});
    }

    getSideMenu(){
    	let role = Parse.User.current().get("role");
    	console.log("user role is : " + role);
    	if(role == "super"){
    		return PAGES_MENU_SUPER;
    	}else if(role == "tenant"){
    		return PAGES_MENU_TENANT;
    	}else{
    		return PAGES_MENU;
    	}
    }

}