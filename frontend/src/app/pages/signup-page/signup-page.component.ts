import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/users/user.service';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/interfaces/User';

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
    private http: HttpClient
  ) {}
  SignUp = this.fb.group({
    fullname: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+$')]],
    file: [''],
    email: ['', [Validators.email]],
    password: ['', [Validators.minLength(10)]],
  });

  ngOnInit(): void {
    this.service.getAllUsers().subscribe((data) => {
      console.log(data);
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
        this.service.createUser(pressSignUp).subscribe((data) => {
          console.log(data);
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
}
