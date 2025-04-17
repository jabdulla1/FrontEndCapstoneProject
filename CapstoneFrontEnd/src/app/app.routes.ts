import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { RegisterComponent } from './components/register/register.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { OrderManagerComponent } from './components/order-manager/order-manager.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'product',
        component: ProductManagementComponent
    },
    {
        path: 'supplier',
        component: SupplierComponent

    },
    {
        path: 'order',
        component: OrderManagerComponent
        
    }


];
