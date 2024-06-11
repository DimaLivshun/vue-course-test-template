<template>
  <div class="movie-details-wrapper">
    <div class="movie-image">
      <img :src="movie.posterPath" alt="" />
    </div>
    <div class="movie-info">
      <div class="title-score">
        <h1 class="title">{{ movie.title }}</h1>
        <div class="score">{{ formatScore(movie.voteCount) }}</div>
      </div>
      <p class="genre">{{ movieGenres }}</p>
      <div class="year-duration">
        <div class="year">
          <span>{{ releaseYear }}</span>
          year
        </div>
        <div class="duration">
          <span>{{ movie.runtime }}</span>
          min
        </div>
      </div>
      <p class="description">{{ movie.overview }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import type { MovieDTO } from '@/classes/DTO/movie'

  const { movie } = defineProps<{ movie: MovieDTO }>()

  const movieGenres = computed((): string => movie.genres.join(','))

  const formatScore = (v: number) => v.toFixed(1)
  const releaseYear = computed(() => new Date(movie.releaseDate).getFullYear())
</script>

<style lang="scss" scoped>
  .movie-details-wrapper {
    display: flex;
    grid-gap: 30px;
    padding: 0 60px;

    .movie-image {
      max-height: 500px;
      max-width: 340px;
      width: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .movie-info {
      display: flex;
      flex-direction: column;
      padding: 30px 0;

      .title-score {
        display: flex;
        align-items: center;
        grid-gap: 15px;

        .title {
          font-size: 2rem;
          line-height: 2.5rem;
          color: #ffffff;
        }

        .score {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 15px 10px;
          border-radius: 50%;
          font-size: 1.25rem;
          color: #a1e66f;
          border: 1px solid #ffffff;
        }
      }

      .genre {
        color: #ffffff;
      }

      .year-duration {
        display: flex;
        grid-gap: 20px;
        margin-top: 20px;

        .year {
          font-size: 0.75rem;
          color: #ffffff;
          opacity: 0.8;

          span {
            font-size: 1.5rem;
            color: #f65261;
          }
        }

        .duration {
          font-size: 0.75rem;
          color: #ffffff;
          opacity: 0.8;

          span {
            font-size: 1.5rem;
            color: #f65261;
          }
        }
      }

      .description {
        margin-top: 30px;
        line-height: 1.5rem;
        color: #ffffff;
      }
    }
  }
</style>
