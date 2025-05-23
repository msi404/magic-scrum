import { tasksApi as api } from '@/app/_shared/lib/features/apiSlice';

const injectRtkApi = api.injectEndpoints( {
	endpoints: ( builder ) => ( {
		getTasks: builder.query( {
			query: () => '/tasks',
			providesTags: [{ type: 'Tasks' }]
		} ),
		editTask: builder.mutation( {
			query: ( arg ) => ( {
				url: `/tasks/${ arg.id }`,
				method: 'PUT',
				body: arg
			} ),
			invalidatesTags: [{ type: 'Tasks' }]
		} ),
		createTask: builder.mutation( {
			query: ( arg ) => ( {
				url: '/tasks',
				method: 'POST',
				body: arg
			} ),
			invalidatesTags: [{ type: 'Tasks' }]
		}),
		deleteTask: builder.mutation( {
			query: ( id ) => ( {
				url: `/tasks/${ id }`,
				method: 'DELETE',
			} ),
			invalidatesTags: [{ type: 'Tasks' }]
		} ),
		getTask: builder.query( {
			query: ( id ) => ( {
				url: `/tasks/${ id }`,
				providesTags: [{ type: 'Tasks' }]
			} ),
		} ),
	} ),
	overrideExisting: false,
} );

export const { useGetTasksQuery, useDeleteTaskMutation, useCreateTaskMutation, useEditTaskMutation, useGetTaskQuery } = injectRtkApi;