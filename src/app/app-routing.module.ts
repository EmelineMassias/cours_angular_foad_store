import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import {authGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'produits' },
  { path: 'produits', canActivate: [authGuard], component: ProductsComponent },
  { path: 'connexion', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
