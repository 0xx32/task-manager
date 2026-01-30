<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

import { Switch } from '../ui'

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode()

const changeTheme = (enabled: boolean) => {
  mode.value = enabled ? 'dark' : 'light'
}
</script>

<template>
  <Switch id="switch-focus-mode" @update:model-value="changeTheme" />
</template>
