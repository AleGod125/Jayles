import { Routes } from '@angular/router';
import { DahsboardComponent } from './pages/dahsboard/dahsboard.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { EditorComponent } from './pages/editor/editor.component';

export const routes: Routes = [
    {path: '', component:DahsboardComponent},
    {path: 'catalogo', component:CatalogoComponent},
    {path: 'editor', component:EditorComponent},


];
