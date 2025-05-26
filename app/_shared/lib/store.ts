import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { tasksApi } from '@/app/_shared/lib/features/apiSlice'

export const store = configureStore({
	reducer: {
		[tasksApi.reducerPath]: tasksApi.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			tasksApi.middleware
		)
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
