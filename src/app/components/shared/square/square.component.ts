import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './square.component.html',
  styleUrl: './square.component.scss'
})
export class SquareComponent {
  @Input() id: number;
  @Input() content: string | number;
  @Output() onSelectPostEmitter = new EventEmitter<number>();

  onClickPost(id: number) {
    this.onSelectPostEmitter.emit(id);
  }
}
