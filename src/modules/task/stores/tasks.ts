import type { Task } from '../types'

import { defineStore } from 'pinia'
import { ref } from 'vue'

const MOCK_TASKS = [
  {
    id: 'awdadawd',
    title: 'Task 1',
    description: 'Description 1',
    status: 'DONE',
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    priority: 'HIGH',
    expiredDate: new Date('2026-01-14'),
  },
  {
    id: 'sawdadawd',
    title: 'Task 1',
    description: 'Description 1',
    status: 'DONE',
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    priority: 'HIGH',
    expiredDate: new Date('2026-01-14'),
  },
] satisfies Task[]

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>(MOCK_TASKS)

  //TODO: Переделать!!! (сделано для теста)
  const createTask = (task: {
    title: Task['title']
    description: Task['description']
    priority: Task['priority']
  }) => {
    tasks.value.push({
      id: Math.random().toString(),
      title: task.title,
      status: 'TODO',
      description: task.description,
      priority: task.priority,
      expiredDate: new Date('2026-01-14'),
      tags: [],
    })
  }

  const deleteTask = (id: Task['id']) => {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  const updateTask = (id: Task['id']) => {}

  return {
    tasks,
    deleteTask,
    updateTask,
    createTask,
  }
})
