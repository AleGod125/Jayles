import { Routes } from '@angular/router';
import { DahsboardComponent } from './pages/dahsboard/dahsboard.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';

export const routes: Routes = [
    {path: '', component:DahsboardComponent},
    {path: 'catalogo', component:CatalogoComponent},

];
