import { Component, AfterViewInit, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FirebaseService } from '../../service/firebase.service';

@Component({
  selector: 'app-dahsboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dahsboard.component.html',
  styleUrls: ['./dahsboard.component.css']
})
export class DahsboardComponent implements AfterViewInit, OnInit {
  Catalogo: string = "Catalogo";
  file!: File;

  private _FirebaseStorage = inject(FirebaseService);
  catalogoImages = this._FirebaseStorage.getCatalogoImages();
  promocionesImages = this._FirebaseStorage.getPromocionesImages();

  changeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.file = input.files[0];
      this.uploadFile();
    }
  }

  uploadFile(): void {
    this._FirebaseStorage.uploadImage(this.file, 'catalogo')
      .then(() => {
        this._FirebaseStorage.listImages('catalogo');
      });
  }

  async ngOnInit(): Promise<void> {
    await this._FirebaseStorage.listImages('promociones');
    await this._FirebaseStorage.listImages('catalogo');
  }

  ngAfterViewInit(): void {
    const carouselElement = document.querySelector('#carouselExampleSlidesOnly');
    if (carouselElement) {
      new (window as any).bootstrap.Carousel(carouselElement, {
        interval: 3000
      });
    }
  }
}
