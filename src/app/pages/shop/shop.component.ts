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
  precioUnitario = 25000;
  listaCompra: { color: string; talla: string; img: string; quantity: number; price: number }[] = [];
  subtotal: number = 0;
  
  constructor(private shopService: ShopService) {}

  ngOnInit() {
    this.shopService.compras$.subscribe(compras => {
      this.listaCompra = compras;
      this.updateSubtotal()
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
      const newPrice = 25000 * selectedValue; // Assuming base price is 25000
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
