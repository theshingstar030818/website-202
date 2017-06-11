import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalState} from '../../../global.state';
import {UserService} from '../../../services/user-service';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop {

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  constructor(
    private _state:GlobalState, 
    private router: Router,
    private userService: UserService
    )
  {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  public logOut(){
    this.userService.logOut().then(()=>{
      this.router.navigateByUrl('/login');
    }).catch((error)=>{
      alert(error.message);
    });
    
  }
}
