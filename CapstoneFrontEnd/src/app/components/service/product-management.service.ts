import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDao } from '../model/ProductDao';
import { Observable } from 'rxjs';
import { InventoryStockDao } from '../model/InventoryStockDao';
import { OrderRequestDTO } from '../model/OrderRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {

   token:string ='';
  
    constructor(private http: HttpClient) { }


    addProduct(productDao:ProductDao):Observable<ProductDao>{
      
    this.token = localStorage.getItem('token')!=null?localStorage.getItem('token')!:"";
 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
      });

        return this.http.post<ProductDao>('http://localhost:8080/api/v1/inventory/products/add', productDao, {headers});
    }


    updateProduct(id:number, productDao:ProductDao):Observable<ProductDao>{

      this.token = localStorage.getItem('token')!=null?localStorage.getItem('token')!:"";
 
      const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
      });

      return this.http.put<ProductDao>('http://localhost:8080/api/v1/inventory/products/update/'+id, productDao, {headers});
    }
	
    deleteProduct(id:number):Observable<ProductDao>{

      this.token = localStorage.getItem('token')!=null?localStorage.getItem('token')!:"";
 
      const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
      });

      return this.http.delete<ProductDao>('http://localhost:8080/api/v1/inventory/products/'+id,{headers});
    }
	  deleteProductBySKU(sku:number):Observable<ProductDao>{

      this.token = localStorage.getItem('token')!=null?localStorage.getItem('token')!:"";
 
      const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
      });

      return this.http.delete<ProductDao>('http://localhost:8080/api/v1/inventory/products/sku/'+sku,{headers});
    }
	
    getAllproducts():Observable<ProductDao[]>{

      this.token = localStorage.getItem('token')!=null?localStorage.getItem('token')!:"";
 
      const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
      });

      return this.http.get<ProductDao[]>('http://localhost:8080/api/v1/inventory/products/all',{headers});
    }


    getProductDetails(id:number):Observable<ProductDao>{

      this.token = localStorage.getItem('token')!=null?localStorage.getItem('token')!:"";
 
      const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
      });

      return this.http.get<ProductDao>('http://localhost:8080/api/v1/inventory/products/'+id,{headers});
    }

    getAlerts():Observable<InventoryStockDao[]>{

      this.token = localStorage.getItem('token')!=null?localStorage.getItem('token')!:"";
 
      const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
      });

      return this.http.get<InventoryStockDao[]>('http://localhost:8080/api/v1/inventory/alerts/',{headers});
    }

    sendOrder(orderRequestDTO:OrderRequestDTO):Observable<OrderRequestDTO>{
      
      this.token = localStorage.getItem('token')!=null?localStorage.getItem('token')!:"";
   
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
        });
  
          return this.http.post<OrderRequestDTO>('http://localhost:8080/api/v1/inventory/orders/place', orderRequestDTO, {headers});
      }
	
    
}
