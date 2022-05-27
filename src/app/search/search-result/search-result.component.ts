import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {
  @Input()
  public result: any;

  constructor() { }

  public imageSrc(id: any) {
    return `https://art.hearthstonejson.com/v1/render/latest/enUS/512x/${id}.png`;
  }
}
