import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private localStorageKey = 'ShopKey';
  private comprasSubject = new BehaviorSubject(this.getCompra());
  compras$ = this.comprasSubject.asObservable();

  getCompra(): { color: string; talla: string; img: string[]; quantity: number; price: number; estanpado:string }[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) as string) || [];
  }

  agregarCompra(color: string, talla: string, img: string[], quantity: number, price: number, estanpado:string): void {
    const compra = this.getCompra();
    compra.push({ color, talla, img, quantity, price, estanpado });
    localStorage.setItem(this.localStorageKey, JSON.stringify(compra));
    this.comprasSubject.next(compra);
  }

  eliminar(index: number): void {
    const compra = this.getCompra();
    compra.splice(index, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(compra));
    this.comprasSubject.next(compra);
  }

  actualizarCompra(index: number, quantity: number, price: number): void {
    const compra = this.getCompra();
    compra[index].quantity = quantity;
    compra[index].price = price;
    localStorage.setItem(this.localStorageKey, JSON.stringify(compra));
    this.comprasSubject.next(compra);
  }
}
