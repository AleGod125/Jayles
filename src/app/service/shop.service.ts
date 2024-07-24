import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private localStorageKey = 'ShopKey';

  getCompra(): { color: string; talla: string; img: string; quantity: number; price: number }[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) as string) || [];
  }

  agregarCompra(color: string, talla: string, img: string, quantity: number, price: number): void {
    const compra = this.getCompra();
    compra.push({ color, talla, img, quantity, price });
    localStorage.setItem(this.localStorageKey, JSON.stringify(compra));
  }

  eliminar(index: number): void {
    const compra = this.getCompra();
    compra.splice(index, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(compra));
  }

  actualizarCompra(index: number, quantity: number, price: number): void {
    const compra = this.getCompra();
    compra[index].quantity = quantity;
    compra[index].price = price;
    localStorage.setItem(this.localStorageKey, JSON.stringify(compra));
  }
}
