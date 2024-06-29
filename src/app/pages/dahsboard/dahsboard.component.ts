import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dahsboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dahsboard.component.html',
  styleUrls: ['./dahsboard.component.css'] // Corrección de 'styleUrl' a 'styleUrls'
})
export class DahsboardComponent implements AfterViewInit, OnInit {
  Catalogo: string = "Catalogo";
  images: Array<{url: string, alt: string}> = [
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FgaL0znZDCifO0nkD4oD469n5aN1.jpg&w=256&q=75', alt: 'Imagen 1' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2Fx7phbLV4IpiOo3P8GUoGpz9Pjw0.jpg&w=256&q=75', alt: 'Imagen 2' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FzubzDKFoOH4VpfHWvLfhDss6fua.jpg&w=256&q=75', alt: 'Imagen 3' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2F6BcxgP05jDip4Zjh2P5Be2aNi0Z.jpg&w=256&q=75', alt: 'Imagen 4' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FxhVW4nyo9xvjyeEgVcNkd26V2SB.jpg&w=256&q=75', alt: 'Imagen 5' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FkmHaXIfiFmOxiAy0X1OvpV1tTw5.jpg&w=256&q=75', alt: 'Imagen 6' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2Fi8UjdAwezeFHHR4opNb3LxDCQWC.jpg&w=256&q=75', alt: 'Imagen 7' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2F2VFzkPOygrZ2dFgMJuoFYE6Eocv.jpg&w=256&q=75', alt: 'Imagen 8' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2Fj61AYdBcEk6WZZzxmhfoNZccn4j.jpg&w=256&q=75', alt: 'Imagen 9' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FgaL0znZDCifO0nkD4oD469n5aN1.jpg&w=256&q=75', alt: 'Imagen 10' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2Fx7phbLV4IpiOo3P8GUoGpz9Pjw0.jpg&w=256&q=75', alt: 'Imagen 11' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FzubzDKFoOH4VpfHWvLfhDss6fua.jpg&w=256&q=75', alt: 'Imagen 12' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FgaL0znZDCifO0nkD4oD469n5aN1.jpg&w=256&q=75', alt: 'Imagen 13' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2Fx7phbLV4IpiOo3P8GUoGpz9Pjw0.jpg&w=256&q=75', alt: 'Imagen 14' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FzubzDKFoOH4VpfHWvLfhDss6fua.jpg&w=256&q=75', alt: 'Imagen 15' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FpbCfLF4pys3mXfpXsFtp7tMLtLb.jpg&w=256&q=75', alt: 'Imagen 16' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FzezbeSfNlizfIjmBd3Zff1H9DVE.jpg&w=256&q=75', alt: 'Imagen 17' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FqGLnbmNnOAI1IgjtWdfVWnJkGku.jpg&w=256&q=75', alt: 'Imagen 18' },
    
  ];
  paginatedImages: Array<{url: string, alt: string}> = [];
  currentPage: number = 1;
  itemsPerPage: number = 12;

  ngOnInit(): void {
    this.updatePaginatedImages();
  }

  updatePaginatedImages() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedImages = this.images.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedImages();
  }

  get totalPages(): number {
    return Math.ceil(this.images.length / this.itemsPerPage);
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
