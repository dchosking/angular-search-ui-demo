import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-pagination',
  templateUrl: './search-pagination.component.html',
  styleUrls: ['./search-pagination.component.scss']
})
export class SearchPaginationComponent {

  @Input()
  public totalPages!: number;

  @Output()
  public pageChanged = new EventEmitter<number>();

}
