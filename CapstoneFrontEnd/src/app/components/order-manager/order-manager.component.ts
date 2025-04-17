import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderDTO } from '../model/OrderDTO';
import { OrderManagerService } from '../service/order-manager.service';
import { OrderRequestDTO } from '../model/OrderRequestDTO';

@Component({
  selector: 'app-order-manager',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './order-manager.component.html',
  styleUrl: './order-manager.component.css'
})
export class OrderManagerComponent implements OnInit{


  ngOnInit(): void {
    this.getAllOrder();
  }
  addUpdate:number=-1;
  orderRequestDTO:OrderRequestDTO = new OrderRequestDTO();
  orderDTOs:OrderDTO[]=[];
  orderDTO:OrderDTO = new OrderDTO();
  //updateIndex:number=0;
  orderManagerService: OrderManagerService = inject(OrderManagerService);

  getAllOrder(){
    this.orderManagerService.getOrders().subscribe((result:OrderDTO[])=>{
      this.orderDTOs = result;
    });
  }

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      dynamicFields: this.fb.array([])
    });

    // Add one field by default
    this.addField();
  }

  get dynamicFields(): FormArray {
    return this.form.get('dynamicFields') as FormArray;
  }

  addField(): void {
    const fieldGroup = this.fb.group({
      sku: ['',Validators.required],
      quantity: ['', Validators.required]
    });
    this.dynamicFields.push(fieldGroup);
  }

  removeField(index: number): void {
    if(this.dynamicFields.length > 1){
      this.dynamicFields.removeAt(index);
    }
  }

  getValuesAsMap():void{
    //const map = new Map<number, number>();
    this.dynamicFields.controls.forEach((group: any) => {
      const sku = parseInt(group.get('sku').value, 10);
      const quantity = parseInt(group.get('quantity').value, 10);
      if (!isNaN(sku) && !isNaN(quantity)) {
        this.orderRequestDTO.productSkusAndQuantities.set(sku.toString(), quantity);
        console.log("map: ", this.orderRequestDTO.productSkusAndQuantities);
      }
    });

    console.log("outside map", this.orderRequestDTO.productSkusAndQuantities);
    
  }

  onSubmit(): void {
    //const resultMap = this.getValuesAsMap();
    //this.orderRequestDTO.productSkuAndQuantities = new Map<number, number>(resultMap);
    //console.log('Map:', resultMap);
    this.getValuesAsMap();
    console.log("order Map in on submit: ", this.orderRequestDTO.productSkusAndQuantities);
    console.log("supplier: "+ this.orderRequestDTO.supplier_id);
    

    if (this.form.valid) {
    if(this.addUpdate == -1){
      
    this.orderManagerService.createOrder(this.orderRequestDTO).subscribe((result:OrderDTO)=>{
      if(result){
        alert("Order Made")
        this.getAllOrder();
      }else{
        alert(result)
      }
    });
  }else{
    this.updateOrder(this.orderDTO.orderId, this.orderRequestDTO);
  }
  
    this.addUpdate=-1;
    this.orderRequestDTO = new OrderRequestDTO();
    this.orderDTO = new OrderDTO();
  } else {
    alert("Form is Invalid");
    //console.log('Form is invalid');
  }
  }

  deleteOrder(orderId: number) {
    this.orderManagerService.deleteOrder(orderId).subscribe((result:OrderDTO)=>{
    if(result){
      alert("Order is Deleted")
      this.getAllOrder();
    }else{
      alert(result)
    }
    })
  }

  updateOrder(id:number, orderRequest: OrderRequestDTO){
    this.orderManagerService.updateOrder(id, orderRequest).subscribe((result:OrderDTO)=>{
      if(result){
        alert("Record Updated")
        this.getAllOrder();
      }else{
        alert(result)
      }
    });
  }

  loadMapIntoForm(id:number, editDTO:OrderDTO) {
    this.orderDTO = this.orderDTOs[id];
    this.dynamicFields.clear();
    this.orderRequestDTO.supplier_id = editDTO.supplier.id
    const productMap = new Map<string, number>(
      editDTO.productList.map(product => [product.productSku.toString(), product.productQuantity])
    );
    this.orderRequestDTO.productSkusAndQuantities = new Map(productMap);
    this.orderRequestDTO.productSkusAndQuantities.forEach((value, key) => {
    const fieldGroup = this.fb.group({
      sku: [key],
      quantity: [value]
    });
    this.dynamicFields.push(fieldGroup);
  });

  this.addUpdate=0;
  }
  
}
