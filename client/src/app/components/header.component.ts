import { Component, NgModule, OnInit } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule, MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import conf from '../conf';

@Component({
  selector: 'cc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  locales = conf.locales;
  currentLang = '';

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang;
  }

  ngOnInit(): void {
  }

  changeLocale(locale) {
    this.translate.use(locale);
  }
}

@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    TranslateModule,
    RouterModule,
    CommonModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent, CommonModule]
})
export class HeaderComponentModule {
}
