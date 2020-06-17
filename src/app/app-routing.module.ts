import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthHomeComponent } from './components/auth-home/auth-home.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { ErrorComponent } from './components/error/error.component';

import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [{ path:'', component:HomeComponent, canActivate:[GuestGuard] },
                        { path:'auth/:type', component:AuthComponent, canActivate:[GuestGuard] },
                        { path:'dashboard', component:AuthHomeComponent, canActivate:[AuthGuard] },
                        { path:':url', component:RedirectComponent },
                        { path:'error/:error_code', component:ErrorComponent},
                        { path:'account/activate/:token', component:AuthComponent},
                        { path:'**', component:ErrorComponent},
						];	

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}