import classNames from 'classnames'
import { Movie } from '../../shared/types'
import { MovieCard } from './MovieCard'
import { useGetAllMoviesQuery } from '../../shared/api'
import styles from './styles.module.scss'

interface MovieListProps {
  className?: string
}

export const MovieList = ({ className }: MovieListProps) => {
  const { isLoading, data } = useGetAllMoviesQuery()
  const classes = classNames(styles.movieList, className);

  function renderList(data: Movie[]) {
    return data.map((movieData) => <MovieCard key={movieData.id} data={movieData} />)
  }

  if (isLoading) return <h1>Loading...</h1>
  if (!data) return <h1>Нет данных</h1>

  return (
    <div className={classes}>{renderList(data)}</div>
  )
}
