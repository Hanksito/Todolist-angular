import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

import { Task } from '../../models/task.model'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed: false
    }, {
      id: Date.now(),
      title: 'Crear componente',
      completed: false
    }, {
      id: Date.now(),
      title: 'Dar servicio',
      completed: false
    },

  ]);
  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTasks = input.value;
    this.addTask(newTasks)
  };
  addTask(title: string) {
    const newTasks = {
      id: Date.now(),
      title,
      completed: false
    }
    this.tasks.update((tasks) => [...tasks, newTasks])
  }

  deleteTasks(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }
  completedTasks(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task
      })
    })

  }
}
