export interface MovieResponseItem {
  id: number
  title: string
  posterurl: string
  genres: string[]
  actors: string[]
  releaseDate: string
  storyline: string
  ratings?: number[]
  movieUrl?: string
  year: string
  poster: string
  contentRating: string
  duration: string
  averageRating: number
  imdbRating: number
}
