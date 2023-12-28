import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarFormComponent } from './car-form/car-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: CarFormComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
