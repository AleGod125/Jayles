import { Component, AfterViewInit, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Storage, ref, uploadBytesResumable, percentage, getDownloadURL } from '@angular/fire/storage';
import { listAll } from 'firebase/storage';
import { RouterLink } from '@angular/router';

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
  images = signal<{url: string, alt: string}[]>([]);
  currentPage: number = 1;
  itemsPerPage: number = 12;

  private readonly _storage = inject(Storage);

  changeInput(event: Event): void {
    console.log(this._storage);
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.file = input.files[0];
      this.uploadFile();
    }
  }

  uploadFile(): void {
    const storageRef = ref(this._storage, `catalogo/${this.file.name}`);
    uploadBytesResumable(storageRef, this.file);
   
  }

  async ngOnInit(): Promise<void> {
    const storageRef = ref(this._storage, 'catalogo');
    const images = await listAll(storageRef);
    
    const imageUrls = await Promise.all(images.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return { url, alt: itemRef.name };
    }));

    this.images.set(imageUrls);
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
