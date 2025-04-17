import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertDTO } from '../model/AlertDTO';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  token:string ='';

  constructor(private http: HttpClient) { }

  getAlerts():Observable<AlertDTO[]>{
    
    this.token = localStorage.getItem('token')!=null?localStorage.getItem('token')!:"";

    const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<AlertDTO[]>('http://localhost:8080/alerts',{headers});
  }

}
