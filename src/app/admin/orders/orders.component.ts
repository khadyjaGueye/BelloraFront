import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { Order } from '../../core/models/data';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  selectedOrder: any = { status: 'en_attente', items: [] };

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.ordersService.all().subscribe({
      next: (data) => this.orders = data.data.orders,
      error: (err) => console.error(err)
    });
  }

  viewDetails(order: any) {
    this.selectedOrder = order;
  }

  updateStatus(order: any) {
    const status = { status: order.status }
    console.log(status);

    this.ordersService.update(status, order.id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Update réussie',
          text: 'Statut mis à jour avec succès.',
          confirmButtonText: 'OK'
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de connexion',
          text: err.error?.data?.message || 'Une erreur est survenue.',
          confirmButtonText: 'OK'
        });
      }
    });
  }

 getStatusBadge(status: string) {
  switch (status) {
    case 'en_attente': return { color: 'bg-secondary', icon: 'bi bi-hourglass-split' };
    case 'confirmee': return { color: 'bg-primary', icon: 'bi bi-check-circle' };
    case 'livree': return { color: 'bg-success', icon: 'bi bi-truck' };
    case 'annulee': return { color: 'bg-danger', icon: 'bi bi-x-circle' };
    default: return { color: 'bg-dark', icon: 'bi bi-question-circle' };
  }
}


}
