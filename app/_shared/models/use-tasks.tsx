'use client';
import { useGetTasksQuery } from '@/app/_shared/api/tasksApi'

import { useTable } from '@/app/_shared/models/use-table'
import {useColumns} from '@/app/_shared/models/use-columns'

export const useTasks = () =>
{
	const {columns} = useColumns()
	const { table } = useTable( [], columns )

	const { data } = useGetTasksQuery( {} )
	
	const result = data ?? []

	table.setOptions((prev) => ({
		...prev,
		data: result,
	} ) )
	return {
		table
	}
}