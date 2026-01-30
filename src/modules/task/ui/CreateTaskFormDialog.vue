<script setup lang="ts">
import type { Task } from '../types'

import { ref } from 'vue'

import { Button } from '@/common/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common/ui/dialog'
import { Field, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from '@/common/ui/field'
import { Input } from '@/common/ui/input'
import { RadioGroup, RadioGroupItem } from '@/common/ui/radio-group'
import { Textarea } from '@/common/ui/textarea'

import { useTasksStore } from '../stores/tasks'

const isOpenDialog = ref(false)
const tasksStore = useTasksStore()

//test
const formState = ref({
  title: '',
  description: '',
  priority: 'MEDIUM',
})

const onSubmit = () => {
  if (formState.value.title === '') return

  tasksStore.createTask({
    title: formState.value.title,
    description: formState.value.description,
    priority: formState.value.priority as Task['priority'],
  })

  isOpenDialog.value = false
}
</script>

<template>
  <Dialog :open="isOpenDialog" @update:open="() => (isOpenDialog = !isOpenDialog)">
    <DialogTrigger as-child><slot /></DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="mb-4 uppercase">Новая задача</DialogTitle>
        <DialogDescription>Создайте новую задачу</DialogDescription>
      </DialogHeader>

      <FieldSeparator />

      <form class="w-full max-w-md" @submit.prevent="onSubmit">
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel for="title" class="text-xs uppercase"> Заголовок </FieldLabel>
              <Input
                id="title"
                v-model="formState.title"
                placeholder="e.g. Дизайн целевой страницы"
              />
            </Field>
            <Field>
              <FieldLabel for="description" class="text-xs uppercase"> Описание </FieldLabel>
              <Textarea
                id="description"
                v-model="formState.description"
                class="h-24 resize-none"
                placeholder="Добавьте подробную информацию о задаче..."
              />
            </Field>
            <FieldGroup>
              <FieldLabel class="text-xs uppercase">Приоритет</FieldLabel>
              <RadioGroup v-model="formState.priority" default-value="MEDIUM" class="flex">
                <Field orientation="horizontal" class="w-auto">
                  <RadioGroupItem id="priority-low" value="LOW" />
                  <FieldLabel for="priority-low" class="text-xs font-normal"> LOW </FieldLabel>
                </Field>
                <Field orientation="horizontal" class="w-auto">
                  <RadioGroupItem id="priority-medium" value="MEDIUM" />
                  <FieldLabel for="priority-medium" class="text-xs font-normal">
                    MEDIUM
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal" class="w-auto">
                  <RadioGroupItem id="priority-high" value="HIGH" />
                  <FieldLabel for="priority-high" class="text-xs font-normal"> HIGH </FieldLabel>
                </Field>
              </RadioGroup>
            </FieldGroup>
          </FieldGroup>
        </FieldSet>

        <DialogFooter class="mt-10">
          <DialogClose as-child>
            <Button type="button" variant="ghost">Отмена</Button>
          </DialogClose>
          <Button type="submit">Добавить</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
