import { Movie } from "../../shared/types";

export const helpers = {
  getInfoData: (data: Movie) => [
    {
      label: 'Премьера',
      value: data.premier
    },
    {
      label: 'В ролях',
      value: data.actors.join(', ')
    },
    {
      label: 'Длительность',
      value: data.duration
    },
    {
      label: 'Страна',
      value: data.country
    },
    {
      label: 'Год',
      value: data.year
    },
  ]
}
