import { NgModule } from "@angular/core";

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';

const matModules: any[] = [
  MatToolbarModule, MatInputModule, MatFormFieldModule,
  MatButtonModule, MatIconModule, MatListModule, MatCardModule
]

@NgModule({
  imports: matModules,
  exports: matModules
})
export class MaterialModule {

}