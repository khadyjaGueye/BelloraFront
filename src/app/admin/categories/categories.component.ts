import { Component, OnInit } from '@angular/core';
import { Categorie } from '../../core/models/data';
import { CategoryServiceService } from '../../core/services/category.service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SkeletonComponent } from '../../shared/skeleton/skeleton.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from '../../core/services/loader.service';
import Swal from 'sweetalert2';
import { log } from 'console';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SkeletonComponent, NgxPaginationModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  categories: Categorie[] = [];
  page: number = 1; // page actuelle
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  form: FormGroup;
  editForm: FormGroup;
  isSubmitting: boolean = false;
  editSelectedFile: File | null = null;
  editPreviewUrl: string | ArrayBuffer | null = null;
  idCategory: number = 1;

  constructor(
    private categoryService: CategoryServiceService,
    public loaderService: LoaderService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      image: [null]
    });

    this.editForm = this.fb.group({
      name: [''],
      description: [''],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.loaderService.show();
    this.categoryService.all().subscribe({
      next: (res => {
        this.categories = res.data.categories;
        // console.log(this.categories);
        this.loaderService.hide();
      }), error: (err => {
        this.loaderService.hide();
      })
    })
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]; // objet File
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
    }
  }

  onEditFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.editSelectedFile = file;
      // Prévisualisation
      const reader = new FileReader();
      reader.onload = () => {
        this.editPreviewUrl = reader.result;
      };
      reader.readAsDataURL(file);
      // Mettre à jour le formGroup
      this.editForm.patchValue({ image: file });
    }
  }

  deletecategory(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action supprimera définitivement le categorie.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.delete(id).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Supprimé !',
              text: 'Le categorie a été supprimé avec succès.',
              confirmButtonText: 'OK'
            });
            //  Rafraîchir la liste après suppression
            this.getCategory();
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

  openModalcategory(id: number) {
    this.idCategory = id;
    this.categoryService.show(id).subscribe({
      next: (res) => {
        const category = res.data.category;
        this.editForm.patchValue(category);
      }
    });
  }

  showcategory(id: number) { }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true; // active le loader
      const formData = new FormData();
      formData.append('name', this.form.get('name')?.value);
      formData.append('description', this.form.get('description')?.value);

      const fileInput = this.form.get('image')?.value;
      if (fileInput instanceof File) {
        formData.append('image', fileInput); //  multer recevra bien le fichier
      }
      console.log(formData);

      this.categoryService.store(formData).subscribe({
        next: (resp) => {
          Swal.fire({
            icon: 'success',
            title: 'Enregistrement réussie',
            text: 'Votre enregistrement est réusie avec succès.',
            confirmButtonText: 'OK'
          });
          this.form.reset();
          this.getCategory();
          this.isSubmitting = false; // désactive le loader
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

  updateCategory() {
    const formData = new FormData();
    formData.append('name', this.editForm.value.name);
    formData.append('description', this.editForm.value.description);

    if (this.editSelectedFile) {
      formData.append('image', this.editSelectedFile);
    }
    this.categoryService.update(formData, this.idCategory).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Produit mis à jour',
          text: 'Les modifications ont été enregistrées.',
          confirmButtonText: 'OK'
        });

        this.getCategory(); // rafraîchir la liste
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
