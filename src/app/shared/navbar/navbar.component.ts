import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { RouterLink } from '@angular/router';
import { UtilsService } from '../../core/services/utils.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryServiceService } from '../../core/services/category.service.service';
import { Categorie } from '../../core/models/data';

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
  categories:Categorie[]=[];

  constructor(
    private cartService: CartService,
    public utilService : UtilsService,
    private categoryService:CategoryServiceService
  ) { }

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
      this.getCategories();
  }

   logout() {
    this.utilService.logout();
    // tu peux aussi rediriger vers l’accueil
    // this.router.navigate(['/']);
  }

  getCategories(){
    this.categoryService.all().subscribe((res)=>{
      this.categories=res.data.categories;
    })
  }
}
