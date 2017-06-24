import { Injectable } from '@angular/core';
import { UserServiceInterface } from './user-service-interface';

@Injectable()
export class AwsService implements UserServiceInterface {

    private initiallized: boolean = false;

    constructor() { 
        this.init();
    }

    init(){
    	
        this.initiallized = true;
    }

    isInitiallized(): boolean{
        return this.initiallized;
    }

    isLoggedIn(): boolean{
        return false;
    }

    login(values){
        return new Promise((resolve, reject) => {
            // values["email"], values["password"]
        });
    }

    logOut(){
        return new Promise((resolve, reject) => {
            
        });
    }

    getUserRole(): string{
        let role = "super";
        return role;
    }

    createTenant(values:any){
        
    }

}