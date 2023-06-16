import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { userReducer } from './store/reducers/user.reducer';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CreateLineComponent } from './create-line/create-line.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { ReservationComponent } from './reservation/reservation.component';
import { TravelComponent } from './travel/travel.component';
import { DetailsTravelComponent } from './details-travel/details-travel.component'

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
    ReservationComponent,
    TravelComponent,
    DetailsTravelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({user : userReducer}),
    RouterModule.forRoot([
    {path:'', component:HomeComponent},
    {path:'schedule', component:ScheduleComponent},
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'user-list', component:UserListComponent},
    {path:'update-user/:id', component:UpdateUserComponent},
    {path:'create-line', component:CreateLineComponent},
    {path:'add-schedule', component:AddScheduleComponent},
    {path:'reservation', component:ReservationComponent},
    {path:'travel', component:TravelComponent},
    {path:'travel-details/:id', component:DetailsTravelComponent}

    ])
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
