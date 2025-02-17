import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {lastValueFrom, map, tap} from "rxjs";
import {LocalStorageService} from "../local-storage/local-storage.service";
import {User, UserHttp} from "../../entities/user.entity";
import {UserService} from "../user/user.service";

interface LoginHttp {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token?: string;

  private url: string;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService,
              private userService: UserService) {
    this.url = environment.API_URL + environment.API_RESOURCES.AUTH;
  }

  async checkLocalStorageToken(): Promise<void> {
    const tokenLocalStorage = this.localStorageService.getItem(environment.LOCAL_STORAGE.ACCESS_TOKEN)
    if(tokenLocalStorage) {this.token = tokenLocalStorage
      this.getProfile()
    }
  }

  async login (email: string, password: string, remember: boolean): Promise<void> {
    const obs = this.http
      .post<LoginHttp>(`${this.url}/login`, { email, password })
      .pipe(
        tap(res => {
          if (remember) {
            this.localStorageService.setItem(environment.LOCAL_STORAGE.ACCESS_TOKEN, res.access_token)
            this.localStorageService.setItem(environment.LOCAL_STORAGE.REFRESH_TOKEN, res.refresh_token)
          }
          this.token = res.access_token
        }),
        map(async () => {
          await this.getProfile()
          return undefined
        })
      )
    return lastValueFrom(obs)
  }

  async getProfile(): Promise<void>{
    if(!this.token) throw new Error('Aucun jeton n\'a été trouvé')

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })

    const obs = this.http
      .get<UserHttp>(`${this.url}/profile`, {headers})
      .pipe(
        map(userHttp => User.fromHttp(userHttp)),
        tap(user => this.userService.currentUser = user),
        map(() => undefined)
      )
    return lastValueFrom(obs)
  }
}
