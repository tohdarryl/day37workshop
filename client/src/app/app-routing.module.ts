import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraComponent } from './components/camera.component';
import { UploadComponent } from './components/upload.component';

const routes: Routes = [
  {path: '', component: CameraComponent},
  {path: 'upload', component: UploadComponent},
  {path: '**', redirectTo:'/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
