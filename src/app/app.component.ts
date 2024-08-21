import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { DahsboardComponent } from "./pages/dahsboard/dahsboard.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, DahsboardComponent, RouterLink,MatButtonModule, MatMenuModule, MatIconModule]
})
export class AppComponent {
[x: string]: any;
  title = 'Jailes';
}
