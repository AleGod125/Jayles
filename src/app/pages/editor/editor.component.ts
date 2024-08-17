import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, inject, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import html2canvas from 'html2canvas';
import { ShopService } from '../../service/shop.service';
import { KonvaService } from '../../service/konva.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoadingComponent } from '../../Dialogs/dialog-loading/dialog-loading.component';
import { ErrorDialogComponent } from '../../Dialogs/error-dialog/error-dialog.component';

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
  ) { }

  colors: string[] = ['blue', 'yellow', 'green', 'grey', 'white', 'black'];
  Tallas: string[] = ['S', 'M', 'L', 'XL'];
  selectedColor: string = 'white';
  selectedTalla: string = '';
  selectedDiseño: string[] = [];
  selectedPosicion: string = "Editar Frente";
  camisaposicion: string[] = ["Editar Frente", "Editar Costado", "Editar Espalda"]
  camisaediorFrente: string = '/utils/blanca_frente.png';
  camisaediorEspalda: string = '/utils/Blanca_espalda.png';
  camisaediorCpstado: string = '/utils/blanca_costado.png';
  nameEstanpado: string = "Diseño Perzonalizado"
  editingText = false;
  editText = '';
  dialogRef: any

  private _compraService = inject(ShopService);
  private _router = inject(Router);
  readonly dialog = inject(MatDialog);



  ngAfterViewInit() {
    this.inicializacionKovan()
    this.posiciondecamisas()
    this.fileInputRef.nativeElement.addEventListener('change', this.onFileChange.bind(this));
    this.cdr.detectChanges();
  }

  openDialog() {
    this.dialogRef = this.dialog.open(DialogLoadingComponent);

    this.dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  showErrorDialog(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: { Mensaje: errorMessage }
    });
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
    try {
      this._compraService.agregarCompra(this.selectedColor, this.selectedTalla, this.selectedDiseño, 1, 15000, this.nameEstanpado);
      this.selectedTalla = '';
      this.selectedColor = '';
      this._router.navigate(['/pago']);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        this.showErrorDialog("Tu Carrito está lleno!!! \n Por favor, termina tus compras pendientes para poder continuar.");
      } else {
        console.error('Error inesperado:', error);
        alert('Ocurrió un error inesperado al intentar guardar la compra.');
      }
    }
  }
  

  async boton() {
    if (this.selectedTalla === "") {
      this.showErrorDialog("Señecciona una talla antes de continuar!!!");
    } else {
      this.captureEditorShirt();
      this.openDialog();
    }

  }

  captureEditorShirt(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const containers = [
          { ref: this.editorShirtRef, container: this.containerRef },
          { ref: this.editorShirtRefCostado, container: this.containerRefCostado },
          { ref: this.editorShirtRefEspalda, container: this.containerRefEspalda }
        ];

        this.selectedDiseño = [];

        for (const { ref, container } of containers) {
          const editorShirt = ref?.nativeElement;
          if (editorShirt) {
            const originalBorder = container.nativeElement.style.border;

            container.nativeElement.style.border = 'none';
            this.editorShirtRef.nativeElement.style.display = "flex"
            this.editorShirtRefCostado.nativeElement.style.display = "flex"
            this.editorShirtRefEspalda.nativeElement.style.display = "flex"

            const canvas = await html2canvas(editorShirt);
            const dataURL = canvas.toDataURL('image/png');
            this.selectedDiseño.push(dataURL);
            
            if(this.selectedDiseño.length===3){
              this.agregarCompra()
              this.dialogRef.close();
            }

            this.posiciondecamisas()

            container.nativeElement.style.border = originalBorder;
          } else {
            console.error('Uno de los elementos editorShirt no está definido.');
          }
        }

        resolve();
      } catch (err) {
        console.error('Error al capturar el diseño:', err);
        reject(err);
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
      this.editorShirtRef.nativeElement.style.display = "flex"
      this.editorShirtRefCostado.nativeElement.style.display = 'none';
      this.editorShirtRefEspalda.nativeElement.style.display = 'none';
    } else if (this.selectedPosicion === 'Editar Costado') {
      this.editorShirtRef.nativeElement.style.display = "none"
      this.editorShirtRefCostado.nativeElement.style.display = 'flex';
      this.editorShirtRefEspalda.nativeElement.style.display = 'none';
    } else if (this.selectedPosicion === 'Editar Espalda') {
      this.editorShirtRef.nativeElement.style.display = "none"
      this.editorShirtRefCostado.nativeElement.style.display = 'none';
      this.editorShirtRefEspalda.nativeElement.style.display = 'flex';
    }
  }

  private inicializacionKovan() {
    if (this.containerRef && this.containerRefCostado && this.containerRefEspalda) {
      this.konvaService.initializeKonva(this.containerRef.nativeElement);
      this.konvaService.initializeKonva(this.containerRefCostado.nativeElement);
      this.konvaService.initializeKonva(this.containerRefEspalda.nativeElement);
    } else {
      console.error('Uno o más contenedores de Konva no están definidos.');
    }
  }

}