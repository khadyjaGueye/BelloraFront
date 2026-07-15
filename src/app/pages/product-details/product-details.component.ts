import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../../core/services/product.service.service';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { Product } from '../../core/models/product';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',

  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  categoryId!: number;
  loading = false;
  products: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductServiceService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = Number(params.get('id'));
      this.getByCategory(); // recharge les produits à chaque changement d'id
    });
  }

  getByCategory() {
    this.loading = true; // active le loader
    this.productService.getByCategory(this.categoryId).subscribe({
      next: (res: any) => {
        this.products = res.data.products;
        this.loading = false; // désactive le loader
      },
      error: (err) => {
        console.error(err);
        this.loading = false; // désactive même en cas d'erreur
      }
    });
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
