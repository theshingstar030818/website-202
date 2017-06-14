import { NgModule } from '@angular/core';
import { NgaModule } from '../theme/nga.module';

import { User } from './user/user';
import { Tenant } from './tenant/tenant';

@NgModule({
  imports: [
  	NgaModule
  ],
  declarations: [
	  User, 
	  Tenant
  ]
})
export class ModelsModule {
}
