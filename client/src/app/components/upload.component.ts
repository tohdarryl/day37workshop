import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit{

  form!:FormGroup
  imageData!: any
  blob!: Blob

  constructor(private fb: FormBuilder, private router: Router, private cameraSvc: CameraService) {}
  ngOnInit(): void {
    // if no imageData
    if(!this.cameraSvc.imageData){
      this.router.navigate(['/'])
      return;
    }
    this.imageData = this.cameraSvc.imageData
    this.form = this.createForm()
    
    // to assign this.blob a value (convert dataURI[this.imageData] to Blob)
    this.blob = this.dataURItoBlob(this.imageData)
  }

private createForm(): FormGroup{
  return this.fb.group({
    title: this.fb.control<string>(''),
    complain: this.fb.control<string>('')
  })
}

upload(){
  const formVal = this.form.value
  console.log(">>>", formVal)
  console.log(">>> this.blob",this.blob);
  this.cameraSvc.upload(formVal, this.blob)
  .then((result) => {
    this.router.navigate(['/']);
  })
}

dataURItoBlob(dataURI: string){
  var byteString = atob(dataURI.split(',')[1]);
  let mimeString = dataURI.split(',')[0].split(';')[0]
  var ab = new ArrayBuffer(byteString.length)
  var ia = new Uint8Array(ab)

  for(var i =0; i<byteString.length; i++)
    ia[i] = byteString.charCodeAt(i);
  
  return new Blob([ab], {type: mimeString});
}



  

}
