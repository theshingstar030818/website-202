import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./add-tenant-modal.component.scss')],
  templateUrl: './add-tenant-modal.component.html'
})

export class AddTenantModal implements OnInit {

  modalHeader: string;
  modalContent: string = ``;
  isRemember: boolean = false;

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {}

  closeModal() {
    this.activeModal.close();
  }
}
