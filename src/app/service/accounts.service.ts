import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Utils} from "../utils/utils";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  private accountsUrl = Utils.apiBaseUrl() + '/api/token'
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    const base64Encoded = btoa(`${username}:${password}`)
    const authHeaders = {'Authorization':`Basic ${base64Encoded}`}
    return this.http.post<User>(`${this.accountsUrl}`, {}, {'headers':authHeaders})
      .pipe(map((user:User) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }


  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
