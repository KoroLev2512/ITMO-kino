import { Actors } from "./actors"
import { Country } from "./country"
import { Session } from "./session"
import { Time } from "./times"

export interface IMovieCard {
  id: number
  img: string
  title: string
  genre: string
  className?: string
}

export interface Movie extends IMovieCard {
  description: string
  times: Time[]
  duration: number
  country: Country
  year: number
  actors: Actors[]
  premier: string
}

export interface MovieWithSessions extends Movie {
  sessions: Session[]
}
