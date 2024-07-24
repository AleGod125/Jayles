import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {


  private localStoragekey = 'Shopkey';

  getCompra():{ color: string; talla: string, img:string }[]{
    return JSON.parse(localStorage.getItem(this.localStoragekey)as string) ||[]
  }

  AgregarCompra(color: string, talla: string, img:string): void {
    const compra = this.getCompra();
    compra.push({ color, talla, img });
    localStorage.setItem(this.localStoragekey, JSON.stringify(compra));
  }

  Eliminar(index:number){
    const compra = this.getCompra();
    compra.splice(index, 1)
    localStorage.setItem(this.localStoragekey, JSON.stringify(compra));
  }

}
