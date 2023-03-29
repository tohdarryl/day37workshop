import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraComponent } from './components/camera.component';
import { UploadComponent } from './components/upload.component';
import { ViewimageComponent } from './components/viewimage.component';

const routes: Routes = [
  {path: '', component: CameraComponent},
  {path: 'upload', component: UploadComponent},
  { path: 'image/:postId', component: ViewimageComponent},
  {path: '**', redirectTo:'/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
