import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ServiceComponent } from './service/service.component';



const routes: Routes = [
   {
     path: '',
     redirectTo: 'home',
     pathMatch: 'full'
   },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'inventory',
    component: VehicleListComponent,
    pathMatch: 'full'
  },
  {
    path: 'vehicle/:id',
    component: VehiclesComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
    pathMatch: 'full'
  },
  {
    path: 'service',
    component: ServiceComponent,
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
