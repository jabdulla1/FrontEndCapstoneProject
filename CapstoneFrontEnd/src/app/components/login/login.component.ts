import { CommonModule } from '@angular/common';
import { Component, inject  } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserCredential } from '../model/UserCredential';
import { UserCredentialService } from '../service/user-credential.service';
import { AuthRequest } from '../model/AuthRequest';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

   user: UserCredential = new UserCredential();
   userService = inject(UserCredentialService);
   authRequest:AuthRequest = new AuthRequest;
    token:string='';

    myForm: FormGroup;


    constructor(private fb: FormBuilder) {
      this.myForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        role: ['', Validators.required]
      });
    }


    LoginUser() {

      if (this.myForm.valid) {
             
      this.authRequest.username = this.user.email;
      this.authRequest.password = this.user.password;
      this.authRequest.role = this.user.role;
  
      console.log(this.user);
      
  
      this.userService.login(this.authRequest).subscribe((result:any)=>{
        
      console.log(result.token);
        
      if(result.token != null){
            this.token = result.token;
            alert("User logined in ")
            localStorage.setItem("token", this.token);
          }else{
            alert("Invalid Input")
          }
        })        
        
        this.user = new UserCredential();

        //alert("Form Submitted"); //console.log('Form submitted:', this.myForm.value);
      } else {
        alert("Form is Invalid");
        //console.log('Form is invalid');
      }
      
    }
  

}
