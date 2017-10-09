import { Observable } from 'rxjs/Rx';
import { SearchItem } from './SearchItem';
import { Injectable } from '@angular/core';
import { Jsonp, Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

@Injectable()
export class WikiService {

  constructor(private jsonp: Jsonp) { }

  search(query: string) {
    try {
      const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&generator=links&list=search&srsearch=${query}&utf8=1&limit=20&callback=JSONP_CALLBACK`;

      return this.jsonp.request(apiUrl)
        .map(res => {
          if (res.json().query) {
            return res.json().query.search.map(item => {
              return new SearchItem(
                item.title,
                item.wordcount
              );
            });
          }
        });
    } catch (error) {
      return Observable.empty<Response>();
    }

  }
}
