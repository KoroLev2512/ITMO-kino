import { Movie, MovieWithSessions } from "../types";
import { rtkApi } from "./rtkApi";

const moviesApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getAllMovies: build.query<Movie[], void>({
      query: () => 'movies',
    }),
    getMovieById: build.query<MovieWithSessions, string>({
      query: (id) => `movies?id_like=${id}&_embed=sessions`,
      transformResponse: (data: MovieWithSessions[]) => {
        return data[0]
      }
    }),
  }),
  overrideExisting: false,
})

export const { useGetAllMoviesQuery, useGetMovieByIdQuery } = moviesApi
