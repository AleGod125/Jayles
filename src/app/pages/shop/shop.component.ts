import {Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ShopService } from '../../service/shop.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit  {
 

  private _compraService = inject(ShopService);
  quantities: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  editingText = false;
  editText = '11';
  mayor: string = "+10";
  precioUnitario = 15000;
  listaCompra: { color: string; talla: string; img: string[]; quantity: number; price: number; estanpado:string }[] = [];
  subtotal: number = 0;
  

  ngOnInit() {
    this._compraService.compras$.subscribe(compras => {
      this.listaCompra = compras;
      this.updateSubtotal()
     this.listaCompra.forEach(compra => {
      console.log('Imágenes de la compra:', compra.img);
    });
  });
  }

  ElminarTarea(index: number) {
    this._compraService.eliminar(index);
    this.listaCompra = this._compraService.getCompra().map(compra => ({ ...compra, cantidad: 1, precio: this.precioUnitario }));
    this.updateSubtotal();
  }

  onQuantityChange(event: Event, index: number): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = parseInt(selectElement.value);
    if (selectedValue === 0) {
      this.ElminarTarea(index);
    } else {
      const compra = this.listaCompra[index];
      const newPrice = 15000 * selectedValue; 
      compra.quantity = selectedValue;
      compra.price = newPrice;
      this._compraService.actualizarCompra(index, selectedValue, newPrice);
      this.updateSubtotal();
    }

  }

  updateSubtotal(): void {
    this.subtotal = this.listaCompra.reduce((acc, compra) => acc + compra.price, 0);
  }

  finishEdit(): void {
    this.editingText = false;
    this.mayor = this.editText;
  }

  startEdit(): void {
    this.editingText = true;
  }
}
