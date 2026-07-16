import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../../core/models/product';
import { ProductServiceService } from '../../core/services/product.service.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { LoaderService } from '../../core/services/loader.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css',
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('clickAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0.95)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})
export class FeaturedProductsComponent implements OnChanges {

  products: Product[] = [];
  @Input() categoryId: number | null = null;
  noProducts = false;

  constructor(
    private productService: ProductServiceService,
    private cartService: CartService,
    public loaderService: LoaderService
  ) { }

  // ngOnInit(): void {
  //   this.get();
  // }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryId'] && this.categoryId) {
      this.getByCategory(this.categoryId);
    }
  }

  animateProduct(product: Product) {
    // Exemple : log ou effet supplémentaire
    console.log('Produit cliqué:', product);
    // Tu peux aussi déclencher un scroll vers la section détail
    document.querySelector('.featured-section')?.scrollIntoView({ behavior: 'smooth' });
  }


  getByCategory(id: number) {
    this.loaderService.show();
    console.log(id);
    this.productService.getByCategory(id).subscribe({
      next: (res: any) => {
        this.products = res.data.products;
        this.noProducts = this.products.length === 0;
        this.loaderService.hide();
      },
      error: () => {
        this.loaderService.hide();
        this.noProducts = true;
      }
    });
  }
  // get() {
  //   this.loaderService.show();
  //   this.productService.all().subscribe({
  //     next: (res: any) => {
  //       this.products = res.data.products;
  //       this.loaderService.hide();
  //     },
  //     error: () => {
  //       this.loaderService.hide();
  //     }
  //   });
  // }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

}
