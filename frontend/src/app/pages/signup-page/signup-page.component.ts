import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IUserRegister } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
  constructor(
    private authService: AuthService,
    private formSignup: FormBuilder,
    private router: Router
  ) {
    this.formSignup.group({});
  }

  signUpForm = this.formSignup.group(
    {
<<<<<<< HEAD
      fullname: ['', [Validators.required, Validators.pattern(/^[\p{L} ]+$/u)]],
      file: [''],
      email: [
        '',
        [
          // Validators.required,
          Validators.pattern(
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
          ),
        ],
      ],
      password: ['', [Validators.minLength(10)]],
      confirmpassword: ['', [Validators.required]],
=======
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
>>>>>>> 5c681f5e10a1d0aa687939d396ec386ca1ed75a7
    },
    {
      validators: this.checkPasswords,
    }
  );

  get f() {
    return this.signUpForm.controls;
  }

  checkPasswords(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password === confirmPassword) return null;
    return { notMatch: true };
  }

  onHandleSubmit() {
    const user: IUserRegister = {
      username: this.signUpForm.value.username || '',
      email: this.signUpForm.value.email || '',
      password: this.signUpForm.value.password || '',
      confirmPassword: this.signUpForm.value.confirmPassword || '',
    };

<<<<<<< HEAD
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
              const sendingUser = setInterval(() => {
                this.user.getUser(data.user._id!).subscribe((data) => {
                  if (data.user.isVerified) {
                    Swal.close();
                    this.direct.navigateByUrl('/login');
                    clearInterval(sendingUser);
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
=======
    this.authService.signUpUser(user).subscribe(
      (user) => {
        alert('Successful account registration');
        console.log(user);
        this.router.navigate(['/login']);
      },
      (error) => console.log(error.message)
    );
>>>>>>> 5c681f5e10a1d0aa687939d396ec386ca1ed75a7
  }

  // get checkConfirmPassword() {
  //   return this.SignUp.get('confirmpassword') as FormControl;
  // }
}
