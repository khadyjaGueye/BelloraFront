import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  showPassword: boolean = false;
  isLoading: boolean = false;
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.form.valid) {
      //console.log(this.form);
      this.isLoading = true;
      this.authService.login(this.form.value).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.data.token);
          this.isLoading = false
          if (res.data.user.role === "admin") {
            this.router.navigate(['/dashbord']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          // console.error('Erreur inscription', err);
          this.isLoading = false;
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
