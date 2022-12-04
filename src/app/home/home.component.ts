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
  subExpModal;
  paymentModal;
  trialSuccessSwalVisible = false;
  subscribeSwalVisible = false;
  requestSendSwalVisible = false;
  requestFailedSwalVisible = false;
  trialUser = false;
  trialTaken = false;
  mode: 'c' | 'a' = 'c';
  closedBids: number = 0;
  openBids: number = 0;
  footer: any;
  userCategoryFilter: any;
  expiryPopupShown: boolean = false
  @ViewChild(PaginationComponent)
  pagination: PaginationComponent;
  endDate: any[];

  constructor(private tenderService: TenderService, private router: Router) {    
  }

  ngOnInit(): void {
    document.querySelector('html').style.height = '';
    document.querySelector('body').style.height = '';
    this.footer = document.querySelector('div.footer');
    let user = localStorage.getItem('user-hal-tender');
    this.setCounts();
    if (!user) {
      this.router.navigate(['/login']);
    } else {
      this.handleUser(JSON.parse(user));      
    }

    const modalEl = document.querySelector('#trialModal');
    this.trialModal = bootstrap.Modal.getOrCreateInstance(modalEl, {});

    const paymentModalEl = document.querySelector('#paymentModal');
    this.paymentModal = bootstrap.Modal.getOrCreateInstance(paymentModalEl, {});

    this.tenderService.showPopup.subscribe( (show) => {
      if (show && this.trialModal._isShown === false) {
        this.trialModal.show();
      }
      if (!show && this.trialModal._isShown) {
        this.trialModal.hide();
      }
    });

    this.tenderService.showPaymentPopup.subscribe( (show) => {
      if (show && this.paymentModal._isShown === false) {
        this.paymentModal.show();
      }
      if (!show && this.paymentModal._isShown) {
        this.paymentModal.hide();
      }
    });

    const modal = document.querySelector('#SubExpireModal');
    this.subExpModal = bootstrap.Modal.getOrCreateInstance(modal, {});

    this.tenderService.authEvent.subscribe( (user) => {
        this.handleUser(user);
    });    
    
  }

  getEndDate() {
    if (this.endDate) {
      return `${this.endDate[2]}/${this.endDate[1]}/${this.endDate[0]}`;
    } else {
      return '';
    }
  }

  async setCounts(): Promise<void>{
    const counts = await this.tenderService.getTenderCounts();
    this.closedBids = counts[counts.length - 1 ].closedBids;
    this.openBids =  counts[counts.length - 2 ].openBids;
  }

  async handleUser(user): Promise<void> {
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
      const userCategories = await this.tenderService.getUserCategories();
      if ((userCategories && userCategories.length == 1)) {
        if (!userCategories[0].categories || userCategories[0].categories.indexOf('All') > -1){
          this.userCategoryFilter = '';
        } else {
          this.userCategoryFilter = '';
          this.userCategoryFilter = userCategories[0].categories;                
        }      
        if (!this.expiryPopupShown && userCategories[0].endDate) {
          const currentDate = new Date();
          this.endDate = userCategories[0].endDate.split('-');
          const date = new Date(userCategories[0].endDate);
          date.setDate(date.getDate() - 7);
          if (currentDate > date) {
            this.subExpModal.show();
          }
          this.expiryPopupShown = true;
        }     
      }
      this.loadTenders(this.page); 

      if (user.username === 'admin') {
        this.loadTenders(this.page); 
      }
    }    
    
  }

  closeModal(): void {
    this.trialModal.hide();
    // document.querySelectorAll('.modal-backdrop').forEach( (el) => {
    //     el.remove();
    // });
    // if (document.querySelector('.modal-backdrop')) {
    //   document.querySelector('.modal-backdrop').remove();
    // }
    
  }

  closeModalPayment(): void {
    this.paymentModal.hide();
    // document.querySelectorAll('.modal-backdrop').forEach( (el) => {
    //     el.remove();
    // });
    // if (document.querySelector('.modal-backdrop')) {
    //   document.querySelector('.modal-backdrop').remove();
    // }
    
  }

  closeModalSubExp(): void {
    this.subExpModal.hide();
    // document.querySelectorAll('.modal-backdrop').forEach( (el) => {
    //     el.remove();
    // });
    // if (document.querySelector('.modal-backdrop')) {
    //   document.querySelector('.modal-backdrop').remove();
    // }
    
  }

  async loadTenders(page): Promise<void> {
      this.loading = true;
      this.footer.style.display = 'none';
      this.filter['mode'] = this.mode;
      if (this.userCategoryFilter) {
        this.userCategoryFilter = this.userCategoryFilter.replace(/@/g, ',');
        if (this.userCategoryFilter.slice(-1) !== ',') {
          this.userCategoryFilter += ','
        }        
      }
      const response = await this.tenderService.getTenders(page,  this.filter, this.userCategoryFilter);
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
      this.footer.style.display = '';
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
    } else {
      this.loadTenders(this.page);
    }
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
