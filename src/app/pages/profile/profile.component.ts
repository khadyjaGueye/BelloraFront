import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../core/services/user.service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenService } from '../../core/services/token.service';
import { catchError, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { log } from 'console';
import { environment } from '../../../environments/environment.development';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  selectedFile: File | null = null;
  preview: string | ArrayBuffer | null = null;
  user: any;
  showPassword: boolean = false;

  constructor(private userService: UserServiceService, private fb: FormBuilder, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      phone: [''],
      address: [''],
      email: [''],
    });

    this.passwordForm = this.fb.group({
      old_password: [''],
      new_password: [''],
      confirm_password: ['']
    });

    this.getCurrentUser();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  getCurrentUser() {
    this.tokenService.getCurrentUser().subscribe({
      next: (res) => {
        this.user = res.data.user;

        // PatchValue pour remplir le formulaire
        this.profileForm.patchValue({
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          phone: this.user.phone,
          address: this.user.address,
          email: this.user.email,
        });
        // Si tu veux afficher l'image existante
        if (this.user.image) {
          this.preview = `${environment.apiUrlNode}/uploads/users/${this.user.image}`;
        }
      },
      error: (err) => {
        console.error('Erreur récupération utilisateur', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur de connexion',
          text: err.error?.data?.message || 'Une erreur est survenue.',
          confirmButtonText: 'OK'
        });
      }
    });
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = e => this.preview = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    Object.keys(this.profileForm.controls).forEach(key => {
      formData.append(key, this.profileForm.get(key)?.value || '');
    });
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.userService.update(formData).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Enregistrement réussie',
          text: 'Votre enregistrement est réusie avec succès.',
          confirmButtonText: 'OK'
        });
      },
      error: (err) => {
        console.error('Erreur inscription', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur de connexion',
          text: err.error?.data?.message || 'Une erreur est survenue.',
          confirmButtonText: 'OK'
        });
      }
    });
  }


  onChangePassword(): void {
    if (this.passwordForm.valid) {
      const formData = new FormData();
      formData.append('old_password', this.passwordForm.get('old_password')?.value);
      formData.append('new_password', this.passwordForm.get('new_password')?.value);

      this.userService.update(formData).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Modification réussie',
            text: 'Mot de passe changé avec succès.',
            confirmButtonText: 'OK'
          });
          this.passwordForm.reset();
        },
        error: (err) => {
          console.error('Erreur inscription', err);
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
}
