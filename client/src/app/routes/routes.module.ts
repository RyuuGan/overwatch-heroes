import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from './heroes/routes.module';

let routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    HeroesRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
