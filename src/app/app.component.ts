import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DahsboardComponent } from "./pages/dahsboard/dahsboard.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, DahsboardComponent]
})
export class AppComponent {
  title = 'jailes';
}
