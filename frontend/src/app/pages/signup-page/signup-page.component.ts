import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UserService } from 'src/app/services/users/user.service';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/interfaces/User';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  selectedFile!: File;

  onFileSlected(e: any) {
    this.selectedFile = e.target.files[0];
  }

  constructor(
    private fb: FormBuilder,
    private service: UserService,
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
  ngOnInit(): void {
    this.service.getAllUsers().subscribe((data) => {
      // console.log(data);
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      const formdata = new FormData();
      formdata.append('files', this.selectedFile);
      this.http.post<any>('/api/v1/uploadfiles', formdata).subscribe((res) => {
        const pressSignUp: IUser = {
          username: this.SignUp.value.fullname || '',
          password: this.SignUp.value.password || '',
          email: this.SignUp.value.email || '',
          role: 'user',
          is_active: true,
          postList: [],
          isVerified: true,
          avatar: res.data[0],
        };
        this.service
          .createUser(pressSignUp)
          .pipe(
            catchError((err) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.error.msg,
              });
              return throwError('Đã xảy ra lỗi');
            })
          )
          .subscribe(() => {
            this.direct.navigateByUrl('/login');
          });
      });
    }
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
