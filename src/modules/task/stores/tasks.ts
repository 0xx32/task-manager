import type { Task } from '../types'

import { defineStore } from 'pinia'
import { ref } from 'vue'

const MOCK_TASKS = [] satisfies Task[]

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>(MOCK_TASKS)

  //TODO: Переделать!!! (сделано для теста)
  const createTask = (task: {
    title: Task['title']
    description: Task['description']
    priority: Task['priority']
  }) => {
    tasks.value.push({
      id: crypto.randomUUID(),
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
