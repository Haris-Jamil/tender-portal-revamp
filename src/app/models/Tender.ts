export class Tender {
    uploadedDate: Date;
    tenderNo: string;
    title: string;
    feeCash: string;
    feePay: string;
    availability: string;
    amount: string;
    method: string;
    location: string;
    publishedDate: Date;
    docDeadline: Date;
    closingDate: Date;
    bidSecurity: string;
    tenderLink: string;
    tenderLink2: string;
    nature: string;
    operator: string;
    quotes: string;
    code: string;
    category: string;
  
    constructor() {
      this.uploadedDate = null;
      this.tenderNo = '';
      this.title = '';
      this.feeCash= '';
      this.feePay= '';
      this.availability = '';
      this.amount = '';
      this.method = '';
      this.location= '';
      this.publishedDate = null;
      this.docDeadline = null;
      this.closingDate =null;
      this.bidSecurity= '';
      this.tenderLink= '';
      this.tenderLink2 = '';
      this.nature= '';
      this.operator = '';
      this.quotes = '';
      this.code = 'OGDCL';
      this.category = 'HVAC'
    }
  }