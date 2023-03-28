import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraComponent } from './components/camera.component';
import { UploadComponent } from './components/upload.component';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { WebcamModule } from 'ngx-webcam';
import { CameraService } from './services/camera.service';

@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    WebcamModule
    
  ],
  providers: [CameraService],
  bootstrap: [AppComponent]
})
export class AppModule { }
