import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './admin/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { authGuard } from './core/guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { DasbordComponent } from './admin/dasbord/dasbord.component';
import { adminGuard } from './core/guards/admin.guard';
import { CategoriesComponent } from './admin/categories/categories.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent, canActivate: [adminGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [adminGuard] },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profil', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'dashbord', component: DasbordComponent, canActivate: [adminGuard] },
  { path: 'checkout', component: CheckoutComponent },
{ path: 'product-detail/:id', component: ProductDetailsComponent }

];
