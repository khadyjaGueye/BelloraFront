import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from '../products/products.component';
import { CustomersComponent } from '../customers/customers.component';
import { CategoriesComponent } from '../categories/categories.component';
import { OrdersComponent } from '../orders/orders.component';
import { StaticComponent } from '../static/static.component';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-dasbord',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ProductsComponent, CustomersComponent, CategoriesComponent, OrdersComponent, StaticComponent, UserComponent],
  templateUrl: './dasbord.component.html',
  styleUrl: './dasbord.component.css'
})
export class DasbordComponent {

  display: string = 'dashbord';
  sidebarOpen: boolean = false;

  constructor() { }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  displayDashbord(): void {
    this.display = 'dashbord';
    this.sidebarOpen =  false;
  }

  displayProducts(): void {
    this.display = 'product';
     this.sidebarOpen =  false;
  }

  displayCategory(): void {
    this.display = 'category';
     this.sidebarOpen =  false;
  }

  displayOrders(): void {
    this.display = 'order';
     this.sidebarOpen =  false;
  }

  displayCustomers(): void {
    this.display = 'customer';
     this.sidebarOpen =  false;
  }

  displayUser(): void {
    this.display = 'user';
     this.sidebarOpen =  false;
  }
}
