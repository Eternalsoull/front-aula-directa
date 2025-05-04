import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // 👈 Aquí declaramos que es standalone
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // 👈 Aquí corregimos "styleUrls"
})
export class AppComponent {
  title = 'front-plataforma-educativa';
}
