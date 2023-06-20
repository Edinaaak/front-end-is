import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { AdminGuardService } from './admin-guard.service';
import { CreateLineComponent } from './create-line/create-line.component';
import { TravelComponent } from './travel/travel.component';
import { UserListComponent } from './user-list/user-list.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { LoginGuardService } from './login-guard.service';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ReservationComponent } from './reservation/reservation.component';
import { DetailsTravelComponent } from './details-travel/details-travel.component';
import { ProfileComponent } from './profile/profile.component';
import { BusesListComponent } from './buses-list/buses-list.component';
import { UpdateScheduleComponent } from './update-schedule/update-schedule.component';
import { UpdateTravelComponent } from './update-travel/update-travel.component';
import { DriverGuardService } from './driver-guard.service';
import { ClerksService } from './clerks.service';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
    canActivate :[AuthGuardService]
  },
  {
    path:'register',
    component:RegisterComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'forgot-password',
    component:ForgotPasswordComponent,
    canActivate : [AuthGuardService]
  },
  {
    path:'change-password',
    component:ChangePasswordComponent,
    canActivate:[AuthGuardService]
  },
  {
    path : 'add-schedule',
    component:AddScheduleComponent,
    canActivate : [AdminGuardService]
  },
  {
    path:'create-line',
    component : CreateLineComponent,
    canActivate : [AdminGuardService]
  },
  {
    path: 'travel',
    component : TravelComponent,
    canActivate : [AdminGuardService]
  },
  {
    path:'user-list',
    component : UserListComponent,
    canActivate : [AdminGuardService]
  },
  {
    path:'user-list',
    component:UserListComponent,
    canActivate :[LoginGuardService]
  },
  {
    path:'create-line',
    component:CreateLineComponent,
    canActivate :[LoginGuardService]
  },
  {
    path:'add-schedule',
    component:AddScheduleComponent,
    canActivate :[LoginGuardService]
  },
  {
    path:'reservation',
    component:ReservationComponent,
    canActivate :[LoginGuardService]
  },
  {
    path:'travel',
    component:TravelComponent,
    canActivate :[LoginGuardService]
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate :[LoginGuardService]
  },
  {
    path:'buses-list',
    component:BusesListComponent,
    canActivate :[LoginGuardService]
  },
  {
    path:'update-schedule/:id',
    component:UpdateScheduleComponent,
    canActivate :[LoginGuardService]
  },
  {
    path:'update-travel/:id',
    component:UpdateTravelComponent,
    canActivate :[LoginGuardService]
  },
  {
    path:'travel-details/:id',
    component:DetailsTravelComponent,
    canActivate :[LoginGuardService]
  },
  {
    path:'schedule',
    component:ScheduleComponent,
    canActivate : [DriverGuardService]
  },
  {
    path:'buses-list',
    component:BusesListComponent,
    canActivate : [DriverGuardService]
  },
  {
    path:'travel-details/:id',
    component:DetailsTravelComponent,
    canActivate : [ClerksService]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
