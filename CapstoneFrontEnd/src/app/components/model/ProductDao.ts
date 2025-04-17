export class ProductDao{
    sku:number;
    name:string;
    description:string;
    initial_stock:number;

    constructor(){
        this.sku=0;
        this.name='';
        this.description='';
        this.initial_stock=0;
    }
}