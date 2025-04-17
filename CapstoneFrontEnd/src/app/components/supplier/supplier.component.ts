import { Component, inject, OnInit } from '@angular/core';
import { SupplierDTO } from '../model/SupplierDTO';
import { SupplierService } from '../service/supplier.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-supplier',
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent implements OnInit{

  myForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      contactInfo: ['', Validators.required],
      rating: ['', Validators.required]
    });
  }
  ngOnInit(): void {
   this.getAllSupplier();
  }

show:boolean=false;
//isDisable:boolean=false;
addUpdate:number=-1;
supplierDTO:SupplierDTO = new SupplierDTO();
supplierDTOs:SupplierDTO[] =[];
// inventoryStockDao:InventoryStockDao[] = [];
// orderRequestDTO:OrderRequestDTO = new OrderRequestDTO();
// productDaoShow:ProductDao = new ProductDao();
supplierService:SupplierService = inject(SupplierService);

  getAllSupplier() {

    this.supplierService.getAllSuppliers().subscribe((result: SupplierDTO[]) => {
      this.supplierDTOs = result;
    });
  }

  // hideOrderDetails(){
  //   this.show =false;
  // }
  
  // showOrderDetails(id:number){
  //   //this.show = !this.show
  //   this.show=true;
  //   this.productDaoShow = this.productDaos[id];
  // }
  
    
    updateSetSupplier(id: number) {
      
    this.addUpdate=0;
    //this.isDisable=true;
  
    //console.log(this.productDaos[id]);
    this.supplierDTO = this.supplierDTOs[id];  
  }
    deleteSupplier(id: number) {
      this.supplierService.deleteSupplier(id).subscribe((result:SupplierDTO)=>{
          if(result){
            alert("Record is Deleted")
            this.getAllSupplier();
          }else{
            alert(result)
          }
        });
    }


    addSupplier() {

      if (this.myForm.valid) {
       if(this.addUpdate == -1){
        this.supplierService.addSupplier(this.supplierDTO).subscribe((result:SupplierDTO)=>{
          if(result){
            alert("Record is Added")
            this.getAllSupplier();
          }else{
            alert(result)
          }
        });
      }else{
        this.updateProduct(this.supplierDTO.id, this.supplierDTO);
      }
      
        this.supplierDTO = new SupplierDTO();
        this.addUpdate=-1;
        //this.isDisable=false;
      } else {
        alert("Form is Invalid");
        //console.log('Form is invalid');
      }
    }

    updateProduct(id:number, supplierDTO:SupplierDTO){
      this.supplierService.updateSupplier(id, this.supplierDTO).subscribe((result:SupplierDTO)=>{
        if(result){
          alert("Record Updated")
          this.getAllSupplier();
        }else{
          alert(result)
        }
      });
    }

}
