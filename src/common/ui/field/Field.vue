<script setup lang="ts">
import type { FieldVariants } from '.'
import type { HTMLAttributes } from 'vue'

import { cn } from '@/common/lib/utils'

import { fieldVariants } from '.'

const props = defineProps<{
  class?: HTMLAttributes['class']
  orientation?: FieldVariants['orientation']
}>()
</script>

<template>
  <div
    role="group"
    data-slot="field"
    :data-orientation="orientation"
    :class="cn(fieldVariants({ orientation }), props.class)"
  >
    <slot />
  </div>
</template>
