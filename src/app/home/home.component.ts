import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Tender } from '../models/Tender';
import { TenderService } from '../tender.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { PaginationComponent } from '../pagination/pagination.component';

declare const bootstrap;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'tender-portal-revamp';
  tenders: any[] = [];
  page = 1;
  selectedTender: Tender = null;
  filter = {};
  showTabs: boolean = false;
  loading: boolean = false;
  trialModal;
  trialSuccessSwalVisible = false;
  subscribeSwalVisible = false;
  requestSendSwalVisible = false;
  requestFailedSwalVisible = false;
  trialUser = false;
  trialTaken = false;
  mode: 'c' | 'a' = 'c';

  @ViewChild(PaginationComponent)
  pagination: PaginationComponent;

  constructor(private tenderService: TenderService, private router: Router) {    
  }

  ngOnInit(): void {
    document.querySelector('html').style.height = '';
    document.querySelector('body').style.height = '';
    let user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/login']);
    } else {
      this.handleUser(JSON.parse(user));
      this.loadTenders(this.page);    
    }

    const modalEl = document.querySelector('#trialModal');
    this.trialModal = bootstrap.Modal.getOrCreateInstance(modalEl, {});

    this.tenderService.showPopup.subscribe( (show) => {
      if (show) {
        this.trialModal.show();
      }
    });

    this.tenderService.authEvent.subscribe( (user) => {
        this.handleUser(user);
    });    
  }

  handleUser(user): void {
    if (user) {
      this.showTabs = user.type == 0 ? true : false; // only show tabs to admin user
      if (user.type == 1) {
          if ( user.trialTaken == 1) {
            this.trialTaken = true;
          }
          setTimeout( () => {
            this.trialModal.show();
          }, 1000 * 5);            
      }
      if (user.type  == 2) {
          this.trialUser = true;
      }      
    }
  }

  closeModal(): void {
    this.trialModal.hide();
    document.querySelectorAll('.modal-backdrop').forEach( (el) => {
        el.remove();
    });
    if (document.querySelector('.modal-backdrop')) {
      document.querySelector('.modal-backdrop').remove();
    }
    
  }

  async loadTenders(page): Promise<void> {
      this.loading = true;
      this.filter['mode'] = this.mode;      
      const response = await this.tenderService.getTenders(page,  this.filter);
      if (response && response.message == 'trial expired') {
        await this.tenderService.logout()
        this.router.navigate(['/login', 'trial period expired, Please login again to continue']);
      } else if (response && response.message == 'subscription expired') {
        await this.tenderService.logout()
        this.router.navigate(['/login', 'subscription expired, Please login again to continue']);
      } else {
        this.tenders = response;
      }
      this.loading = false;
  }

  openTab(): void {
    this.selectedTender = null
    document.getElementById('edit-tab').classList.add('disabled');
  }

  selectForEdit(tender): void {
    if (tender) {
      const editTab = document.getElementById('edit-tab');      
      editTab.classList.remove('disabled');
      editTab.click();
      this.selectedTender = tender;      
    }  
  }

  async deleteTender(id): Promise<void> {
    console.log('id', id)
    const response = await this.tenderService.deleteTenderById(id);
    if (response === 1) {
      this.loadTenders(this.page);
    }
  }

  applyFilter(filter): void {
    this.filter = filter;
    this.page = 1;
    if (this.pagination) {
      this.pagination.reset();
    }
    this.loadTenders(this.page);
  }

  gotoPage(page): void {
    this.page = page;
    this.loadTenders(this.page);
  }

  reload(): void {
   this.loadTenders(this.page);
  }

  async activateTrial(): Promise<void> {
    const response = await this.tenderService.activateTrial();
    if (response === 1) {
        this.closeModal();
        this.trialSuccessSwalVisible = true;
    }
  }

  async trialSuccessPopupClosed(): Promise<any> {
    this.trialSuccessSwalVisible = false;    
    await this.tenderService.logout()
    this.router.navigate(['/login', 'Trial activated please login to continue']);
  }

  showSubConfirm(): void {
      this.subscribeSwalVisible = true;
  }

  async sendSubRequest(): Promise<any> {
      const response = await this.tenderService.sendSubRequest();            
      if (response === 1) {
        this.closeModal();
        this.subscribeSwalVisible = false;        
        this.requestSendSwalVisible = true;
      } else {
        this.subscribeSwalVisible = false;
        this.requestFailedSwalVisible = true;
      }
  }

  changeMode(mode: 'c' | 'a'): void {
    this.mode = mode;
    this.page = 1;
    if (this.pagination) {
      this.pagination.reset();
    }
    this.loadTenders(this.page);  
  }
 
}
