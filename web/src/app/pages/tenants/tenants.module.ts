import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { Tenants } from './tenants.component';
import { routing } from './tenants.routing';
import { Modals } from './modals';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { DefaultModal } from './modals/default-modal/default-modal.component';
import { AddTenantModal } from './modals/add-tenant-modal/add-tenant-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFormsModule,
    AppTranslationModule,
    NgaModule,
    NgbDropdownModule,
    NgbModalModule,
    routing
  ],
  declarations: [
    Modals,
    DefaultModal,
    AddTenantModal,
    Tenants
  ],
  entryComponents: [
    DefaultModal,
    AddTenantModal
  ],
  providers: [
    
  ]
})
export class TenantsModule {}
