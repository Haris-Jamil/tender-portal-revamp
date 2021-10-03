import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TenderService } from '../tender.service';
import { Tender } from '../models/Tender';
import { faFile } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  tender: any;
  faFile = faFile;
  status: string;
  fileBaseUrl = 'http://tii-usa.com/tender-tracker-new/files'

  constructor(private route: ActivatedRoute, private tenderService: TenderService) { }

  ngOnInit(): void {
      this.route.paramMap.subscribe( (data: any) => {
        this.getTender(data.params.id);
      });      
  }

  async getTender(id): Promise<void> {
    const data: Tender = await this.tenderService.getTenderById(id);
    this.tender = data[0];
    this.setStatus();
  }

  setStatus(): void {
    if (this.tender.closingDate) {
      const dateParts = this.tender.closingDate.split('-');
      const day = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]);
      const year = parseInt(dateParts[2]);
      const closingDate = new Date(year, month-1, day);

      const currentDate = new Date();

      if (closingDate < currentDate) {
        this.status = "closed";
      } else {
        this.status = "open"
      }
    }
  }

  extractFileName(fileName): string {
    let  file = fileName.substring(fileName.lastIndexOf('/')+1);
    return file.replace(/[-\d*]/g, '');
  }

  makeFileLink(fileUrl: string): string {
    let  file = fileUrl.substring(fileUrl.lastIndexOf('/')+1);
    return this.fileBaseUrl + '/' + file;
  }

}
