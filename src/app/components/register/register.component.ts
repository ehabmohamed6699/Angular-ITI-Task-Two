import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/model/IUser';
import { AuthService } from 'src/app/services/auth.service';
import { emailAlreadyTakenValidator } from 'src/app/validators/emailValidators';
import { passwordAndConfirmPasswordMatchValidator } from 'src/app/validators/passwordValidators';
import { IViewUser } from 'src/app/viewModels/IViewUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  subscriptions: Subscription[]
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { 
    this.subscriptions = [];
    this.registerForm = this.formBuilder.group({
      fullName: ['',[Validators.required, Validators.minLength(5)]],
      email: ['',[Validators.required, Validators.email], [emailAlreadyTakenValidator(this.authService)]],
      phones: this.formBuilder.array([this.formBuilder.control('',[Validators.required, Validators.pattern('[0-9]{10,}')])]),
      address: this.formBuilder.group({
        city: ['',[Validators.required, Validators.minLength(3)]],
        street: ['',[Validators.required, Validators.minLength(3)]],
        code: ['',[Validators.required]]
      }),
      delivery: ['any'],
      deliveryDays: [''],
      password: ['',[Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',[Validators.required, Validators.minLength(6)]]
    },{validators: [passwordAndConfirmPasswordMatchValidator]})
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getControl(name: string){
    return this.registerForm.get(name);
  }

  get phones(){
    return this.getControl('phones') as FormArray;
  }

  get phoneLength(){
    return this.phones.length;
  }

  get phonesValid(){
    for(let phone of this.phones.controls){
      if(phone.invalid){
        return false;
      }
    }
    return true;
  }

  deletePhone(index: number){
    this.phones.removeAt(index);
  }
  addPhone(){
    this.phones.push(this.formBuilder.control('',[Validators.required, Validators.pattern('[0-9]{10,}')]));
  }

  getPhoneChild(index: number){
    return this.phones.controls[index] as AbstractControl;
  }

  getChildControl(group: AbstractControl | null, name: string){
    return group?.get(name);
  }

  setDeliveryValidity(value: string | null){
    if(value == 'specific'){
      this.getControl('deliveryDays')?.setValidators([Validators.required]);
    }else{
      this.getControl('deliveryDays')?.clearValidators();
    }
    this.getControl('deliveryDays')?.updateValueAndValidity();
  }

  ngOnInit(): void {
  }

  register(){
    if(this.registerForm.invalid){
      return;
    }

    let options = {
      next: (data: IUser) => {
        this.authService.login(data.email, this.registerForm.value.password).subscribe();
      },
      error: (err: Error) => {
        console.log(err);
      }
    }
    this.subscriptions.push(
      this.authService.register(this.registerForm.value).subscribe(options)
    )
  }

}
