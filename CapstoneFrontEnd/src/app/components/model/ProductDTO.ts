export class ProductDTO{
    productSku:number;
    productName: string;
    productQuantity: number;

    constructor(){
        this.productSku =0;
        this.productName="";
        this.productQuantity=0;
    }
}