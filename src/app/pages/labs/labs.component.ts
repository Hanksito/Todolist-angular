import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'hola';
  tasks = [
    'Instalar el Angular CLI',
    'Crear un proyecto con Angular',
    'Crear componentes'
  ]
  name = ' Martin'
  age = 33
}
