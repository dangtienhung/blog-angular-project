import { Component, Input } from '@angular/core';
import { IPosts } from 'src/app/interfaces/Posts';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  @Input() searchResult!: IPosts[];
  @Input() isShowSearch!: boolean;

  handleClick() {
    this.isShowSearch = false;
    // console.log(this.isShowSearch);
  }
}
