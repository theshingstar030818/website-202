import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgUploaderOptions } from 'ngx-uploader';
import { Tenant } from '../../../../models/tenant/tenant';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./add-tenant-modal.component.scss')],
  templateUrl: './add-tenant-modal.component.html'
})

export class AddTenantModal implements OnInit {

  tenant: Tenant;
  modalHeader: string;
  editing:Boolean = false;
  
  public defaultPicture = 'assets/img/theme/no-photo.png';
  
  public profile:any = {
    picture: ''
  };
  public uploaderOptions:NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: '',
  };

  public fileUploaderOptions:NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: '',
  };

  constructor(private activeModal: NgbActiveModal) {
    console.log("new tenant");
    console.log(activeModal);
  }

  ngOnInit() {}

  addNewTenant() {
    console.log("add new tenant now");
  }

  closeModal() {
    this.activeModal.close();
  }
}
