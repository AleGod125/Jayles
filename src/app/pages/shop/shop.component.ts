import { Component, inject, OnInit } from '@angular/core';
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
export class ShopComponent implements OnInit {

  private _compraService = inject(ShopService);
  quantities: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  editingText = false;
  editText = '11';
  mayor: string = "+10";
  readonly PRECIO_UNITARIO = 15000;
  listaCompra: { color: string; talla: string; img: string[]; quantity: number; price: number; estanpado: string }[] = [];
  subtotal: number = 0;
  selectedValue: any;

  ngOnInit() {
    this._compraService.compras$.subscribe(compras => {
      this.listaCompra = compras;
      this.updateSubtotal();
    });
  }

  eliminarTarea(index: number) {
    this._compraService.eliminar(index);
    this.updateSubtotal();
  }

  onQuantityChange(event: Event, index: number): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedValue = selectElement.value;

    if (this.selectedValue === "0") {
      this.eliminarTarea(index);
    } else if (this.selectedValue === "10+") {
      this.startEdit();
    } else {
      this.updateCompraQuantity(index, parseInt(this.selectedValue));
    }
  }
  updateCompraQuantity(index: number, quantity:number): void {
    if (quantity > 0) {
      const compra = this.listaCompra[index];
      const newPrice = this.PRECIO_UNITARIO * quantity;
      compra.quantity = quantity;
      compra.price = newPrice;
      this._compraService.actualizarCompra(index, quantity, newPrice);
      this.updateSubtotal();
    }
  }

  updateSubtotal(): void {
    this.subtotal = this.listaCompra.reduce((acc, compra) => acc + compra.price, 0);
  }

  finishEdit( index: number): void {
    this.editingText = false;
 
  
    const numericValue = parseInt(this.editText);
    if (numericValue > 10) {
      this.selectedValue = this.editText
      this.listaCompra[index].quantity = numericValue;
      this.updateCompraQuantity(index, numericValue);
    }
  }
  

  startEdit(): void {
    this.editingText = true;
  }
}
