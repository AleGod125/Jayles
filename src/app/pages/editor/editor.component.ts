import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {
  colors: string[] = ['blue', 'red', 'green', 'yellow', 'white', 'black']
  Tallas: string[] = ['S', 'M', 'L', 'XL',];
  ;
  selectedColor: string = '';

  selectColor(color: string): void {
    this.selectedColor = color;
  }
}
