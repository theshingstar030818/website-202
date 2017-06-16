import { Injectable } from '@angular/core';
import { UserServiceInterface } from './user-service-interface';

import Parse from 'parse';

@Injectable()
export class ParseService implements UserServiceInterface {

    private initiallized: boolean = false;

    constructor() { 
        this.init();
    }

    init(){
    	Parse.initialize('202_app_id');
	    Parse.serverURL = 'http://162.243.118.87:1340/parse';
        this.initiallized = true;
    }

    isInitiallized(): boolean{
        return this.initiallized;
    }

    isLoggedIn(): boolean{
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

    getUserRole(): string{
        let role = Parse.User.current().get("role");
        return role;
    }

    createTenant(values:any){
        
    }

}