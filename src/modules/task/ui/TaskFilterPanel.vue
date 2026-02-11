<script setup lang="ts">
import { ListFilter, SlidersHorizontal } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'

import { Item } from '@/common/ui/item'

import { useTasksStore } from '../stores/tasks'
import { TASK_PRIORITIES, TASK_STATUSES } from '../utils/constants'

const tasksStore = useTasksStore()
const { activePriorityFilter, activeStatusFilter } = storeToRefs(tasksStore)
</script>

<template>
  <Item variant="outline" class="flex-col items-start">
    <div class="w-full">
      <h4 class="mb-4 flex items-center gap-2 text-xs font-semibold uppercase">
        <ListFilter :size="18" />
        Статус
      </h4>
      <div class="flex flex-col gap-2">
        <button
          v-for="(value, key) in TASK_STATUSES"
          :key="key"
          class="text-accent-foreground/80 w-full cursor-pointer rounded-lg px-3 py-1.5 text-left text-xs capitalize transition-all"
          :class="{
            'bg-primary text-primary-foreground border-l-4': activeStatusFilter === key,
            'hover:bg-accent/60': activeStatusFilter !== key,
          }"
          @click="activeStatusFilter = key"
        >
          {{ value }}
        </button>
      </div>
    </div>
    <div class="w-full">
      <h4 class="mb-4 flex items-center gap-2 text-xs font-semibold uppercase">
        <SlidersHorizontal :size="18" />
        Приоритет
      </h4>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(value, key) in TASK_PRIORITIES"
          :key="key"
          class="cursor-pointer rounded-full border px-3 py-1 text-center text-xs font-semibold capitalize"
          :class="{
            'bg-primary text-primary-foreground': activePriorityFilter === key,
          }"
          @click="activePriorityFilter = key"
        >
          {{ value }}
        </button>
      </div>
    </div>
  </Item>
</template>
