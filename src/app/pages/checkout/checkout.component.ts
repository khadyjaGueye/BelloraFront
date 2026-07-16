import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckoutService } from '../../core/services/checkout.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UtilsService } from '../../core/services/utils.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent implements OnInit {

  total = 0;
  items: any[] = [];
  islording: boolean = false;
  form: FormGroup = new FormGroup({
    customer_name: new FormControl(''),
    customer_phone: new FormControl(''),
    customer_address: new FormControl(''),
    note: new FormControl('')
  });

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router,
    private utilService: UtilsService
  ) { }

  ngOnInit(): void {

    this.items = this.cartService.getItems();
    this.total = this.items.reduce(
      (sum, item) =>
        sum +
        (item.product.price * item.quantity),
      0
    );

  }

  onSubmit() {
    const payload = {
      customer_name: this.form.value.customer_name,
      customer_phone: this.form.value.customer_phone,
      customer_address: this.form.value.customer_address,
      note: this.form.value.note,
      total_amount: this.total,
      items:
        this.items.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        }))
    };
    this.islording = true;
    //console.log(payload);
    this.checkoutService.store(payload).subscribe({
      next: (response: any) => {
        this.islording = false;
        Swal.fire({
          icon: 'success',
          title: 'Commande validée',
          text: 'Votre commande a été enregistrée avec succès.',
          confirmButtonText: 'OK'
        });
        this.cartService.clearCart();
        this.router.navigate(['/']);
      },

      error: (error) => {
        this.islording = false;
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          // text: 'Impossible d’enregistrer la commande.'
          text: error.error?.data?.message || 'Une erreur est survenue.',
        });
      }
    });
  }

}


