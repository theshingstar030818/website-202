import { Injectable } from '@angular/core';

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
	    	Parse.User.logOut(null, {
		        success: function() {
		          resolve();
		        },
		        error: function(error) {
		          reject(error);
		        }
		    });
		});
    }

    getSideMenu(){
    	
    }

}