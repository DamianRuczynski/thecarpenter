import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'tcp-paginator',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input() currentPage: number = 0;
  @Input() pageSize: number = 5;
  @Input() totalItems: number = 0;
  @Input() label: string = '';
  @Output() pageChange = new EventEmitter<number>();

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
  previousPage(): void {
    if (this.currentPage > 0) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }
  nextPage(): void {
    if (this.currentPage < this.getTotalPages() - 1) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}
