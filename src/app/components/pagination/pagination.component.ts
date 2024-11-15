import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() totalPages! :number
  @Output() load = new EventEmitter<number>();
  currentPage = 1



  loadPage(page: number) {
    this.load.emit(page);
    this.currentPage = page
  }

}
