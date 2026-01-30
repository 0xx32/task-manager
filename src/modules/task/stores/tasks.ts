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
    expiredDate?: Task['expiredDate']
    tags?: Task['tags']
  }) => {
    tasks.value.push({
      id: crypto.randomUUID(),
      title: task.title,
      status: 'TODO',
      description: task.description,
      priority: task.priority,
      expiredDate: task.expiredDate,
      tags: [...(task.tags ?? [])],
    })
  }

  const deleteTask = (id: Task['id']) => {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  const updateTask = (id: Task['id']) => {}

  const toggleTaskStatus = (id: Task['id']) => {
    const task = tasks.value.find((task) => task.id === id)
    if (!task) {
      return new Error('Task not found')
    }

    if (task.status === 'TODO') {
      task.status = 'IN_PROGRESS'
    } else if (task.status === 'IN_PROGRESS') {
      task.status = 'DONE'
    } else if (task.status === 'DONE') {
      task.status = 'IN_PROGRESS'
    }
  }

  return {
    tasks,
    deleteTask,
    updateTask,
    createTask,
    toggleTaskStatus,
  }
})
