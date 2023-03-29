import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FileuploadService } from '../services/fileupload.service';

@Component({
  selector: 'app-viewimage',
  templateUrl: './viewimage.component.html',
  styleUrls: ['./viewimage.component.css']
})
export class ViewimageComponent implements OnInit{
  postId =  "";
  param$! :  Subscription;
  imageData!: any;

  constructor(private fileUploadSvc: FileuploadService,
    private activatedRoute: ActivatedRoute){

  }
  ngOnInit(): void {
    console.log("View Image Component");
    this.param$ = this.activatedRoute.params.subscribe(
      (params) => {
        this.postId = params['postId'];
        console.log(this.postId);
        // Gets image from mySQL using ID
        this.fileUploadSvc.getImage(this.postId).then((r)=> {
          console.log(r.image);
          // Binds imageData with r.image
          this.imageData = r.image;
        });
      }
    );
    
  }
}
