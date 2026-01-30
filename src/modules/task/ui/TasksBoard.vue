<script setup lang="ts">
import { ListTodo, Plus } from 'lucide-vue-next'
import { computed } from 'vue'

import { pluralize } from '@/common/helpers/pluralize'
import { Button } from '@/common/ui/button'
import { Item, ItemDescription, ItemTitle } from '@/common/ui/item'
import { Separator } from '@/common/ui/separator'

import { useTasksStore } from '../stores/tasks'
import CreateTaskModal from './CreateTaskFormDialog.vue'
import TaskCard from './TaskCard.vue'

const tasksStore = useTasksStore()

const boardInfo = computed(() => ({
  taskCount: tasksStore.tasks.length,
  title: pluralize(tasksStore.tasks.length, {
    zero: 'задач',
    one: 'задача',
    two: 'задачи',
    few: 'задачи',
    many: 'задач',
  }),
}))
</script>

<template>
  <div className="lg:col-span-3">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold text-slate-500  tracking-wider uppercase">
        {{ boardInfo.taskCount }} {{ boardInfo.title }}
      </h2>

      <CreateTaskModal>
        <Button>
          <Plus />
          Новая задача
        </Button>
      </CreateTaskModal>
    </div>

    <Separator v-if="!!boardInfo.taskCount" class="mb-4" />

    <div v-if="!!boardInfo.taskCount" className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TaskCard
        v-for="task in tasksStore.tasks"
        :key="task.id"
        v-bind="task"
        @delete-task="tasksStore.deleteTask"
        @update-task="tasksStore.updateTask"
        @toggle-status="tasksStore.toggleTaskStatus"
      />
    </div>
    <Item v-else variant="outline" class="flex-col rounded-2xl border-dashed py-20 text-slate-400">
      <ListTodo :size="44" />
      <ItemTitle class="text-2xl">Задач нет</ItemTitle>
      <ItemDescription>Попробуйте настроить свои фильтры или условия поиска</ItemDescription>
    </Item>
  </div>
</template>
