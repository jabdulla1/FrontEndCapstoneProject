import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderRequestDTO } from '../model/OrderRequestDTO';
import { Observable } from 'rxjs';
import { OrderDTO } from '../model/OrderDTO';

@Injectable({
  providedIn: 'root'
})
export class OrderManagerService {

  token:string =''
  constructor(private http: HttpClient) { }

 // @RequestMapping("/orders")
 createOrder(orderRequest:OrderRequestDTO):Observable<OrderDTO>{
      
  this.token = localStorage.getItem('token')!=null?localStorage.getItem('token')!:"";

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json'
    });

    console.log("in the service payload is: ", orderRequest);
   

    const payload={
      "supplier_id": orderRequest.supplier_id,
      "productSkusAndQuantities": Object.fromEntries(orderRequest.productSkusAndQuantities)
      
    }
    console.log("the payload: ", payload.productSkusAndQuantities);
    console.log("JSON: ", JSON.stringify(Object.fromEntries(orderRequest.productSkusAndQuantities))) ;
    //{"supplier_id": orderRequest.supplier_id, "productSkuAndQuantities": JSON.stringify(Object.fromEntries(orderRequest.productSkuAndQuantities)) }

      return this.http.post<OrderDTO>('http://localhost:8080/orders/place',{"supplier_id": orderRequest.supplier_id, "productSkusAndQuantities": Object.fromEntries(orderRequest.productSkusAndQuantities) } , {headers});
  }

  getOrders():Observable<OrderDTO[]>{
      
    this.token = localStorage.getItem('token')!=null?localStorage.getItem('token')!:"";
       
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
      
    return this.http.get<OrderDTO[]>('http://localhost:8080/orders',{headers});
  }

  getSupplierById(id: number): Observable<OrderDTO> {

    this.token = localStorage.getItem('token') != null ? localStorage.getItem('token')! : "";

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<OrderDTO>('http://localhost:8080/orders/' + id, { headers });
  }

  updateOrder(id: number, orderRequest: OrderRequestDTO): Observable<OrderDTO> {

    this.token = localStorage.getItem('token') != null ? localStorage.getItem('token')! : "";

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    console.log("the Id: "+id);
    
    console.log("supplier: "+ orderRequest.supplier_id);
    console.log("the map: ", orderRequest.productSkusAndQuantities);
    
    
    return this.http.put<OrderDTO>('http://localhost:8080/orders/' + id, {"supplier_id": orderRequest.supplier_id, "productSkusAndQuantities": Object.fromEntries(orderRequest.productSkusAndQuantities) }, { headers });
  }

  deleteOrder(id: number): Observable<OrderDTO> {

    this.token = localStorage.getItem('token') != null ? localStorage.getItem('token')! : "";

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.delete<OrderDTO>('http://localhost:8080/orders/'+ id, { headers });
  }

}
