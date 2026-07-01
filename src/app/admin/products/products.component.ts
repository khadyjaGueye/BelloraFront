import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/models/product';
import { ProductServiceService } from '../../core/services/product.service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryServiceService } from '../../core/services/category.service.service';
import { Categorie } from '../../core/models/data';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  categories: Categorie[] = [];
  page: number = 1; // page actuelle
  form: FormGroup;
  editForm: FormGroup;
  idProduct: number = 1;
  product?: Product;

  constructor(
    private productService: ProductServiceService,
     private fb: FormBuilder,
      private categoryService: CategoryServiceService,
    ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      stock: [0, Validators.required],
      description: [''],
      category_id: ['', Validators.required],
      image: [null]
    });

    this.editForm = this.fb.group({
      name: [''],
      description: [''],
      price: [0],
      stock: [0],
      category_id: ['']
    });

  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories()
  }

  getProducts() {
    this.productService.all().subscribe(rep => {
      this.products = rep.data.products;
      //console.log(this.products);
    })
  }

  getCategories() {
    this.categoryService.all().subscribe(resp => {
      this.categories = resp.data.categories;
      // console.log(this.categories);

    })
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]; // ✅ objet File
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
    }
  }


  onSubmit() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('name', this.form.get('name')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('price', this.form.get('price')?.value);
      formData.append('stock', this.form.get('stock')?.value);
      formData.append('category_id', this.form.get('category_id')?.value);

      const fileInput = this.form.get('image')?.value;
      if (fileInput instanceof File) {
        formData.append('image', fileInput); // ✅ multer recevra bien le fichier
      }

      this.productService.store(formData).subscribe({
        next: (resp) => {
          Swal.fire({
            icon: 'success',
            title: 'Enregistrement réussie',
            text: 'Votre enregistrement est réusie avec succès.',
            confirmButtonText: 'OK'
          });
          this.form.reset();


          this.getProducts();
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
  }

  deleteProduct(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action supprimera définitivement le produit.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.delete(id).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Supprimé !',
              text: 'Le produit a été supprimé avec succès.',
              confirmButtonText: 'OK'
            });
            //  Rafraîchir la liste après suppression
            this.getProducts();
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
    });
  }

  showProduct(id: number) {
    this.idProduct = id;
    this.productService.show(id).subscribe({
      next: (res) => {
        this.product = res.data.product;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de connexion',
          text: err.error?.data?.message || 'Une erreur est survenue.',
          confirmButtonText: 'OK'
        });
      }
    })
  }

  openModalProduct(id: number) {
    this.idProduct = id;
    this.productService.show(id).subscribe({
      next: (res) => {
        const product = res.data.product;
        this.editForm.patchValue(product);

      }
    });
  }

 updateProduct() {
    this.productService.update(this.editForm.value,this.idProduct).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Produit mis à jour',
          text: 'Les modifications ont été enregistrées.',
          confirmButtonText: 'OK'
        });
       
        this.getProducts(); // rafraîchir la liste
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: err.error?.data?.message || 'Une erreur est survenue.',
          confirmButtonText: 'OK'
        });
      }
    });
  }

}
