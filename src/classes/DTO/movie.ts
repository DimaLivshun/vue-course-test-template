import type { MovieResponseItem } from '@/types/interfaces'

export class MovieDTO {
  id: number
  title: string
  voteCount: number
  releaseDate: string
  posterPath: string
  overview: string
  genres: string[]
  runtime: string

  constructor(data: MovieResponseItem) {
    this.id = data.id || 0
    this.title = data.title || ''
    this.releaseDate = data.releaseDate || ''
    this.posterPath = data.posterurl || ''
    this.voteCount = data.imdbRating || 0
    this.overview = data.storyline || ''
    this.genres = data.genres || []
    this.runtime = data.duration || ''
  }
}
