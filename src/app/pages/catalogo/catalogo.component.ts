import { Component, OnInit, AfterViewInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { listAll } from 'firebase/storage';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements  OnInit {
  Caralogo: string = "Catalogo";
  file!: File;
  images = signal<{url: string, alt: string}[]>([]);
  searchTerm = signal<string>('');

  private readonly _storage = inject(Storage);



  async ngOnInit(): Promise<void> {
    const storageRef = ref(this._storage, 'catalogo');
    const images = await listAll(storageRef);
    
    const imageUrls = await Promise.all(images.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return { url, alt: itemRef.name };
    }));

    this.images.set(imageUrls);
  }

  getFilteredImages() {
    const term = this.searchTerm().toLowerCase();
    return this.images().filter(image => image.alt.toLowerCase().includes(term));
  }


}
