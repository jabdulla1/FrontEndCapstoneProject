export class OrderProductDTO{
    orderId: number;
    productId: number;
    productQuantity: number;

    constructor(){
        this.orderId =0;
        this.productId =0;
        this.productQuantity =0;
    }
}