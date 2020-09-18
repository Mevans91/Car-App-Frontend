import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'vehicles',
    component: VehicleListComponent
  },
  {
    path: 'vehicle/:id',
    component: VehiclesComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
