<script setup lang="ts">
  interface Props {
    modelValue: string
    type?: string
    disabled?: boolean
  }

  withDefaults(defineProps<Props>(), {
    type: 'text',
    disabled: false,
  })

  const emits = defineEmits<{
    (n: 'update:modelValue', value: string): void
  }>()

  const onInput = (e: Event): void => {
    const target = e.target as HTMLInputElement

    emits('update:modelValue', target.value.trim())
  }
</script>

<template>
  <input class="input" :value="modelValue" :type="type" :disabled="disabled" @input="onInput" />
</template>

<style lang="scss" scoped>
  .input {
    width: 100%;
    padding: 20px;
    background: #000000;
    opacity: 0.5;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    color: #ffffff;
  }
</style>
