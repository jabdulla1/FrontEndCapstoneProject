import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryStockDao } from '../model/InventoryStockDao';

@Injectable({
  providedIn: 'root'
})
export class InventoryTrackingService {

  token:string ='';

  constructor(private http: HttpClient) { }


  getAllStock():Observable<InventoryStockDao[]>{
    
    this.token = localStorage.getItem('token')!=null?localStorage.getItem('token')!:"";

    const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<InventoryStockDao[]>('http://localhost:8080/stockapi/all',{headers});
  }

  getStockById(id: number): Observable<InventoryStockDao> {

    this.token = localStorage.getItem('token') != null ? localStorage.getItem('token')! : "";

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<InventoryStockDao>('http://localhost:8080/stockapi/id/' + id, { headers });
  }

  getStockBySku(sku: number): Observable<InventoryStockDao> {

    this.token = localStorage.getItem('token') != null ? localStorage.getItem('token')! : "";

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<InventoryStockDao>('http://localhost:8080/stockapi/sku/' + sku, { headers });
  }

  addStock(inventoryStockDao: InventoryStockDao): Observable<InventoryStockDao> {

    this.token = localStorage.getItem('token') != null ? localStorage.getItem('token')! : "";

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.post<InventoryStockDao>('http://localhost:8080/stockapi/add', inventoryStockDao, { headers });
  }

  updateStockById(id: number, inventoryStockDao: InventoryStockDao): Observable<InventoryStockDao> {

    this.token = localStorage.getItem('token') != null ? localStorage.getItem('token')! : "";

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.put<InventoryStockDao>('http://localhost:8080/stockapi/id/' + id, inventoryStockDao, { headers });
  }

  updateStockBySku(sku: number, inventoryStockDao: InventoryStockDao): Observable<InventoryStockDao> {

    this.token = localStorage.getItem('token') != null ? localStorage.getItem('token')! : "";

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.put<InventoryStockDao>('http://localhost:8080/stockapi/sku/' + sku, inventoryStockDao, { headers });
  }

  deleteStockById(id: number): Observable<InventoryStockDao> {

    this.token = localStorage.getItem('token') != null ? localStorage.getItem('token')! : "";

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.delete<InventoryStockDao>('http://localhost:8080/stockapi/id/' + id, { headers });
  }

  deleteStockBySku(sku: number): Observable<InventoryStockDao> {

    this.token = localStorage.getItem('token') != null ? localStorage.getItem('token')! : "";

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.delete<InventoryStockDao>('http://localhost:8080/stockapi/id/' + sku, { headers });
  }

  decreaseStockBySku(sku:number, quantity:number): Observable<InventoryStockDao> {

    this.token = localStorage.getItem('token') != null ? localStorage.getItem('token')! : "";

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.post<InventoryStockDao>('http://localhost:8080/stockapi/decrease/sku/'+sku, quantity, { headers });
  }

  increaseStockBySku(sku:number, quantity:number): Observable<InventoryStockDao> {

    this.token = localStorage.getItem('token') != null ? localStorage.getItem('token')! : "";

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.post<InventoryStockDao>('http://localhost:8080/stockapi/increase/sku/'+sku, quantity, { headers });
  }

  getLowStockAlerts():Observable<InventoryStockDao[]>{
      
      this.token = localStorage.getItem('token')!=null?localStorage.getItem('token')!:"";
  
      const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
      });
  
      return this.http.get<InventoryStockDao[]>('http://localhost:8080/stockapi/alerts',{headers});
    }

}
