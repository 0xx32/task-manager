import type { Task } from '../types'

import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

const MOCK_TASKS = [] as Task[]

type StatusFilter = 'ALL' | Task['status']
type PriorityFilter = 'ALL' | Task['priority']

export const useTasksStore = defineStore('tasks', () => {
  const tasks = useLocalStorage<Task[]>('pinia/tasks', MOCK_TASKS, {
    listenToStorageChanges: true,
    serializer: {
      read: (v: string) =>
        JSON.parse(v, (key, value) => {
          if (key === 'expiredDate' && value) return new Date(value)
          return value 
        }),
      write: (v: any) => JSON.stringify(v),
    },
  })

  const activeStatusFilter = ref<StatusFilter>('ALL')
  const activePriorityFilter = ref<PriorityFilter>('ALL')

  const filteredTasks = computed(() => {
    if (activeStatusFilter.value === 'ALL' && activePriorityFilter.value === 'ALL') {
      return tasks.value
    }

    return tasks.value.filter((task) => {
      return (
        (activeStatusFilter.value === 'ALL' || task.status === activeStatusFilter.value) &&
        (activePriorityFilter.value === 'ALL' || task.priority === activePriorityFilter.value)
      )
    })
  })

  watch(tasks, (value) => {
    localStorage.value = value
  })
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

  const updateTask = () => {}

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
    filteredTasks,
    activeStatusFilter,
    activePriorityFilter,
    deleteTask,
    updateTask,
    createTask,
    toggleTaskStatus,
  }
})
