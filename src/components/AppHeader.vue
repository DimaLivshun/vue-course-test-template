<template>
  <header class="header">
    <div class="logo-wrapper">
      <p class="logo"><span class="brand-name">netflix</span>roulette</p>
    </div>
    <router-link v-if="isShowSearchIcon" :to="{ name: 'Home' }">
      <img class="search-icon" src="@/assets/images/search.png" alt="search" />
    </router-link>
  </header>
</template>

<script setup lang="ts">
  defineProps<{ isShowSearchIcon: boolean }>()
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 60px;
    background: transparent;

    .logo-wrapper {
      .logo {
        font-size: 1.5rem;
        color: #f65261;

        .brand-name {
          font-weight: 900;
        }
      }
    }

    .search-icon {
      max-width: 25px;
    }
  }
</style>
