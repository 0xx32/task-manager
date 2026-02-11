<script setup lang="ts">
import { TaskBoard, TaskFilterPanel } from '@/modules/task'
</script>

<template>
  <div class="grid grid-cols-4 gap-8">
    <div class="col-span-1">
      <TaskFilterPanel />
    </div>
    <div class="col-span-3">
      <TaskBoard />
    </div>
  </div>
</template>
