import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamComponent, WebcamImage } from 'ngx-webcam';
import { Subject, Subscription } from 'rxjs';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnDestroy, AfterViewInit{

  @ViewChild(WebcamComponent)
  webcam!: WebcamComponent

  width = 400;
  height = 400;
  pics: string[] = []
  sub$!: Subscription
  trigger = new Subject<void>;

  constructor(private router: Router, private cameraSvc: CameraService){}

  ngOnDestroy(): void {
      this.sub$.unsubscribe();
  }

  ngAfterViewInit(): void {
      this.webcam.trigger = this.trigger
      this.sub$ = this.webcam.imageCapture.subscribe(
        this.snapshot.bind(this)
      )
  }

  snap(){
    this.trigger.next()
  }

  // assigns whatever thats cached on the browser and pushes it into an array
  snapshot(webcamImg: WebcamImage){
    this.cameraSvc.imageData = webcamImg.imageAsDataUrl
    this.pics.push(webcamImg.imageAsDataUrl)
  }
}
