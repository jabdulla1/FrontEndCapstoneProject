import { ProductDao } from "./ProductDao";
import { ProductDTO } from "./ProductDTO";
import { SupplierDTO } from "./SupplierDTO";

export class OrderDTO{
    orderId:number;
    productList: ProductDTO[];
    totalPrice: number;
    supplier: SupplierDTO;

    constructor(){
        this.orderId =0;
        this.productList=[];
        this.totalPrice =0;
        this.supplier= new SupplierDTO(); 
    }
}