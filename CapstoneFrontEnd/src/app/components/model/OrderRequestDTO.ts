export class OrderRequestDTO{
    supplier_id:number;
    productSkusAndQuantities: Map<string, number>;

    constructor(){
        this.supplier_id=0;
        this.productSkusAndQuantities =  new Map<string,number>();
    }

    toPlain(): { supplier_id: number; productSkusAndQuantities: { [sku: string]: number } } {
        return {
          supplier_id: this.supplier_id,
          productSkusAndQuantities: Object.fromEntries(this.productSkusAndQuantities)
        };
    }
}