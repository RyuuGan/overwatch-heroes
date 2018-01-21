import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IList } from '../../model/list';
import { Hero } from '../../model/hero';
import { HeroesService } from '../../services/heroes';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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

  constructor(private route: ActivatedRoute, private heroesService: HeroesService) {
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
    console.log(elemPositioning.top, pageBottom);
    if (elemPositioning.top < pageBottom) {
      console.log('Load more');
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
}
