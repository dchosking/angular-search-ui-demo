import {Component, OnInit} from '@angular/core';
import {SearchDriver} from "@elastic/search-ui";
import config from "../search.config";
import {FormBuilder, Validators} from "@angular/forms";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.scss']
})
export class SearchSectionComponent implements OnInit {

  private driver!: SearchDriver;

  public searchState: any = {};

  public resultsPerPage: number | undefined = 20;
  public sortBy: string | undefined = "relevance";
  public searchInputValue: string | undefined = "";
  public facets: Record<string, any> = {}

  public get hasFacets(): boolean {
    return this.searchState?.facets && Object.keys(this.searchState.facets).length > 0
  }

  public get thereAreResults() {
    return this.searchState?.totalResults && this.searchState.totalResults > 0;
  }

  public searchForm = this._formBuilder.group({
    searchInputValue: ['', Validators.required]
  });
  public initialized: boolean = false;

  constructor(private _formBuilder: FormBuilder) {
    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.searchInputValue = this.searchForm.value.searchInputValue;
        if(this.searchInputValue) {
          this.driver.getActions().setSearchTerm(this.searchInputValue);
        }
      })
  }

  public ngOnInit(): void {
    this.driver = new SearchDriver(config);
    const {
      searchTerm,
      sortField,
      resultsPerPage,
      filters,
      facets
    } = this.driver.getState();

    this.searchInputValue = searchTerm;
    this.searchForm.patchValue({searchInputValue: this.searchInputValue});
    this.sortBy = sortField;
    this.resultsPerPage = resultsPerPage;
    for (const facet of config.searchQuery.disjunctiveFacets) {
      this.facets[facet] = [];
    }

    if(filters) {
      filters.forEach(filter => {
        if (facets[filter.field][0].type === "range") {
          this.facets[filter.field] = filter.values.map(value => (<any>value).name);
        } else {
          this.facets[filter.field] = filter.values;
        }
      });
    }

    this.driver.subscribeToStateChanges(state => {
      this.searchState = state;
    });
    this.initialized = true;
  }

  public handleFacetChange(event: { target: { value: any; checked: any; }; }, facet: string): void {
    const {value, checked} = event.target;
    const facetFromDriver = this.driver.getState().facets[facet][0];
    const valueforApi =
      facetFromDriver.type === "range"
        ? facetFromDriver.data.find((item: { value: { name: any; }; }) => item.value.name === value).value
        : value;

    if (checked) {
      this.facets[facet].push(value);
      this.driver.addFilter(facet, valueforApi, "any");
    } else {
      const index = this.facets[facet].indexOf(value);
      if (index > -1) {
        this.facets[facet].splice(index, 1);
      }
      this.driver.removeFilter(facet, valueforApi, "any");
    }
  }

  public setCurrentPage(page: number) {
    this.driver.setCurrent(page);
  }

}
