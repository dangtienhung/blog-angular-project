import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  ) {}

  signUpForm = this.formSignup.group(
    {
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }
    // ,
    // {
    //   validators: this.beMatch('password', 'confirmPassword'),
    // }
  );

  get f() {
    return this.signUpForm.controls;
  }

  beMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && matchingControl.errors['beMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ beMatch: true });
      } else {
        matchingControl.setErrors({ beMatch: null });
      }
    };
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
        alert("Successful account registration")
        this.router.navigate(['/login']);
        // console.log(user);
      },
      (error) => console.log(error.message)
    );
  }
}
