import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { log } from 'console';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  showPassword: boolean = false;

  form = this.fb.group({
    first_name: ['', Validators.required],
    lastname: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]], // 8 à 15 chiffres
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form);

      this.authService.register(this.form.value).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Inscription réussie',
            text: 'Votre inscription a été enregistrée avec succès.',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/']);
          });

        },
        error: (err) => {
          console.error('Erreur inscription', err);
          Swal.fire({
            icon: 'error',
            title: 'Erreur inscription',
            text: err.error?.data?.message || 'Une erreur est survenue.',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  }

}
