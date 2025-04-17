import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductDao } from '../model/ProductDao';
import { InventoryStockDao } from '../model/InventoryStockDao';
import { OrderRequestDTO } from '../model/OrderRequestDTO';
import { ProductManagementService } from '../service/product-management.service';
import { OrderDetailComponent } from "../order-detail/order-detail.component";

@Component({
  selector: 'app-product-management',
  imports: [FormsModule, CommonModule, OrderDetailComponent,ReactiveFormsModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent implements OnInit{
ngOnInit(): void {
 this.getAllProducts();
}

show:boolean=false;
isDisable:boolean=false;
addUpdate:number=-1;
productDao:ProductDao = new ProductDao();
productDaos:ProductDao[] =[];
inventoryStockDao:InventoryStockDao[] = [];
//orderRequestDTO:OrderRequestDTO = new OrderRequestDTO();
productDaoShow:ProductDao = new ProductDao();
productManagementService:ProductManagementService = inject(ProductManagementService);

myForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      sku: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      initial_stock: ['', Validators.required]
    });
  }


hideOrderDetails(){
  this.show =false;
}

showOrderDetails(id:number){
  //this.show = !this.show
  this.show=true;
  this.productDaoShow = this.productDaos[id];
}

addProduct(){
  if (this.myForm.valid) {
  if(this.addUpdate == -1){
  this.productManagementService.addProduct(this.productDao).subscribe((result:ProductDao)=>{
    if(result){
      alert("Record is Added")
      this.getAllProducts();
    }else{
      alert(result)
    }
  });
}else{
  this.updateProduct(this.productDao.sku, this.productDao);
}

  this.productDao = new ProductDao();
  this.addUpdate=-1;
  this.isDisable=false;
    //alert("Form Submitted"); //console.log('Form submitted:', this.myForm.value);
  } else {
    alert("Form is Invalid");
    //console.log('Form is invalid');
  }
}

updateProduct(sku:number, productDao:ProductDao){
  this.productManagementService.updateProduct(sku, this.productDao).subscribe((result:ProductDao)=>{
    if(result){
      alert("Record Updated")
      this.getAllProducts();
    }else{
      alert(result)
    }
  });
}

updateSetProduct(id:number){

  this.addUpdate=0;
  this.isDisable=true;
  
  console.log(this.productDaos[id]);
    this.productDao.name = this.productDaos[id].name;
    this.productDao.description = this.productDaos[id].description;
    this.productDao.sku = this.productDaos[id].sku;
    this.productDao.initial_stock= this.productDaos[id].initial_stock;
   
}

getAllProducts(){
  this.productManagementService.getAllproducts().subscribe((result:ProductDao[])=>{
    this.productDaos= result;
  });
}

deleteProduct(id:number){
  this.productManagementService.deleteProduct(id).subscribe(()=>{});
}

deleteProductBySKU(sku:number){
  this.productManagementService.deleteProductBySKU(sku).subscribe((result:ProductDao)=>{
    if(result){
      alert("Record is Deleted")
      this.getAllProducts();
    }else{
      alert(result)
    }
  });
}

getProductDetails(id:number){
  this.productManagementService.getProductDetails(id).subscribe(()=>{});
}

getAlerts(){
  this.productManagementService.getAlerts().subscribe(()=>{});
}

sendOrder(orderRequestDTO:OrderRequestDTO){
  this.productManagementService.sendOrder(orderRequestDTO).subscribe(()=>{});
}

}
