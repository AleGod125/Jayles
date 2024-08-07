import { Routes } from '@angular/router';
import { DahsboardComponent } from './pages/dahsboard/dahsboard.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { EditorComponent } from './pages/editor/editor.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CompraComponent } from './pages/compra/compra.component';

export const routes: Routes = [
    {path: '', component:DahsboardComponent},
    {path: 'catalogo', component:CatalogoComponent},
    {path: 'editor', component:EditorComponent},
    {path: 'pago', component:ShopComponent},
    {path: 'compra', component:CompraComponent},




];
