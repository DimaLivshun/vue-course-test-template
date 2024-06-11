<script setup lang="ts">
  interface Props {
    type?: 'button' | 'submit'
    disabled?: boolean
  }

  withDefaults(defineProps<Props>(), {
    type: 'button',
    disabled: false,
  })
</script>

<template>
  <button class="button" :type="type" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
  .button {
    width: 100%;
    padding: 20px;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 1rem;
    color: #ffffff;
    background: #f65261;
    border: none;
    border-radius: 4px;
  }
</style>
