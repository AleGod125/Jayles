import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogLoadingComponent } from '../../Dialogs/dialog-loading/dialog-loading.component';
@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent {


}

