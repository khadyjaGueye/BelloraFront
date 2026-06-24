import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartItem } from '../../core/models/data';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  products: Product[] = [];
  items: CartItem[] = [];
  total = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.items =
      this.cartService.getItems();

    this.calculateTotal();
  }

  calculateTotal() {
    this.total =
      this.items.reduce(
        (sum, item) =>
          sum +
          (Number(item.product.price)
            * item.quantity),
        0
      );
  }

  remove(item: CartItem) {
    this.cartService.remove(item.product.id);
    this.items = this.cartService.getItems();
    this.calculateTotal();
  }

  increase(item: CartItem) {
    this.cartService.increaseQuantity(
      item.product.id
    );
    this.calculateTotal();
  }

  decrease(item: CartItem) {
    this.cartService.decreaseQuantity(item.product.id);
    this.calculateTotal();
  }

}
