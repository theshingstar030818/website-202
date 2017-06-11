import { Injectable } from '@angular/core';

import Parse from 'parse';

@Injectable()
export class UserService {

    constructor() { 

    }

    init(){
    	Parse.initialize('202_app_id');
	    Parse.serverURL = 'http://162.243.118.87:1340/parse';
    }

    isLoggedIn(){
    	return Parse.User.current();
    }

}