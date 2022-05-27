import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {SearchResultComponent} from "./search/search-result/search-result.component";
import {SearchPaginationComponent} from "./search/search-pagination/search-pagination.component";
import {SearchFacetComponent} from "./search/search-facet/search-facet.component";
import {SearchHeaderComponent} from "./search/search-header/search-header.component";
import {SearchSectionComponent} from "./search/search-section/search-section.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SearchSectionComponent,
    SearchHeaderComponent,
    SearchFacetComponent,
    SearchPaginationComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    NgbPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
