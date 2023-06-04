import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  accessToken: string = '';
  constructor(private user: AuthService) {}
  ngOnInit(): void {
    this.accessToken = this.user.getToken();
    console.log(this.accessToken);
  }
}
