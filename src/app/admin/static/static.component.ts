import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { UserServiceService } from '../../core/services/user.service.service';
import { ProductServiceService } from '../../core/services/product.service.service';
import { CategoryServiceService } from '../../core/services/category.service.service';

@Component({
  selector: 'app-static',
  standalone: true,
  imports: [],
  templateUrl: './static.component.html',
  styleUrl: './static.component.css'
})
export class StaticComponent implements OnInit {

  nbreProduct: number = 0;
  nbreOrder: number = 0;
  nbreUser: number = 0;
  nbreProdctStatu: number = 0;
  nbreClient: number = 0;

  constructor(
    private orderService: OrdersService,
    private userService: UserServiceService,
    private productService: ProductServiceService,
    private categoryService: CategoryServiceService,
  ) { }

  ngOnInit(): void {
    this.getCountProducts();
    this.getClientCount();
    this.getOrderCount();
  }

  animateCounter(target: number, property: keyof StaticComponent, duration: number = 1000) {
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / target));
    const timer = setInterval(() => {
      start++;
      (this as any)[property] = start;
      if (start >= target) {
        clearInterval(timer);
      }
    }, stepTime);
  }

  getCountProducts() {
    this.productService.getCountProducts().subscribe({
      next: (res: any) => {
        const total = res.data.total;
        this.animateCounter(total, 'nbreProduct', 1500);
      }
    });
  }

  getOrderCount() {
    this.orderService.getOrderCount().subscribe({
      next: (res: any) => {
        const total = res.data.total;
        this.animateCounter(total, 'nbreOrder', 1500);
      }
    });
  }

  getClientCount() {
    this.orderService.getClientCount().subscribe({
      next: (res: any) => {
        const total = res.data.total;
        this.animateCounter(total, 'nbreClient', 1500);
      }
    });
  }


}
