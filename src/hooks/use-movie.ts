import { useMoviesStore } from '@/stores'
import { computed, type ComputedRef } from 'vue'
import type { MovieDTO } from '@/classes/DTO/movie'
import { SEARCH_TYPE, SORT_TYPE } from '@/types/enums'

interface useFilm {
  selectedMovie: ComputedRef<MovieDTO | null>
  availableMovies: ComputedRef<MovieDTO[]>
  moviesCount: ComputedRef<number>
  genres: ComputedRef<string>
  movies: ComputedRef<MovieDTO[]>
  sameGenreMovies: ComputedRef<MovieDTO[]>
}

export default function (): useFilm {
  const moviesStore = useMoviesStore()

  const searchValue = computed(() => moviesStore.searchValue)
  const searchType = computed(() => moviesStore.searchType)

  const sortOptions = [
    {
      field: SORT_TYPE.RELEASE_DATE,
      sortFn: (a: MovieDTO, b: MovieDTO) => (a.releaseDate < b.releaseDate ? 1 : -1),
    },
    {
      field: SORT_TYPE.RATING,
      sortFn: (a: MovieDTO, b: MovieDTO) => (a.voteCount < b.voteCount ? 1 : -1),
    },
  ]

  const selectedSort = computed(() => moviesStore.selectedSort)

  const activeSortOption = computed(
    () => sortOptions.find((sortOpt) => sortOpt.field === selectedSort.value) || sortOptions[0],
  )

  const selectedMovie = computed(() => moviesStore.selectedMovie)

  const availableMovies = computed(() => moviesStore.movies)

  const genres = computed(() => (selectedMovie.value ? parseFilmGenres(selectedMovie.value) : ''))

  const movies = computed(() => {
    const filmsList = [...availableMovies.value]
    console.log('called', searchValue.value, searchType.value)
    if (searchValue.value && searchType.value === SEARCH_TYPE.TITLE)
      return filmsList
        .filter((film: MovieDTO) =>
          film.title.toLowerCase().includes(searchValue.value.toLowerCase()),
        )
        .sort(activeSortOption.value.sortFn)
    else if (searchValue.value && searchType.value === SEARCH_TYPE.GENRE)
      return filmsList
        .filter((film: MovieDTO) =>
          film.genres.join(',').toLowerCase().includes(searchValue.value.toLowerCase()),
        )
        .sort(activeSortOption.value.sortFn)
    return filmsList.sort(activeSortOption.value.sortFn)
  })

  const moviesCount = computed(() => movies.value.length)

  const sameGenreMovies = computed((): MovieDTO[] => {
    return movies.value.filter((movie: MovieDTO) => {
      if (movie.genres && selectedMovie.value?.genres)
        return movie.genres.some((genre) =>
          selectedMovie.value ? selectedMovie.value.genres.includes(genre) : false,
        )
      return []
    })
  })

  function parseFilmGenres(movie: MovieDTO): string {
    if (movie?.genres) return movie.genres.join(',')
    return ''
  }

  return { selectedMovie, genres, availableMovies, movies, moviesCount, sameGenreMovies }
}
