import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-loading',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-loading.component.html',
  styleUrl: './dialog-loading.component.css'
})



export class DialogLoadingComponent implements AfterViewInit {

  fechaEntrga: any = "";
  Conteido: string = "";

  ngAfterViewInit(){
    this.ObtenerFecha()
  }

  ObtenerFecha() {
    const fechaActual = new Date();
    const fechaCon24Horas = new Date(fechaActual.getTime() + 24 * 60 * 60 * 1000);

    this.fechaEntrga = fechaCon24Horas

    this.Conteido = `Genial, puedes recoger tu pedido en una sede ubicada en ####  después de 24 horas,\n es decir, el ${this.fechaEntrga.toLocaleDateString()}`;
    }
}
