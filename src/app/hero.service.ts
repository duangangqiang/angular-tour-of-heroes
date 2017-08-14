import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private http: Http) { }

  /**
   * 获取所有的英雄列表
   * @returns {Promise<Hero[]>}
   * @memberof HeroService
   */
  getHeros(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
              .toPromise()
              .then(respose => respose.json().data as Hero[])
              .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

}
