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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
  constructor(
    private authService: AuthService,
    private formSignup: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.formSignup.group({});
  }

  signUpForm = this.formSignup.group(
    {
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: this.checkPasswords,
    }
  );

  // get f() {
  //   return this.signUpForm.controls;
  // }

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

    this.authService.signUpUser(user).subscribe(
      (user) => {
        this.toastr.success('Successful account registration');
        console.log(user);
        this.router.navigate(['/login']);
      },
      (error) => console.log(error.message)
    );
  }
}
