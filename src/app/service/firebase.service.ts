import { Injectable, inject, signal } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL, listAll } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private _storage = inject(Storage);
  catalogoImages = signal<{ url: string, alt: string }[]>([]);
  promocionesImages = signal<{ url: string, alt: string }[]>([]);

  // Function to upload an image to Firebase Storage
  uploadImage(file: File, carpeta: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const storageRef = ref(this._storage, `${carpeta}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        () => { },
        (error) => reject(error),
        () => resolve()
      );
    });
  }

  // Function to list images from a specific folder
  async listImages(carpeta: string): Promise<void> {
    try {
      const storageRef = ref(this._storage, carpeta);
      const images = await listAll(storageRef);

      const imageUrls = await Promise.all(images.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return { url, alt: itemRef.name };
      }));

      if (carpeta === 'catalogo') {
        this.catalogoImages.set(imageUrls);
      } else if (carpeta === 'promociones') {
        this.promocionesImages.set(imageUrls);
      }
    } catch (error) {
      console.error('Error listing images:', error);
    }
  }

  getCatalogoImages() {
    return this.catalogoImages.asReadonly();
  }

  getPromocionesImages() {
    return this.promocionesImages.asReadonly();
  }
}

