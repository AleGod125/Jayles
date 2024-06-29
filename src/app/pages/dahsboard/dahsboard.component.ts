import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dahsboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dahsboard.component.html',
  styleUrls: ['./dahsboard.component.css'] // Corrección de 'styleUrl' a 'styleUrls'
})
export class DahsboardComponent implements AfterViewInit {
  Catalogo: string = "Catalogo";

  ngAfterViewInit(): void {
    const carouselElement = document.querySelector('#carouselExampleSlidesOnly');
    if (carouselElement) {
      new (window as any).bootstrap.Carousel(carouselElement, {
        interval: 3000 
      });
    }
  }

  images: Array<{url: string, alt: string}> = [
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FgaL0znZDCifO0nkD4oD469n5aN1.jpg&w=256&q=75', alt: 'Imagen 1' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2Fx7phbLV4IpiOo3P8GUoGpz9Pjw0.jpg&w=256&q=75', alt: 'Imagen 2' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FzubzDKFoOH4VpfHWvLfhDss6fua.jpg&w=256&q=75', alt: 'Imagen 3' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FgaL0znZDCifO0nkD4oD469n5aN1.jpg&w=256&q=75', alt: 'Imagen 1' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2Fx7phbLV4IpiOo3P8GUoGpz9Pjw0.jpg&w=256&q=75', alt: 'Imagen 2' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FzubzDKFoOH4VpfHWvLfhDss6fua.jpg&w=256&q=75', alt: 'Imagen 3' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FgaL0znZDCifO0nkD4oD469n5aN1.jpg&w=256&q=75', alt: 'Imagen 1' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2Fx7phbLV4IpiOo3P8GUoGpz9Pjw0.jpg&w=256&q=75', alt: 'Imagen 2' },
    { url: 'https://www.cuevana3.eu/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FzubzDKFoOH4VpfHWvLfhDss6fua.jpg&w=256&q=75', alt: 'Imagen 3' }
  ];
}
