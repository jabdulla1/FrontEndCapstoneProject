import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequest } from '../model/AuthRequest';
import { UserCredential } from '../model/UserCredential';


@Injectable({
  providedIn: 'root'
})
export class UserCredentialService {
  token:string ='';

  constructor(private http: HttpClient) { }

  InsertUser(user:UserCredential):Observable<UserCredential>{
    return this.http.post<UserCredential>('http://localhost:8080/security/register', user);
  }

  login(user:AuthRequest):Observable<any>{
    return this.http.post<any>('http://localhost:8080/security/login', user);
  }

}
