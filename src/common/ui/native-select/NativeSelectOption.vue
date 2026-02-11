<!-- @fallthroughAttributes true -->
<!-- @strictTemplates true -->

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '@/common/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <option
   v-bind="{ 'data-slot': 'native-select-optgroup' }"
    :class="cn('bg-popover text-popover-foreground', props.class)"
  >
    <slot />
  </option>
</template>
