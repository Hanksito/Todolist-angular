import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


import { Task } from '../../models/task.model'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed: false,

    }, {
      id: Date.now(),
      title: 'Crear componente',
      completed: false,

    }, {
      id: Date.now(),
      title: 'Dar servicio',
      completed: true,

    },

  ]);
  filter = signal<'all' | 'pending' | 'completed'>('all');
  filterTask = computed(() => {
    const filter = this.filter()
    const tasks = this.tasks();

    if (filter === 'pending') {
      return tasks.filter(task => !task.completed)
    }
    if (filter === 'completed') {
      return tasks.filter(task => task.completed)
    }
    return tasks
  })
  changeHandler() {
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value
      this.addTask(value)
      this.newTaskCtrl.setValue('')
    }
  };
  addTask(title: string) {
    const newTasks = {
      id: Date.now(),
      title,
      completed: false,

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
  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(/^\S+$/)
    ]
  })
  editingMode(index: number,) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        }
      })
    })
  }
  saveChanges(index: number, event: Event) {
    const input = event.target as HTMLInputElement
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task
      }
      )
    })
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter)
  }
}
