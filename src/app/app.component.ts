import { Component, OnInit } from '@angular/core';
import { Tender } from './models/Tender';
import { TenderService } from './tender.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tender-portal-revamp';
  tenders: any[] = [];
  page = 1;
  selectedTender: Tender = null;

  constructor(private tenderService: TenderService) {
    
  }

  ngOnInit(): void {
    this.loadVendors(this.page);
  }

  async loadVendors(page): Promise<void> {
      const fetchedTenders: any[] = await this.tenderService.getVendors(page);
      this.tenders = [...this.tenders, ...fetchedTenders];
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

}
