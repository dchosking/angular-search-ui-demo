import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFacetComponent } from './search-facet.component';

describe('SearchFacetComponent', () => {
  let component: SearchFacetComponent;
  let fixture: ComponentFixture<SearchFacetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFacetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFacetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
