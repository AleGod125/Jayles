import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ShopService } from '../../service/shop.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {

  private _compraService = inject(ShopService)

  listaCompra: string[] = [];


  ngOnInit(): void {
    this.listaCompra = this._compraService.getCompra()
  }
  ElminarTarea(index: number) {

  }
}
