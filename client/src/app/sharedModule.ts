import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'angular2-moment';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatTabsModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponentModule } from './components/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { CustomFormsModule } from 'ng2-validation';

@NgModule({
  exports: [
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    HeaderComponentModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MomentModule,
    TranslateModule,
    CustomFormsModule
  ]
})
export class SharedModule {
}
