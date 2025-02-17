import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../entities/user.entity";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  currentUser?: User

  constructor (private userService: UserService) {}

  ngOnInit (): void {
    this.currentUser = this.userService.currentUser
  }
}
