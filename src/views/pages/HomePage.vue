<template>
  <div class="home">
    <div class="search-block">
      <div class="background">
        <img src="@/assets/images/films.jpg" alt="" />
      </div>
      <div class="content">
        <h1 class="title">find your movie</h1>
        <div class="search-wrapper">
          <BaseInput v-model="searchValue" class="input" />
          <BaseButton class="search-btn">search</BaseButton>
        </div>
        <BaseSwitch
          id="search-by"
          label="search by"
          :first-value="SEARCH_TYPE.TITLE"
          :second-value="SEARCH_TYPE.GENRE"
          class="search-type"
          v-model="searchType"
        />
      </div>
    </div>
    <div class="sort-block">
      <p class="movies-count">{{ moviesCount }} movie found</p>
      <BaseSwitch
        id="sort-by"
        label="sort by"
        :first-value="SORT_TYPE.RELEASE_DATE"
        :second-value="SORT_TYPE.RATING"
        v-model="selectedSort"
      />
    </div>
    <div class="films-listing">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onBeforeMount } from 'vue'
  import MovieCard from '@/components/MovieCard.vue'
  import BaseInput from '@/components/base/BaseInput.vue'
  import BaseSwitch from '@/components/base/BaseSwitch.vue'
  import BaseButton from '@/components/base/BaseButton.vue'
  import { useMoviesStore } from '@/stores'
  import useMovie from '@/hooks/use-movie'
  import { SEARCH_TYPE, SORT_TYPE } from '@/types/enums'

  const moviesStore = useMoviesStore()

  const searchValue = computed({
    get(): string {
      return moviesStore.searchValue
    },
    set(value: string): void {
      moviesStore.searchValue = value
    },
  })

  const searchType = computed({
    get(): SEARCH_TYPE {
      return moviesStore.searchType
    },
    set(value: SEARCH_TYPE): void {
      moviesStore.searchType = value
    },
  })

  onBeforeMount(() => {
    moviesStore.getFilms()
  })

  const selectedSort = computed({
    get(): SORT_TYPE {
      return moviesStore.selectedSort
    },
    set(value: SORT_TYPE): void {
      moviesStore.selectedSort = value
    },
  })

  const { movies, moviesCount } = useMovie()
</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    flex-direction: column;

    .search-block {
      position: relative;
      overflow: hidden;

      .background {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 0;
        filter: blur(5px);

        img {
          width: 100%;
        }
      }

      .content {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        padding: 80px 100px;

        .title {
          font-size: 2rem;
          font-size: 2.5rem;
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #ffffff;
        }

        .search-wrapper {
          display: flex;
          grid-gap: 20px;
          margin-top: 40px;

          .input {
            width: 100%;
          }

          .search-btn {
            max-width: 200px;
          }
        }

        .search-type {
          margin-top: 20px;
        }
      }
    }

    .sort-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 100px;
      background: #555555;

      .movies-count {
        font-weight: 900;
        color: #ffffff;
      }
    }

    .films-listing {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 40px;
      padding: 80px 60px;
    }
  }
</style>
