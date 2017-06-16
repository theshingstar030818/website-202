import { Injectable } from '@angular/core';

import { PAGES_MENU } from '../pages/pages.menu';
import { PAGES_MENU_TENANT } from '../pages/pages.menu.tenant';
import { PAGES_MENU_SUPER } from '../pages/pages.menu.super';

import { ParseService } from './parse-service';

@Injectable()
export class UserService {

    constructor(
        private cloudService: ParseService
    ) {}

    init(){
    	console.log("init user service");
    }

    isLoggedIn(): boolean{
    	return this.cloudService.isLoggedIn();
    }

    login(values){
    	return new Promise((resolve, reject) => {
            this.cloudService.login(values).then((user)=>{
                resolve(user);
            }).catch((error)=>{
                reject(error);
            });
        });
    }

    logOut(){
    	return new Promise((resolve, reject) => {
            this.cloudService.logOut().then((user)=>{
                resolve(user);
            }).catch((error)=>{
                reject(error);
            });
        });
    }

    getSideMenu(){
    	let role = this.cloudService.getUserRole();
    	if(role == "super"){
    		return PAGES_MENU_SUPER;
    	}else if(role == "tenant"){
    		return PAGES_MENU_TENANT;
    	}else{
    		return PAGES_MENU;
    	}
    }

}