import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupplierDTO } from '../model/SupplierDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  token:string ='';

  constructor(private http: HttpClient) { }


addSupplier(supplierDao:SupplierDTO):Observable<SupplierDTO>{
      
    this.token = localStorage.getItem('token')!=null?localStorage.getItem('token')!:"";
 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
      });

        return this.http.post<SupplierDTO>('http://localhost:8080/supplier/insert', supplierDao, {headers});
    }

    getAllSuppliers():Observable<SupplierDTO[]>{
    
          this.token = localStorage.getItem('token')!=null?localStorage.getItem('token')!:"";
     
          const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.token}`
          });
    
          return this.http.get<SupplierDTO[]>('http://localhost:8080/supplier',{headers});
        }

        getSupplierById(id:number):Observable<SupplierDTO>{
    
          this.token = localStorage.getItem('token')!=null?localStorage.getItem('token')!:"";
     
          const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.token}`
          });
    
          return this.http.get<SupplierDTO>('http://localhost:8080/supplier/id/'+id,{headers});
        }

        getSupplierByName(name:string):Observable<SupplierDTO>{
    
          this.token = localStorage.getItem('token')!=null?localStorage.getItem('token')!:"";
     
          const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.token}`
          });
    
          return this.http.get<SupplierDTO>('http://localhost:8080/supplier/name/'+name,{headers});
        }

        updateSupplier(id:number, supplierDao:SupplierDTO):Observable<SupplierDTO>{
        
              this.token = localStorage.getItem('token')!=null?localStorage.getItem('token')!:"";
         
              const headers = new HttpHeaders({
              'Authorization': `Bearer ${this.token}`
              });
        
              return this.http.put<SupplierDTO>('http://localhost:8080/supplier/update/'+id, supplierDao, {headers});
        }

        deleteSupplier(id:number):Observable<SupplierDTO>{
        
              this.token = localStorage.getItem('token')!=null?localStorage.getItem('token')!:"";
         
              const headers = new HttpHeaders({
              'Authorization': `Bearer ${this.token}`
              });
        
              return this.http.delete<SupplierDTO>('http://localhost:8080/supplier/delete/'+id,{headers});
        }

}
