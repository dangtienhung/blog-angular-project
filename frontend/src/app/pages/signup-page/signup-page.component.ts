import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/interfaces/User';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';
import { BaseRouteReuseStrategy, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
  selectedFile!: File;

  onFileSlected(e: any) {
    this.selectedFile = e.target.files[0];
  }

  constructor(
    private fb: FormBuilder,
    private signup: AuthService,
    private user: UserService,
    private http: HttpClient,
    private direct: Router
  ) {}
  SignUp = this.fb.group(
    {
      fullname: ['', [Validators.required, Validators.pattern(/^[\p{L} ]+$/u)]],
      file: [''],
      email: [
        '',
        [
          Validators.pattern(
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
          ),
        ],
      ],
      password: ['', [Validators.minLength(10)]],
      confirmpassword: ['', [Validators.required]],
    },
    { validator: this.passwordMatchValidator }
  );
  passwordMatchValidator(formGroup: AbstractControl) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmpassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const pressSignUp: IUser = {
      username: this.SignUp.value.fullname || '',
      password: this.SignUp.value.password || '',
      email: this.SignUp.value.email || '',
      confirmPassword: this.SignUp.value.confirmpassword || '',
    };

    this.signup
      .registerUser(pressSignUp)
      .pipe(
        catchError((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          });
          return throwError('Đã xảy ra lỗi');
        })
      )
      .subscribe((data) => {
        if (data.user.isVerified == false) {
          Swal.fire({
            title: 'Verify your email!',
            html: 'I will close in <b></b> milliseconds.',
            timer: 60000,
            showLoaderOnDeny: true,
            timerProgressBar: true,
            didOpen: () => {
              setInterval(() => {
                this.user.getUser(data.user._id!).subscribe((data) => {
                  console.log(data.user.isVerified);

                  if (data.user.isVerified) {
                    this.direct.navigateByUrl('/login');
                    Swal.close();
                    return;
                  }
                });
              }, 2000);
              Swal.showLoading();
            },
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              Swal.fire({
                icon: 'error',
                title: 'Vetify failed...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>',
              });
            }
          });
        }
      });
  }

  get checkName() {
    return this.SignUp.get('fullname') as FormControl;
  }

  get checkEmail() {
    return this.SignUp.get('email') as FormControl;
  }

  get checkPassowrd() {
    return this.SignUp.get('password') as FormControl;
  }

  get checkConfirmPassword() {
    return this.SignUp.get('confirmpassword') as FormControl;
  }
}
