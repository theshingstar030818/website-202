import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./add-tenant-modal.component.scss')],
  templateUrl: './add-tenant-modal.component.html'
})

export class AddTenantModal implements OnInit {

  modalHeader: string;
  modalContent: string = ``;
  isRemember: boolean = false;
  
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

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit() {}

  addNewTenant() {
    console.log("add new tenant now");
  }

  closeModal() {
    this.activeModal.close();
  }
}
