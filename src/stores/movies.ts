import { defineStore } from 'pinia'
import { MovieDTO } from '@/classes/DTO/movie'
import useAPI from '@/hooks/use-api'
import type { AfterFetchContext, UseFetchReturn } from '@vueuse/core'
import type { MovieResponseItem } from '@/types/interfaces'
import { SEARCH_TYPE, SORT_TYPE } from '@/types/enums'

interface State {
  movies: MovieDTO[]
  searchValue: string
  searchType: SEARCH_TYPE
  selectedSort: SORT_TYPE
  selectedMovie: MovieDTO | null
}

export default defineStore('movies', {
  state: (): State => ({
    movies: [],
    searchValue: '',
    searchType: SEARCH_TYPE.TITLE,
    selectedSort: SORT_TYPE.RELEASE_DATE,
    selectedMovie: null,
  }),
  getters: {},
  actions: {
    async getFilms(): Promise<UseFetchReturn<unknown>> {
      const store = this

      return useAPI(
        '/movies.json',
        {
          method: 'get',
        },
        {
          afterFetch(ctx: AfterFetchContext<string>) {
            if (ctx.data) {
              const { movies } = JSON.parse(ctx.data) as { movies: MovieResponseItem[] }
              store.movies = movies.map((movie) => new MovieDTO(movie))
            }

            return ctx
          },
          onFetchError(ctx) {
            return ctx
          },
        },
      )
    },
  },
})
