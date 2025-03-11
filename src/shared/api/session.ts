import { Session } from "../types";
import { rtkApi } from "./rtkApi";

const sessionsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getSessionById: build.query<Session, string>({
      query: (id) => `sessions/${id}?_expand=seat&_expand=movie`,
      keepUnusedDataFor: 0
    }),
  }),
  overrideExisting: false,
})

export const { useGetSessionByIdQuery } = sessionsApi
