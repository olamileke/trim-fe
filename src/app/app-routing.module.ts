import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [{ path:'', component:HomeComponent, canActivate:[GuestGuard] },
                        { path:'auth/:type', component:AuthComponent, canActivate:[GuestGuard] },
                        { path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard] }
						];	

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}