<script setup lang="ts">
  import type { MovieDTO } from '@/classes/DTO/movie'
  import vInViewport from '@/directives/in-viewport'
  import { computed, ref } from 'vue'

  const { movie } = defineProps<{ movie: MovieDTO }>()

  const image = ref<HTMLImageElement | null>(null)

  const onIntersection = () => {
    if (image.value) image.value.src = image.value.dataset.src as string
  }

  const genres = computed(() => movie.genres.join(','))
</script>

<template>
  <router-link :to="{ name: 'About', params: { id: movie.id } }" class="movie-info-wrapper">
    <div class="movie-image-wrapper">
      <img
        :data-src="movie.posterPath"
        v-in-viewport="null"
        ref="image"
        alt=""
        @intersects="onIntersection"
      />
    </div>
    <div class="movie-info">
      <div class="title-year">
        <p class="title">{{ movie.title }}</p>
        <div class="year">{{ movie.releaseDate }}</div>
      </div>
      <div class="genre">{{ genres }}</div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
  .movie-info-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-decoration: none;

    .movie-image-wrapper {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .movie-info {
      display: flex;
      flex-direction: column;
      margin-top: 30px;

      .title-year {
        display: flex;
        justify-content: space-between;

        .title {
          font-weight: 500;
          color: #555555;
        }

        .year {
          padding: 5px 10px;
          border: 1px solid #555555;
          border-radius: 4px;
          font-size: 0.875rem;
          color: #555555;
        }
      }

      .genre {
        font-size: 0.875rem;
        color: #555555;
      }
    }
  }
</style>
