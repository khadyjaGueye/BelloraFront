import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/models/product';
import { ProductServiceService } from '../../core/services/product.service.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css'
})
export class FeaturedProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductServiceService, private cartService: CartService) { }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.productService.all().subscribe(rep => {
      this.products = rep.data.products;
     // console.log(this.products);

    })
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

}
