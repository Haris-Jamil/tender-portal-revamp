import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './filter/filter.component';
import { TenderListItemComponent } from './tender-list-item/tender-list-item.component';
import { AddTenderComponent } from './add-tender/add-tender.component';
import { PaginationComponent } from './pagination/pagination.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'detail/:id', component: DetailComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterComponent,
    TenderListItemComponent,
    AddTenderComponent,
    PaginationComponent,
    HomeComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent],  
})
export class AppModule { }
