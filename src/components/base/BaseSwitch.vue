<script setup lang="ts">
  interface Props {
    id: string
    firstValue: string
    secondValue: string
    modelValue: string
    label?: string
  }

  withDefaults(defineProps<Props>(), {
    label: '',
  })

  const emits = defineEmits<{
    (n: 'update:modelValue', value: string): void
  }>()

  const onChange = (e: Event) => {
    const target = e.target as HTMLInputElement

    emits('update:modelValue', target.value)
  }
</script>

<template>
  <div id="switch-wrapper" class="base-switch-wrapper">
    <label v-if="label" for="switch-wrapper" class="switch-label">{{ label }}</label>
    <div class="switch" :class="{ 'has-label': label }">
      <input
        type="radio"
        :id="'radio-one-' + id"
        :value="firstValue"
        :name="'switch-single-' + id"
        :checked="modelValue === firstValue"
        @change="onChange"
      />
      <label :for="'radio-one-' + id">{{ firstValue }}</label>
      <input
        type="radio"
        :id="'radio-two-' + id"
        :value="secondValue"
        :name="'switch-single-' + id"
        :checked="modelValue === secondValue"
        @change="onChange"
      />
      <label :for="'radio-two-' + id">{{ secondValue }}</label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .base-switch-wrapper {
    display: flex;
    align-items: center;

    .switch-label {
      font-size: 1.25rem;
      line-height: 1.5rem;
      font-weight: 500;
      text-transform: uppercase;
      color: #ffffff;
    }

    .switch {
      display: flex;
      overflow: hidden;

      &.has-label {
        margin-left: 20px;
      }

      input {
        display: none;
      }

      label {
        background-color: #424242;
        color: #ffffff;
        line-height: 1.5rem;
        text-align: center;
        padding: 10px 15px;
        text-transform: uppercase;
        letter-spacing: 1px;

        &:first-of-type {
          border-radius: 4px 0 0 4px;
        }

        &:last-of-type {
          border-radius: 0 4px 4px 0;
        }
      }

      input[type='radio']:checked {
        + label {
          background: #f65261;
        }
      }
    }
  }
</style>
