import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterLink } from '@angular/router'; // Asegúrate de importar Router aquí
import html2canvas from 'html2canvas';
import { ShopService } from '../../service/shop.service';
import { KonvaService } from '../../service/kovan.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements AfterViewInit {
  
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('fileInput', { static: true }) fileInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('editorShirt', { static: true }) editorShirtRef!: ElementRef<HTMLDivElement>;

  colors: string[] = ['blue', 'red', 'green', 'yellow', 'white', 'black'];
  Tallas: string[] = ['S', 'M', 'L', 'XL'];
  camisa: string = "";
  selectedColor: string = '';
  selectedTalla: string = '';
  selectedDiseño: string = '';
  camisaedior: string = '/utils/white-t-shirt-mockup-cutout-file-png.webp';
  editingText = false;
  editText = '';

  private _compraService = inject(ShopService);
  private _konvaService = inject(KonvaService);

  ngAfterViewInit() {
    const container = this.containerRef.nativeElement;
    this._konvaService.initialize(container, container.clientWidth, container.clientHeight);
  }

   onFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this._konvaService.addImage(file);
    }
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  selectTalla(talla: string): void {
    this.selectedTalla = talla;
  }

  selectdiseño(diseño: string): void {
    this.selectedDiseño = diseño;
  }

  startEdit(): void {
    this.editingText = true;
  }

  finishEdit(): void {
    this.editingText = false;
    this.drawText(this.editText);
  }

  drawText(text: string): void {
    this._konvaService.drawText(text);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Delete') {
      this._konvaService.deleteSelected();
    }
  }

  clearCanvas() {
    this._konvaService.clearCanvas();
  }

  agregarCompra() {
    this._compraService.agregarCompra(this.selectedColor, this.selectedTalla, this.selectedDiseño, 1, 25000);
    this.selectedTalla = '';
    this.selectedColor = '';
    this.selectedDiseño = '';
  }

  async boton() {
    await this.captureEditorShirt();
    this.agregarCompra();
  }

  captureEditorShirt(): Promise<void> {
    return new Promise((resolve, reject) => {
      const editorShirt = this.editorShirtRef?.nativeElement;
      if (editorShirt) {
        const container = this.containerRef.nativeElement;
  
        const originalBorder = container.style.border;
  
        container.style.border = 'none';
  
        html2canvas(editorShirt).then(canvas => {
          const dataURL = canvas.toDataURL('image/png');
  
          container.style.border = originalBorder;
  
          this.selectedDiseño = dataURL;
          resolve();
        }).catch(err => {
          container.style.border = originalBorder;
          reject(err);
        });
      } else {
        console.error('El elemento editorShirt no está definido.');
        reject('El elemento editorShirt no está definido.');
      }
    });
  }
  
}
