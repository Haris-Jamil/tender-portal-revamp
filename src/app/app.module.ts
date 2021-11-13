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
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppliedFilterComponent } from './applied-filter/applied-filter.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:message', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'dashboard', component: UserManagerComponent }
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
    DetailComponent,
    LoginComponent,
    RegisterComponent,
    AppliedFilterComponent,
    UserManagerComponent,
    LandingComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      {onSameUrlNavigation: 'reload'}
    ),
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],  
})
export class AppModule { }
