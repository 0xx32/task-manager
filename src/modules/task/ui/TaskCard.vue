<script setup lang="ts">
import type { Task } from '../types'

import { CalendarDays, CircleCheckBig, LoaderPinwheel } from 'lucide-vue-next'
import { computed } from 'vue'

import { Badge } from '@/common/ui/badge'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/common/ui/context-menu'
import { Item } from '@/common/ui/item'

interface TaskCardProps extends Task {}

const { id, title, description, status, tags, priority, expiredDate } = defineProps<TaskCardProps>()

const emits = defineEmits<{
  deleteTask: [id: Task['id']]
  updateTask: [id: Task['id']]
  toggleStatus: [id: Task['id'], status: Task['status']]
}>()

const isOverdue = computed(() => expiredDate < new Date() && status !== 'DONE')

const PRIORITY_COLORS = {
  LOW: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  MEDIUM: 'bg-amber-50 text-amber-700 border-amber-100',
  HIGH: 'bg-rose-50 text-rose-700 border-rose-100',
}
const STATUS_COLORS = {
  TODO: 'bg-transparent text-slate-600',
  IN_PROGRESS: 'bg-indigo-100 text-indigo-600',
  DONE: 'bg-indigo-600 text-white',
}

const toggleStatus = () => {
  let nextStatus = 'IN_PROGRESS' as Task['status']

  if (status === 'TODO') {
    nextStatus = 'IN_PROGRESS'
  } else if (status === 'IN_PROGRESS') {
    nextStatus = 'DONE'
  } else if (status === 'DONE') {
    nextStatus = 'IN_PROGRESS'
  }

  emits('toggleStatus', id, nextStatus)
}
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <Item variant="outline" class="block">
        <div class="flex items-start justify-between gap-3">
          <div class="flex min-w-0 flex-1 items-start gap-3">
            <button
              class="mt-1 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full border-2"
              :class="STATUS_COLORS[status]"
              @click="toggleStatus"
            >
              <CircleCheckBig v-if="status === 'DONE'" />
              <LoaderPinwheel v-if="status === 'IN_PROGRESS'" />
            </button>

            <div class="min-w-0 flex-1">
              <h3
                class="truncate font-semibold"
                :class="{
                  'text-slate-400 line-through': status === 'DONE',
                }"
              >
                {{ title }}
              </h3>
              <p v-if="!!description" class="mt-0.5 line-clamp-1 text-sm">
                {{ description }}
              </p>
            </div>
          </div>
        </div>

        <div class="mt-4 flex flex-wrap items-center gap-3">
          <Badge
            variant="default"
            class="text-[10px] font-bold uppercase"
            :class="PRIORITY_COLORS[priority]"
          >
            {{ priority }}
          </Badge>

          <div
            class="flex items-center gap-1.5 text-xs font-medium"
            :class="{
              'text-rose-600': isOverdue,
            }"
          >
            <CalendarDays :size="14" />

            {{ expiredDate.toLocaleDateString() }}
          </div>

          <Badge
            v-for="tag in tags"
            :key="tag"
            variant="secondary"
            class="rounded-full px-2 py-0.5 text-[10px]"
            >#
            {{ tag }}
          </Badge>
        </div>

        <ContextMenuContent>
          <ContextMenuItem @select="() => $emit('updateTask', id)">Редактировать</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive" @select="() => $emit('deleteTask', id)">
            Удалить
          </ContextMenuItem>
        </ContextMenuContent>
      </Item>
    </ContextMenuTrigger>
  </ContextMenu>
</template>
