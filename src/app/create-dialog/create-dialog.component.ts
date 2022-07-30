import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
import { MatDialogModule, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss'],
  providers:[ApiService]
})
export class CreateDialogComponent implements OnInit {

  freshnessList=["Brand New","Second Hand","Refurbished"];
  productForm !:FormGroup

  actionBtn:string="save";

  constructor(private fromBuilder:FormBuilder,
             private api:ApiService,
             @Inject(MAT_DIALOG_DATA) public editdata:any,
             private dialog:MatDialogRef<CreateDialogComponent>) { }

  ngOnInit(): void {
    this.productForm=this.fromBuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      commnent:['',Validators.required],
      date:['',Validators.required],
    });

    if(this.editdata)
    {
      this.actionBtn="update";
      this.productForm.controls['productName'].setValue(this.editdata.productName);
      this.productForm.controls['category'].setValue(this.editdata.category);
      this.productForm.controls['date'].setValue(this.editdata.date);
      this.productForm.controls['freshness'].setValue(this.editdata.freshness);
      this.productForm.controls['price'].setValue(this.editdata.price);
      this.productForm.controls['commnent'].setValue(this.editdata.commnent);
    }

  }

  addProduct()
  {
    if(!this.editdata)
    {
      if(this.productForm.valid)
      {
        this.api.postProduct(this.productForm.value).subscribe({
          next:(res)=>{
            alert("Product add successfully");
            this.productForm.reset();
            this.dialog.close('save');
          },
          error:()=>{
            alert("Error while adding the product");
          }
        });
      }
    }
    else
    {
      this.updateProduct();
    }
    
  }

  updateProduct()
  {
    this.api.putProduct(this.productForm.value,this.editdata.id).subscribe({
      next:(res)=>{
        alert("Product add successfully");
        this.productForm.reset();
        this.dialog.close('update');
      },
      error:()=>{
        alert("Error while update the record");
      }
    });
  }

}


