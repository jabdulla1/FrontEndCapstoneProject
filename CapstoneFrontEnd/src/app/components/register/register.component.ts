import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserCredentialService } from '../service/user-credential.service';
import { UserCredential } from '../model/UserCredential';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  myForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  user: UserCredential = new UserCredential();
  userService = inject(UserCredentialService);

  registerUser() {
    if (this.myForm.valid) {

        this.user.id=0;

        this.userService.InsertUser(this.user).subscribe((result:UserCredential)=>{
        
          if(result){
            alert("User Registered")
          }else{
            alert("User not Registered")
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
