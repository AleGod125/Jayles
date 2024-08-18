import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-loading',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-loading.component.html',
  styleUrl: './dialog-loading.component.css'
})



export class DialogLoadingComponent {


}
