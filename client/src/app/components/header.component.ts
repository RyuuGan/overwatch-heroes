import { Component, NgModule, OnInit } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatToolbarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}

@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    RouterModule,
    CommonModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent, CommonModule]
})
export class HeaderComponentModule {
}
