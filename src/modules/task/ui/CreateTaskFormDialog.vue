<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/valibot'
import { useForm } from 'vee-validate'
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from '@/common/ui/field'
import { Input } from '@/common/ui/input'
import { RadioGroup, RadioGroupItem } from '@/common/ui/radio-group'
import { Textarea } from '@/common/ui/textarea'

import { createTaskFormSchema } from '../schemas/createTaskForm'
import { useTasksStore } from '../stores/tasks'

const isShowDialog = ref(false)

const tasksStore = useTasksStore()

const { errors, defineField, handleSubmit, resetForm } = useForm({
  initialValues: {
    title: '',
    description: '',
    priority: 'MEDIUM',
  },
  validationSchema: toTypedSchema(createTaskFormSchema),
})

const [title, titleAttrs] = defineField('title')
const [description, descriptionAttrs] = defineField('description')
const [priority, priorityAttrs] = defineField('priority')

const onSubmit = handleSubmit((values) => {
  tasksStore.createTask({
    title: values.title,
    description: values.description,
    priority: values.priority,
  })

  isShowDialog.value = false
})

const onToggleDialog = () => {
  isShowDialog.value = !isShowDialog.value
  resetForm()
}
</script>

<template>
  <Dialog :open="isShowDialog" @update:open="onToggleDialog">
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
                v-model="title"
                v-bind="titleAttrs"
                placeholder="e.g. Дизайн целевой страницы"
                :aria-invalid="!!errors.title"
              />
              <FieldError>{{ errors.title }}</FieldError>
            </Field>
            <Field>
              <FieldLabel for="description" class="text-xs uppercase"> Описание </FieldLabel>
              <Textarea
                id="description"
                v-model="description"
                v-bind="descriptionAttrs"
                class="h-24 resize-none"
                placeholder="Добавьте подробную информацию о задаче..."
                :aria-invalid="!!errors.description"
              />
              <FieldError>{{ errors.description }}</FieldError>
            </Field>
            <FieldGroup>
              <FieldLabel class="text-xs uppercase">Приоритет</FieldLabel>
              <RadioGroup
                v-model="priority"
                v-bind="priorityAttrs"
                default-value="MEDIUM"
                class="flex"
              >
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
