import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CreateLineComponent } from './create-line/create-line.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { ReservationComponent } from './reservation/reservation.component'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ScheduleComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    UpdateUserComponent,
    CreateLineComponent,
    AddScheduleComponent,
    ReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
    {path:'', component:HomeComponent},
    {path:'schedule', component:ScheduleComponent},
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'user-list', component:UserListComponent},
    {path:'update-user/:id', component:UpdateUserComponent},
    {path:'create-line', component:CreateLineComponent},
    {path:'add-schedule', component:AddScheduleComponent},
    {path:'reservation', component:ReservationComponent}

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
