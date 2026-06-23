import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { BannerComponent } from '../../shared/banner/banner.component';

import { PromoBannerComponent } from '../../shared/promo-banner/promo-banner.component';
import { FeaturedProductsComponent } from '../../shared/featured-products/featured-products.component';
import { CategoriesComponent } from '../../shared/categories/categories.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,BannerComponent,CategoriesComponent,PromoBannerComponent,FeaturedProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
