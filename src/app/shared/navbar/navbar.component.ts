import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { RouterLink } from '@angular/router';
import { UtilsService } from '../../core/services/utils.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  cartCount = 0;
  animate = false;

  constructor(private cartService: CartService,public utilService : UtilsService) { }

  ngOnInit(): void {
    this.cartService.cartCount$
      .subscribe(count => {
        this.cartCount = count;

         // déclenche une animation quand le panier est vidé
        if (count === 0) {
          this.animate = true;
          setTimeout(() => this.animate = false, 500);
        }
      });
  }

   logout() {
    this.utilService.logout();
    // tu peux aussi rediriger vers l’accueil
    // this.router.navigate(['/']);
  }

}
