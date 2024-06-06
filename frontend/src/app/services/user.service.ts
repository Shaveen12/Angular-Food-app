import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/Interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IUserRegister } from '../shared/Interfaces/IUserRegister';

const USER_KEY ="User";
@Injectable({
  providedIn: 'root'
})

export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;

  constructor(private http:HttpClient) { 
    this.userObservable = this.userSubject.asObservable();
  }

  public currentUser(): User {
    return this.userSubject.value;
  }

  login(userLogin:IUserLogin):Observable<User>{
     return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          //console.log(user);
          //alert("login succesful");
        },
          error: (errorResponse) => {
            alert("login failed");
          }
        
      })
     )
  }

  register(userRegister:IUserRegister):Observable<User> {
    console.log("Inside Register in userService");
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
        },
        error: (errorResponse) => {
          alert("Registration failed");
        }
      })
    )
  }

  logout() {
    this.userSubject.next(new User());
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(USER_KEY);
    }
    
    window.location.reload();
  }

  private setUserToLocalStorage(user: User): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      //console.error('localStorage is not available.');
    }
  }
  
  private getUserFromLocalStorage(): User {
    if (typeof localStorage !== 'undefined') {
      const userJson = localStorage.getItem(USER_KEY);
      if (userJson) {
        return JSON.parse(userJson) as User;
      }
    } else {
      //console.error('localStorage is not available.');
    }
    return new User(); // or handle this case appropriately
  }
  
}
