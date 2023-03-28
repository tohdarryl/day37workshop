import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UploadResult } from '../model/upload-result';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  imageData = "";
  constructor(private http: HttpClient) { }

  upload(form: any, image: Blob){
    const formdata = new FormData();
    formdata.set("title", form['title']);
    formdata.set("complain", form['complain']);
    formdata.set("imageFile", image);

    return firstValueFrom(this.http.post<UploadResult>("/upload", formdata));
  }
}
