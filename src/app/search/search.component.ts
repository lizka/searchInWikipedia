import { SearchItem } from '../SearchItem';
import { FormControlName } from '@angular/forms/src/directives';
import { Observable } from 'rxjs/Rx';
import { WikiService } from '../wiki.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private results$: Observable<SearchItem[]>;
  private loading: Boolean = false;
  private searchInput: FormControl;

  constructor(private wikiService: WikiService) { }

  ngOnInit() {
    this.searchInput = new FormControl();
    this.results$ = this.searchInput.valueChanges
        .debounceTime(100)
        .distinctUntilChanged()
        .do(_ => this.loading = true)
        .switchMap(query => this.wikiService.search(query))
        .do(_ => this.loading = false);
  }

}
