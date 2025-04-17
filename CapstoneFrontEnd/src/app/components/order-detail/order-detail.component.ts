import { Component, Input } from '@angular/core';
import { ProductDao } from '../model/ProductDao';

@Component({
  selector: 'app-order-detail',
  imports: [],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {


  @Input() productDao:ProductDao= new ProductDao();

}
