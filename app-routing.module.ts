import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SalesComponent } from './sales/sales.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { BookstoreComponent } from './bookstore/bookstore.component';
import { AuthGuard } from './Auth-guards/auth-guards';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'Home',
    component: HomeComponent,
    children: [
      {
        path: 'sales',
        component: SalesComponent,
      },
      {
        path: 'purchase',
        component: PurchaseComponent,
      },
      {
        path: 'Bookstore',
        component: BookstoreComponent,
      },
      {
        path: 'Home',
        redirectTo: '/sales',
        pathMatch: 'full',
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
