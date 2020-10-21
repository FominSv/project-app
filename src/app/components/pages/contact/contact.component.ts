
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  ifSubmitted = false;
  success = false;
  constructor(private fb: FormBuilder) { }


  frm: FormGroup;
  txtName:string;
  txtFamilyName: string;
  txtUserEmail: string;
  message: string;

  ngOnInit(): void {
    this.frm =this.fb.group({
      txtName: ['', [Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
      txtFamilyName: ['', [Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
      txtEmail:
      ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[ a-zA-Z0-9.-]+\[a-zA-Z]{2,3}$')]],
      txtMes: ['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]]
   
  });

  }

  onSubmit(){
    this.ifSubmitted = true;
    if(this.frm.invalid)
    {
      return 
         
    }
    this.success = true;
 
}
}
