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
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
          ),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    }
    // , {
    //   validator: this.ConfirmedValidator('password','confirmPassword' )
    // }
  );

  get f() {
    return this.signUpForm.controls;
  }

  //   ConfirmedValidator(controlName: string, matchingControlName: string){
  //     return (formGroup: FormGroup) => {
  //         const control = formGroup.controls[controlName];
  //         const matchingControl = formGroup.controls[matchingControlName];

  //         if (control.value !== matchingControl.value) {
  //             matchingControl.setErrors({ confirmedValidator: true });
  //         } else {
  //             matchingControl.setErrors(null);
  //         }
  //     }
  // }

  onHandleSubmit() {
    const user: IUserRegister = {
      username: this.signUpForm.value.username || '',
      email: this.signUpForm.value.email || '',
      password: this.signUpForm.value.password || '',
      confirmPassword: this.signUpForm.value.confirmPassword || '',
    };

    this.authService.signUpUser(user).subscribe(
      (user) => {
        alert('Successful account registration');
        console.log(user);
        this.router.navigate(['/login']);
      },
      (error) => console.log(error.message)
    );
  }
}
