import { Component, OnInit } from '@angular/core';
import { Categorie } from '../../core/models/data';
import { CategoryServiceService } from '../../core/services/category.service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  categories: Categorie[] = []

  constructor(private categoryService:CategoryServiceService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.all().subscribe((res)=>{
      this.categories =res.data.categories;
    })
  }

}
