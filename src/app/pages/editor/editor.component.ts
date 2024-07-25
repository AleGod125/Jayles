import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import html2canvas from 'html2canvas';
import Konva from 'konva';
import { ShopService } from '../../service/shop.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements AfterViewInit {
  @ViewChild('editorShirtRef', { static: true }) editorShirtRef!: ElementRef<HTMLDivElement>;
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('fileInput', { static: true }) fileInputRef!: ElementRef<HTMLInputElement>;
  constructor(private cdr: ChangeDetectorRef) {}

  colors: string[] = ['blue', 'red', 'green', 'yellow', 'white', 'black'];
  Tallas: string[] = ['S', 'M', 'L', 'XL'];
  camisa: string = "";
  selectedColor: string = '';
  selectedTalla: string = '';
  selectedDiseño: string = '';
  camisaedior: string = '/utils/white-t-shirt-mockup-cutout-file-png.webp';
  editingText = false;
  editText = '';

  private stage!: Konva.Stage;
  private layer!: Konva.Layer;
  private transformer!: Konva.Transformer;
  private selectionRectangle!: Konva.Rect;
  private selecting = false;
  private x1 = 0;
  private y1 = 0;
  private x2 = 0;
  private y2 = 0;

  private _compraService = inject(ShopService)

  ngAfterViewInit() {
    this.initializeKonva();
    this.fileInputRef.nativeElement.addEventListener('change', this.onFileChange.bind(this));
    this.cdr.detectChanges();
  }

  private initializeKonva() {
    const container = this.containerRef.nativeElement;
    if (!container.clientWidth || !container.clientHeight) {
      setTimeout(() => this.initializeKonva(), 100); // Reintenta la inicialización
      return;
    }
  
    const width = container.clientWidth;
    const height = container.clientHeight;
  
    this.stage = new Konva.Stage({
      container: container,
      width: width,
      height: height,
    });
  
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
  
    this.transformer = new Konva.Transformer();
    this.layer.add(this.transformer);
  
    this.selectionRectangle = new Konva.Rect({
      fill: 'rgba(0,0,255,0.5)',
      visible: false,
      listening: false,
    });
    this.layer.add(this.selectionRectangle);
  
    this.stage.on('mousedown touchstart', this.onStartSelection.bind(this));
    this.stage.on('mousemove touchmove', this.onMoveSelection.bind(this));
    this.stage.on('mouseup touchend', this.onEndSelection.bind(this));
    this.stage.on('click tap', this.onStageClick.bind(this));
  }
  
  private onStartSelection(e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) {
    if (e.target !== this.stage) return;

    e.evt.preventDefault();
    const pointer = this.stage.getPointerPosition();
    if (!pointer) return;

    this.x1 = pointer.x;
    this.y1 = pointer.y;
    this.x2 = this.x1;
    this.y2 = this.y1;

    this.selectionRectangle.width(0);
    this.selectionRectangle.height(0);
    this.selecting = true;
  }

  private onMoveSelection(e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) {
    if (!this.selecting) return;

    e.evt.preventDefault();
    const pointer = this.stage.getPointerPosition();
    if (!pointer) return;

    this.x2 = pointer.x;
    this.y2 = pointer.y;

    this.selectionRectangle.setAttrs({
      visible: true,
      x: Math.min(this.x1, this.x2),
      y: Math.min(this.y1, this.y2),
      width: Math.abs(this.x2 - this.x1),
      height: Math.abs(this.y2 - this.y1),
    });
  }

  private onEndSelection(e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) {
    this.selecting = false;
    if (!this.selectionRectangle.visible()) return;

    e.evt.preventDefault();
    this.selectionRectangle.visible(false);

    const shapes = this.stage.find('.rect');
    const box = this.selectionRectangle.getClientRect();
    const selected = shapes.filter((shape) =>
      Konva.Util.haveIntersection(box, shape.getClientRect())
    );
    this.transformer.nodes(selected);
  }

  private onStageClick(e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) {
    if (this.selectionRectangle.visible()) return;

    if (e.target === this.stage) {
      this.transformer.nodes([]);
      return;
    }

    if (!e.target.hasName('rect')) return;

    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = this.transformer.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
      this.transformer.nodes([e.target]);
    } else if (metaPressed && isSelected) {
      const nodes = this.transformer.nodes().slice();
      nodes.splice(nodes.indexOf(e.target), 1);
      this.transformer.nodes(nodes);
    } else if (metaPressed && !isSelected) {
      const nodes = this.transformer.nodes().concat([e.target]);
      this.transformer.nodes(nodes);
    }
  }

  private onFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.addImage(file);
    }
  }

  private addImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const konvaImage = new Konva.Image({
          x: 80,
          y: 80,
          image: img,
          width: img.width / 2,
          height: img.height / 2,
          name: 'rect',
          draggable: true,
        });
        this.layer.add(konvaImage);
        this.layer.draw();
        this.transformer.nodes([konvaImage]);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
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
    const textNode = new Konva.Text({
      x: 50,
      y: 70,
      fontSize: 30,
      text: text,
      name: 'rect',
      draggable: true,
    });
    this.layer.add(textNode);
    this.layer.draw();
    this.transformer.nodes([textNode]);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Delete') {
      this.deleteSelected();
    }
  }

  deleteSelected() {
    const selectedNodes = this.transformer.nodes();
    selectedNodes.forEach(node => {
      node.remove();
    });
    this.transformer.nodes([]);
    this.layer.draw();
  }

  clearCanvas() {
    this.layer.removeChildren();
    this.layer.draw();
    this.transformer.nodes([]);
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
