<template>
  <div class="about-page-wrapper">
    <div class="about-header">
      <div class="background">
        <img src="@/assets/images/films.jpg" alt="" />
      </div>
      <div class="content">
        <MovieDetails v-if="selectedMovie" :movie="selectedMovie" />
      </div>
    </div>
    <div class="additional-block">
      <p class="same-genre">Films by {{ genres }} genre</p>
    </div>
    <div class="films-listing">
      <MovieCard v-for="movie in sameGenreMovies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import useMovie from '@/hooks/use-movie'
  import MovieCard from '@/components/MovieCard.vue'
  import MovieDetails from '@/components/MovieDetails.vue'
  import { onBeforeMount, watch } from 'vue'
  import { useMoviesStore } from '@/stores'
  import { useRoute } from 'vue-router'

  const moviesStore = useMoviesStore()
  const route = useRoute()

  const setMovieByRouteID = () => {
    moviesStore.selectedMovie =
      moviesStore.movies.find((movie) => movie.id.toString() === route.params.id) || null
  }

  onBeforeMount(async () => {
    if (!moviesStore.movies.length) await moviesStore.getFilms()
    if (route.params.id) {
      setMovieByRouteID()
    }
  })

  watch(route, () => {
    setMovieByRouteID()
  })

  const { genres, sameGenreMovies, selectedMovie } = useMovie()
</script>

<style lang="scss" scoped>
  .about-page-wrapper {
    display: flex;
    flex-direction: column;

    .about-header {
      position: relative;
      overflow: hidden;
      padding: 24px 0;

      .background {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 0;
        filter: blur(7px);

        img {
          width: 100%;
        }
      }

      .content {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;

        .main-content {
          display: flex;
          flex-direction: column;
          padding: 80px 100px;
        }
      }
    }

    .additional-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 25px 100px;
      background: #555555;

      .same-genre {
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
