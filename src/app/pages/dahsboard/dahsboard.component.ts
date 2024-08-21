import { Component, AfterViewInit, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FirebaseService } from '../../service/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoadingComponent } from '../../Dialogs/dialog-loading/dialog-loading.component';

@Component({
  selector: 'app-dahsboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dahsboard.component.html',
  styleUrls: ['./dahsboard.component.css']
})
export class DahsboardComponent implements AfterViewInit {
  Catalogo: string = "Catalogo";
  file!: File;

  private _FirebaseStorage = inject(FirebaseService);
  readonly dialog = inject(MatDialog);

  catalogoImages = this._FirebaseStorage.getCatalogoImages();
  promocionesImages = this._FirebaseStorage.getPromocionesImages();

  ngAfterViewInit(): void {
   // this.openDialog()
    this.firebase()
    const carouselElement = document.querySelector('#carouselExampleSlidesOnly');
    if (carouselElement) {
      new (window as any).bootstrap.Carousel(carouselElement, {
        interval: 3000
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogLoadingComponent);

    setTimeout(() => {
      dialogRef.close();
    }, 3000);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  


  firebase() {
     this._FirebaseStorage.listImages('promociones');
     this._FirebaseStorage.listImages('catalogo');

  }


}
