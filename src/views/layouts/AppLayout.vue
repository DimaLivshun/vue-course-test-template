<script setup lang="ts">
  import AppFooter from '@/components/AppFooter.vue'
  import AppHeader from '@/components/AppHeader.vue'
  import { useRoute } from 'vue-router'
  import { computed } from 'vue'

  const route = useRoute()

  const isAboutPage = computed(() => route.name === 'About')
</script>

<template>
  <main class="app-layout">
    <AppHeader :is-show-search-icon="isAboutPage" />

    <router-view />

    <AppFooter />
  </main>
</template>

<style scoped lang="scss"></style>
