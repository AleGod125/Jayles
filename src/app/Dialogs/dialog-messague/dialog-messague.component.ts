import { Component, Inject, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-messague',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-messague.component.html',
  styleUrl: './dialog-messague.component.css'
})
export class DialogMessagueComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { Mensaje: string }) {}

  fechaEntrga: any = "";


}
