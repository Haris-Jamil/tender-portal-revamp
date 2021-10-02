import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './filter/filter.component';
import { TenderListItemComponent } from './tender-list-item/tender-list-item.component';
import { AddTenderComponent } from './add-tender/add-tender.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterComponent,
    TenderListItemComponent,
    AddTenderComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
