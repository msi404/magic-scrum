/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useMemo, useState } from 'react';
import { Button } from '@/app/_shared/ui/button'
import { useDeleteTaskMutation } from '@/app/_shared/api/tasksApi'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/app/_shared/ui/popover"
import { useEditTask } from './use-edit-task';

export const useColumns = () =>
{
	const [deleteTask] = useDeleteTaskMutation();
	const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

	const columns = useMemo( () =>
	{
		const dataColumns = [
			{
				id: 'title',
				accessorKey: 'title',
				header: 'العنوان',
				cell: ( { cell }: { cell: any; } ) =>
				{
					return <span className='text-xs'>{ cell.getValue() ?? 'لا يوجد' }</span>;
				}
			},
			{
				id: 'description',
				accessorKey: 'description',
				header: 'الوصف',
				cell: ( { cell }: { cell: any; } ) =>
				{
					return <span className='text-xs'>{ cell.getValue() ?? 'لا يوجد' }</span>;
				}
			},
			{
				id: 'date',
				accessorKey: 'date',
				header: 'التاريخ',
				cell: ( { cell }: { cell: any; } ) =>
				{
					return <span className='text-xs'>{ cell.getValue() ?? 'لا يوجد' }</span>;
				}
			},
			{
				id: 'status',
				accessorKey: 'status',
				header: 'الحالة',
				cell: ( { cell }: { cell: any; } ) =>
				{
					return <span className='text-xs'>{ cell.getValue() ?? 'لا يوجد' }</span>;
				}
			},
		];
		const actionsColumns = {
			id: 'actions',
			header: 'الاجرائات',
			cell: ( { row }: { row: any; } ) =>
			{
				const taskId = row.original.id;
				const { EditTaskDialog } = useEditTask({ task: row.original });
				return (
					<div className="flex justify-end gap-2">
						<EditTaskDialog />
						<Popover open={openPopoverId === taskId} onOpenChange={(open) => setOpenPopoverId(open ? taskId : null)}>
							<PopoverTrigger asChild>
								<Button variant="secondary">
									حذف
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-80">
								<div className="flex flex-col gap-4">
									<p className="text-sm">هل أنت متأكد من حذف هذه المهمة؟</p>
									<div className="flex justify-end gap-2">
										<Button 
											variant="secondary" 
											onClick={() => setOpenPopoverId(null)}
										>
											إلغاء
										</Button>
										<Button 
											variant="destructive" 
											onClick={() => {
												deleteTask(taskId);
												setOpenPopoverId(null);
											}}
										>
											حذف
										</Button>
									</div>
								</div>
							</PopoverContent>
						</Popover>
					</div>
				);
			},
		};
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-expect-error
		dataColumns.push(actionsColumns)
		return dataColumns
	}, [deleteTask, openPopoverId] )
	return {
		columns
	}
}