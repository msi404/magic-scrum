/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

export const useTable = (data: any, columns: any) =>
{
	const table = useReactTable( {
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		renderFallbackValue: <h1>لا يوجد</h1>
	} )
	
	return {
		table
	}
};