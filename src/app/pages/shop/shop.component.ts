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
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {

  private _compraService = inject(ShopService)
  quantities: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  selectedQuantity: string | number = 1;
  editingText = false;
  editText = '11';
  mayor:string ="+10";
  listaCompra: { color: string; talla: string }[] = [];


  ngOnInit(): void {
    this.listaCompra = this._compraService.getCompra()
  }
  ElminarTarea(index: number) {
    this._compraService.Eliminar(index)
    this.listaCompra = this._compraService.getCompra()
  }
  onQuantityChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    if (selectedValue === '0') {
      console.log('Eliminar producto');
    } else if (selectedValue === '10+') {
      this.startEdit()
    } else {
      console.log(`Cantidad seleccionada: ${selectedValue}`);
    }
  }

  finishEdit(): void {
    this.editingText = false;
    this.mayor = this.editText
  }
  startEdit(): void {
    this.editingText = true;
  }
}

