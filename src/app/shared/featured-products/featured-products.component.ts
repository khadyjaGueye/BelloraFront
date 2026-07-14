import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/models/product';
import { ProductServiceService } from '../../core/services/product.service.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { LoaderService } from '../../core/services/loader.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css'
})
export class FeaturedProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductServiceService, private cartService: CartService, public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.loaderService.show();
    this.productService.all().subscribe({
      next: (res: any) => {
        this.products = res.data.products;
        this.loaderService.hide();
      },
      error: () => {
        this.loaderService.hide();
      }
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

}
