import { AfterViewInit, Component, ElementRef, HostBinding, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IList } from '../../model/list';
import { Hero } from '../../model/hero';
import { HeroesService } from '../../services/heroes';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'cc-heroes-list',
  templateUrl: './list.html'
})
export class HeroesListComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('loader') loader: ElementRef;

  heroes: Hero[] = [];

  pagesLoaded = 0;
  perPage = 5;
  pages: number;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private heroesService: HeroesService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { heroes: IList<Hero> }) => {
      this.updateData(data.heroes);
    });

    let source = Observable.fromEvent(window, 'scroll');

    this.subscription = source.debounceTime(300)
      .subscribe(() => {
        this.checkVisible();
      });
  }

  ngAfterViewInit() {
    this.checkVisible();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  checkVisible() {
    if (!this.loader) {
      return;
    }
    let pageBottom = window.pageYOffset + window.innerHeight;
    let elemPositioning = this.loader.nativeElement.getBoundingClientRect();
    if (elemPositioning.top < pageBottom) {
      this.loadMore();
    }
  }

  loadMore() {
    if (this.pagesLoaded < this.pages) {
      this.heroesService.list({ page: this.pagesLoaded + 1, perPage: this.perPage })
        .then((heroes: IList<Hero>) => {
          this.updateData(heroes);
        });
    }
  }

  updateData(heroes: IList<Hero>) {
    heroes.items.forEach(h => {
      this.heroes.push(h);
    });
    this.pages = heroes.pages;
    this.perPage = heroes.limit;
    this.pagesLoaded = heroes.page;
    setTimeout(() => {
      this.checkVisible();
    }, 500);
  }

  openHeroSplashDialog(hero: Hero) {
    this.dialog.open(HeroSplashDialogComponent, {
      data: {
        hero: hero
      },
      panelClass: 'full-screen-dialog'
    });
  }
}

@Component({
  selector: 'cc-hero-splash-dialog',
  templateUrl: 'hero-splash-dialog.html',
})
export class HeroSplashDialogComponent {
  @HostBinding('class.full-screen-content') fullScreen = true;

  hero: Hero;

  backgroundImage = '';

  constructor(public dialogRef: MatDialogRef<Hero>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.hero = data.hero;

    if (this.hero.attributes.image_splash) {
      this.backgroundImage = `url(${this.hero.attributes.image_splash})`;
    } else {
      this.backgroundImage = '#563E7B';
    }

  }
}
