/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type {FC} from 'react'
import {
	flexRender,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/app/_shared/ui/table";

import { Show } from "@/app/_shared/utils/show";
import { For } from "@/app/_shared/utils/for";

interface TableProps {
	table: any
}

export const DataTable: FC<TableProps> = ({table}) =>
{
	
	return (
<div className="relative overflow-x-auto" dir="rtl">
<Table className='w-full table-fixed'>
				{/* Table Header */}
				<TableHeader>
					<For each={table.getHeaderGroups()}>
						{(headerGroup: any) => (
							<TableRow key={headerGroup.id}>
								<For each={headerGroup.headers}>
									{(header: any) => (
										<TableHead key={header.id}>
											<Show
												when={!header.isPlaceholder}
												fallback={null}
											>
												{flexRender(
													header.column.columnDef
														.header,
													header.getContext()
												)}
											</Show>
										</TableHead>
									)}
								</For>
							</TableRow>
						)}
					</For>
				</TableHeader>
				{/* Table Header */}

				{/* Table Body */}
				<TableBody>
				<Show
							when={table.getRowModel().rows?.length > 0}
							fallback={
								<TableRow>
									<TableCell colSpan={10} className="h-24 text-center">
										لا توجد بيانات
									</TableCell>
								</TableRow>
							}
						>
							<For each={table.getRowModel().rows}>
								{(row: any) => (
									<TableRow
										className="even:bg-slate-50 dark:even:bg-slate-900 h-16 text-end"
										key={row.id}
										data-state={row.getIsSelected() && 'selected'}
									>
										<For each={row.getVisibleCells()}>
											{(cell: any) => (
												<TableCell key={cell.id}>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
												</TableCell>
											)}
										</For>
									</TableRow>
								)}
						</For>
						</Show>
				</TableBody>
				{/* Table Body */}
			</Table>
		</div>
	);
}
