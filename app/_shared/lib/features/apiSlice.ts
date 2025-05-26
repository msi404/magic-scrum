import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL
export const baseApi = baseURL + '/api/'

export const tasksApi = createApi({
	reducerPath: 'tasksApi',
	baseQuery: fetchBaseQuery({ baseUrl: baseApi }),
	tagTypes: ['Tasks'],
	endpoints: () => ({})
})
