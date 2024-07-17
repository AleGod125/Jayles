import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  colors: string[] = ['blue', 'red', 'green', 'yellow', 'white', 'black'];
  Tallas: string[] = ['S', 'M', 'L', 'XL'];
  camisa: string = "";
  selectedColor: string = '';
  camisaedior: string = 'https://static.vecteezy.com/system/resources/previews/008/534/684/original/white-t-shirt-mockup-cutout-file-png.png'
  editingText = false;
  editText = '';
  
  ngAfterViewInit(): void {
    if (this.camisa) {
      this.paintImage(this.camisa);
    }
  }

  selectColor(color: string): void {
    this.selectedColor = color;
    alert(color);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          this.paintImage(img.src);
        };
        img.src = e.target!.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  paintImage(src: string): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const ctx = canvasEl.getContext('2d');
    const img = new Image();
    img.onload = () => {
      const scale = 0.5;
      const x = (canvasEl.width * scale) / 2;
      const y = (canvasEl.height * scale) / 2;
      ctx!.drawImage(img, x, y, (canvasEl.width / 2), (canvasEl.height/2)); // Draw the image scaled to 50% and centered
    };
    img.src = src;
  }
  startEdit(): void {
    this.editingText = true;
  }
  
  finishEdit(): void {
    this.editingText = false;
    this.drawText(this.editText);
  }
  drawText(text: string): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const ctx = canvasEl.getContext('2d');
    if (ctx) {
      ctx.font = '20px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.fillText(text, canvasEl.width / 2, canvasEl.height / 2);
    }
  }

  clear(){
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const ctx = canvasEl.getContext('2d');
    ctx!.clearRect(0, 0, canvasEl.width, canvasEl.height); // Clear the canvas
  }
}  