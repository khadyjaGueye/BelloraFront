import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  cartCount = 0;
  animate = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartCount$
      .subscribe(count => {
        this.cartCount = count;

         // ✅ déclenche une animation quand le panier est vidé
        if (count === 0) {
          this.animate = true;
          setTimeout(() => this.animate = false, 500);
        }
      });
  }

}
