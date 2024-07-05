import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {
  colors: string[] = ['blue', 'red', 'green', 'yellow', 'white', 'black']
  Tallas: string[] = ['S', 'M', 'L', 'XL',];
  camisa: string = 'https://static.vecteezy.com/system/resources/previews/008/534/684/original/white-t-shirt-mockup-cutout-file-png.png'
  selectedColor: string = '';

  selectColor(color: string): void {
    this.selectedColor = color;
    alert(color)
  }
}
