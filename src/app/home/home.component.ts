import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tender } from '../models/Tender';
import { TenderService } from '../tender.service';

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

  constructor(private tenderService: TenderService, private router: Router) {    
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/login']);
    } else {
      this.loadTenders(this.page);    
    }

    this.tenderService.authEvent.subscribe( (user) => {
      if (user) {
        this.showTabs = user.type == 0 ? true : false; // only show tabs to admin user
      }
    });
  }

  async loadTenders(page): Promise<void> {
      this.loading = true;
      this.tenders = await this.tenderService.getTenders(page,  this.filter);
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
    this.loadTenders(this.page);
  }

  gotoPage(page): void {
    this.page = page;
    this.loadTenders(this.page);
  }

  reload(): void {
   this.loadTenders(this.page);
  }
  
}
