import { Component, OnInit, AfterViewInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { FirebaseService } from '../../service/firebase.service';

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
  searchTerm = signal<string>('');

  
  private _FirebaseStorage = inject(FirebaseService);
  images = this._FirebaseStorage.getCatalogoImages(); 




  async ngOnInit(): Promise<void> {
    this._FirebaseStorage.listImages('catalogo')
  }

  getFilteredImages() {
    const term = this.searchTerm().toLowerCase();
    return this.images().filter(image => image.alt.toLowerCase().includes(term));
  }


}
