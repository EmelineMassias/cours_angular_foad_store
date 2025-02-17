import { Injectable } from '@angular/core';
import {User} from "../../entities/user.entity";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser?: User

  constructor() { }
}
