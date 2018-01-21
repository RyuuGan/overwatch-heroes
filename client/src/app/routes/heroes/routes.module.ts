import { RouterModule, Routes } from '@angular/router';

import { HeroesLayoutComponent } from './layout';
import { HeroesListComponent } from './list';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../sharedModule';
import { HeroesResolver, HeroesService } from '../../services/heroes';

let routes: Routes = [
  {
    path: 'heroes',
    component: HeroesLayoutComponent,
    children: [
      {
        path: '',
        component: HeroesListComponent,
        resolve: {
          heroes: HeroesResolver
        }
      }
    ]
  }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    HeroesLayoutComponent,
    HeroesListComponent
  ],
  providers: [
    HeroesResolver,
    HeroesService
  ],
  exports: [
    RouterModule
  ]
})

export class HeroesRoutingModule {
}
