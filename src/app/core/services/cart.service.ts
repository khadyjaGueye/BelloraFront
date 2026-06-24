import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';
import { CartItem } from '../models/data';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: CartItem[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  addToCart(product: Product) {
    const item = this.items.find(
      x => x.product.id === product.id
    );
    if (item) {
      item.quantity++;
    } else {
      this.items.push({
        product,
        quantity: 1
      });

    }
    this.updateCount();
  }

  getItems(): CartItem[] {
    return this.items;
  }

  increaseQuantity(id: number) {
    const item = this.items.find(
      x => x.product.id === id
    );
    if (item) {
      item.quantity++;
    }
    this.updateCount();
  }

  decreaseQuantity(id: number) {
    const item = this.items.find(
      x => x.product.id === id
    );
    if (item && item.quantity > 1) {
      item.quantity--;
    }
    this.updateCount();
  }

  remove(id: number) {
    this.items =
      this.items.filter(
        x => x.product.id !== id
      );

    this.updateCount();
  }

  private updateCount() {
    const count =
      this.items.reduce(
        (sum, item) =>
          sum + item.quantity,
        0
      );
    this.cartCount.next(count);
  }

  clearCart() {
  this.items = [];
  this.updateCount(); // remet le compteur à 0
}


}