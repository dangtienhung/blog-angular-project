import { Component } from '@angular/core';
import { IUser } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/users/user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  user!: IUser;
  constructor(
    private userService: UserService,
    private router: ActivatedRoute
  ) {
    this.router.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.userService.getUser(id!).subscribe((data) => {
        this.user = data.user;
      });
    });
  }
}
