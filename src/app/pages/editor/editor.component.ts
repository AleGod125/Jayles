import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, inject, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import html2canvas from 'html2canvas';
import { ShopService } from '../../service/shop.service';
import { KonvaService } from '../../service/konva.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements AfterViewInit {
  @ViewChild('editorShirtRef', { static: true }) editorShirtRef!: ElementRef<HTMLDivElement>;
  @ViewChild('editorShirtRefEspalda', { static: true }) editorShirtRefEspalda!: ElementRef<HTMLDivElement>;
  @ViewChild('editorShirtRefCostado', { static: true }) editorShirtRefCostado!: ElementRef<HTMLDivElement>;

  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('containerCostado', { static: true }) containerRefCostado!: ElementRef<HTMLDivElement>;
  @ViewChild('containerRefEspalda', { static: true }) containerRefEspalda!: ElementRef<HTMLDivElement>;

  
  @ViewChild('fileInput', { static: true }) fileInputRef!: ElementRef<HTMLInputElement>;

  constructor(
    private cdr: ChangeDetectorRef,
    private konvaService: KonvaService,
    private renderer: Renderer2
  ) { }

  colors: string[] = ['blue', 'yellow', 'green', 'grey', 'white', 'black'];
  Tallas: string[] = ['S', 'M', 'L', 'XL'];
  selectedColor: string = 'white';
  selectedTalla: string = '';
  selectedDiseño: string = '';
  selectedPosicion: string = "Editar Frente";
  camisaposicion: string[] = ["Editar Frente", "Editar Costado", "Editar Espalda"]
  camisaediorFrente: string = '/utils/blanca_frente.png';
  camisaediorEspalda: string = '/utils/Blanca_espalda.png';
  camisaediorCpstado: string = '/utils/blanca_costado.png';

  editingText = false;
  editText = '';

  private _compraService = inject(ShopService);
  private _router  = inject(Router);


  ngAfterViewInit() {
    this.inicializacionKovan()
    this.posiciondecamisas()
    this.fileInputRef.nativeElement.addEventListener('change', this.onFileChange.bind(this));
    this.cdr.detectChanges();
  }



  private onFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.konvaService.addImage(file);
    }
  }

  selectColor(color: string): void {
    this.selectedColor = color;
    this.selectedPosicion = "Editar Frente"
    switch (color) {
      case 'white':
        this.camisaediorFrente = '/utils/blanca_frente.png'
        this.camisaediorEspalda = '/utils/Blanca_espalda.png'
        this.camisaediorCpstado = '/utils/blanca_costado.png'
        break
      case 'black':
        this.camisaediorFrente = '/utils/Negro_Frente.png'
        this.camisaediorEspalda = '/utils/Negro_espalda.png'
        this.camisaediorCpstado = '/utils/Negro_costado.png'
    
        break
      case 'green':
        this.camisaediorFrente = '/utils/Green_frente.png'
        this.camisaediorEspalda = '/utils/Green_esplada.png'
        this.camisaediorCpstado = '/utils/Green_costado.png'
        break
      case 'grey':
        this.camisaediorFrente = '/utils/Gris_frente.png'
        this.camisaediorEspalda = '/utils/Gris_espalda.png'
        this.camisaediorCpstado = '/utils/Gris_costado.png'
        break
      case 'yellow':
        this.camisaediorFrente = '/utils/Yellow_frente.png'
        this.camisaediorEspalda = '/utils/Yellow_espalda.png'
        this.camisaediorCpstado = '/utils/Yellow_costado.png'
        break
      case 'blue':
        this.camisaediorFrente = '/utils/Azul_Frente.png'
        this.camisaediorEspalda = '/utils/Azul_esplada.png'
        this.camisaediorCpstado = '/utils/Azul_Costado.png'
        break


    }
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
    this.konvaService.drawText(this.editText);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Delete') {
      this.konvaService.deleteSelected();
    }
  }

  clearCanvas() {
    this.konvaService.clearCanvas();
  }

  agregarCompra() {
    this._compraService.agregarCompra(this.selectedColor, this.selectedTalla, this.selectedDiseño, 1, 25000);
    this.selectedTalla = '';
    this.selectedColor = '';
    this.selectedDiseño = '';
  }

  async boton() {
    if(this.selectedTalla === ""){
      alert("Que no se el olvide Sleecionar la talla!!!")
      return
    }else {
      await this.captureEditorShirt();
      this.agregarCompra();
      this._router.navigate(['/pago']);
    }
    
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

  cambio(posicion: string): void {
    this.selectedPosicion = posicion;
    this.cdr.detectChanges();
    this.posiciondecamisas()
  }
  private posiciondecamisas() {

    if (this.selectedPosicion === 'Editar Frente') {
      this.editorShirtRef.nativeElement.style.display="flex"
      this.editorShirtRefCostado.nativeElement.style.display = 'none';
      this.editorShirtRefEspalda.nativeElement.style.display = 'none';
    } else if (this.selectedPosicion === 'Editar Costado') {
      this.editorShirtRef.nativeElement.style.display="none"
      this.editorShirtRefCostado.nativeElement.style.display = 'flex';
      this.editorShirtRefEspalda.nativeElement.style.display = 'none';
    } else if (this.selectedPosicion === 'Editar Espalda') {
      this.editorShirtRef.nativeElement.style.display="none"
      this.editorShirtRefCostado.nativeElement.style.display = 'none';
      this.editorShirtRefEspalda.nativeElement.style.display = 'flex';
    }
  }

  private inicializacionKovan(){
    if (this.containerRef && this.containerRefCostado && this.containerRefEspalda) {
    this.konvaService.initializeKonva(this.containerRef.nativeElement);
    this.konvaService.initializeKonva(this.containerRefCostado.nativeElement);
    this.konvaService.initializeKonva(this.containerRefEspalda.nativeElement);
  } else {
    console.error('Uno o más contenedores de Konva no están definidos.');
  }
}
}