import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { DialogMessagueComponent } from '../../Dialogs/dialog-messague/dialog-messague.component';
import { ErrorDialogComponent } from '../../Dialogs/error-dialog/error-dialog.component';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule], // Include CommonModule here
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent {
  readonly dialog = inject(MatDialog);
  dialogRef: any;
  fechaEntrga: any;
  formValid: { [key: string]: boolean } = {};
  formTouched: { [key: string]: boolean } = {};
  formSubmitted = false;

  validateFields(): boolean {
    const nombre = (document.getElementById('nombre') as HTMLInputElement).value.trim();
    const apellidos = (document.getElementById('apellidos') as HTMLInputElement).value.trim();
    const telefono = (document.getElementById('telefono') as HTMLInputElement).value.trim();
    const ciudad = (document.getElementById('ciudad') as HTMLSelectElement).value.trim();
    const barrio = (document.getElementById('barrio') as HTMLInputElement).value.trim();
    const direccion = (document.getElementById('direccion') as HTMLInputElement).value.trim();

    this.formValid = {
      nombre: !!nombre,
      apellidos: !!apellidos,
      telefono: !!telefono,
      ciudad: !!ciudad,
      barrio: !!barrio,
      direccion: !!direccion
    };

    return Object.values(this.formValid).every(valid => valid);
  }

  Messague(errorMessage: string) {
    this.dialog.open(DialogMessagueComponent, {
      data: { Mensaje: errorMessage }
    });
  }
  
  showErrorDialog(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: { Mensaje: errorMessage }
    });
  }

  seleccionarMetodo(metodo: string) {
    this.formSubmitted = true; // Mark the form as submitted
    if (this.validateFields()) {
      if (metodo === 'Recogelo tu mismo') {
        this.mensajeRecoger();
      } else {
        this.Messague(`Has seleccionado el método de pago: ${metodo}`);
      }
    } else {
      this.showErrorDialog('Por favor, complete todos los campos requeridos.');
    }
  }

  mensajeRecoger() {
    this.Messague(`Ahora puedes recoger tu paquete en #### \n recuerda que tu pedido estará listo en 24 Horas así que esperamos el ${this.fechaEntrga} desde las 8AM hasta las 6PM`);
  }

  ngAfterViewInit() {
    this.ObtenerFecha();
  }

  ObtenerFecha() {
    const fechaActual = new Date();
    const fechaCon24Horas = new Date(fechaActual.getTime() + 24 * 60 * 60 * 1000);

    const opciones: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    };

    this.fechaEntrga = fechaCon24Horas.toLocaleDateString('es-CO', opciones);
  }

  onFieldBlur(field: string) {
    this.formTouched[field] = true; // Mark field as touched
  }
}
