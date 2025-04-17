import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { ProductManagementComponent } from "./components/product-management/product-management.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink,RegisterComponent, LoginComponent, ProductManagementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CapstoneFrontEnd';
}
