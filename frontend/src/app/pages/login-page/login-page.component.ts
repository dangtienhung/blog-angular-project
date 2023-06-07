import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ILogin, IUser } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  constructor(
    private login: AuthService,
    private fb: FormBuilder,
    private direct: Router
  ) {}
  FormLogin = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/),
      ],
    ],
    password: ['', [Validators.required]],
  });

  get checkEmail() {
    return this.FormLogin.get('email') as FormControl;
  }

  get checkPassword() {
    return this.FormLogin.get('password') as FormControl;
  }

  onLogin() {
    const Login: ILogin = {
      email: this.FormLogin.value.email || '',
      password: this.FormLogin.value.password || '',
    };
    this.login
      .loginUser(Login)
      .pipe(
        catchError((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          });
          return throwError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        })
      )
      .subscribe((data) => {
        localStorage.setItem(
          this.login.TOKEN_KEY,
          JSON.stringify(data.accessToken)
        );
        // localStorage.setItem(
        //   this.login.TOKEN_KEY,
        //   JSON.stringify(data.accessToken)
        // );
        localStorage.setItem(this.login.TOKEN_USER, JSON.stringify(data.user));
        this.redirect(data.user);
      });
  }

  redirect(user: IUser) {
    if (user.role == 'user') {
      this.direct.navigateByUrl('');
    } else if (user.role == 'admin') {
      this.direct.navigateByUrl('/admin');
    }
  }
}
