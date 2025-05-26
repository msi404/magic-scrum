'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	useEditTaskMutation,
	useGetTaskQuery
} from '@/app/_shared/api/tasksApi'
import { TaskFormValues, taskSchema } from '@/app/_shared/validations/task'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/app/_shared/ui/form'
import { Input } from '@/app/_shared/ui/input'
import { Button } from '@/app/_shared/ui/button'
import { DynamicDialog } from '@/app/_shared/ui/dynamic-dialog'
import { useState, useEffect } from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/app/_shared/ui/select'
import { DatePicker } from '@/app/_shared/ui/date-picker'

type Task = {
	id: string
	title: string
	description: string
	date: string
	status: 'to do' | 'progress' | 'complete'
}

type UseEditTaskProps = {
	task?: Task
	button?: React.ReactNode
}

export const useEditTask = ({ task, button }: UseEditTaskProps = {}) => {
	const [editTask] = useEditTaskMutation({})
	const [open, setOpen] = useState(false)
	const { data: latestTask, isLoading } = useGetTaskQuery(task?.id ?? '', {
		skip: !task?.id || !open
	})

	const form = useForm<TaskFormValues>({
		resolver: zodResolver(taskSchema),
		defaultValues: {
			title: task?.title ?? '',
			description: task?.description ?? '',
			date: task?.date ?? '',
			status: task?.status ?? 'progress'
		}
	})

	useEffect(() => {
		if (latestTask) {
			form.reset({
				title: latestTask.title,
				description: latestTask.description,
				date: latestTask.date,
				status: latestTask.status
			})
		}
	}, [latestTask, form])

	const handleOpenChange = (newOpen: boolean) => {
		setOpen(newOpen)
		if (!newOpen) {
			form.reset({
				title: task?.title ?? '',
				description: task?.description ?? '',
				date: task?.date ?? '',
				status: task?.status ?? 'progress'
			})
		}
	}

	const onSubmit = async (data: TaskFormValues) => {
		if (!task?.id) return

		try {
			await editTask({ id: task.id, ...data }).unwrap()
			handleOpenChange(false)
		} catch (error) {
			console.error('Failed to edit task:', error)
		}
	}

	const EditTaskDialog = () => (
		<DynamicDialog
			button={button}
			title="تعديل المهمة"
			description="قم بتعديل تفاصيل المهمة"
			open={open}
			onOpenChange={handleOpenChange}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>العنوان</FormLabel>
								<FormControl>
									<Input {...field} disabled={isLoading} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>الوصف</FormLabel>
								<FormControl>
									<Input {...field} disabled={isLoading} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="date"
						render={({ field }) => (
							<FormItem>
								<FormLabel>التاريخ</FormLabel>
								<FormControl>
									<DatePicker
										value={field.value ? new Date(field.value) : null}
										onChange={(date) =>
											field.onChange(date?.toISOString() ?? '')
										}
										disabled={isLoading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormLabel>الحالة</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									disabled={isLoading}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="اختر الحالة" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="to do">قيد التنفيذ</SelectItem>
										<SelectItem value="progress">قيد المراجعة</SelectItem>
										<SelectItem value="complete">مكتمل</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-end gap-2">
						<Button
							type="button"
							variant="secondary"
							onClick={() => handleOpenChange(false)}
							disabled={isLoading}
						>
							إلغاء
						</Button>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? 'جاري التحميل...' : 'حفظ'}
						</Button>
					</div>
				</form>
			</Form>
		</DynamicDialog>
	)

	return {
		EditTaskDialog,
		setOpen
	}
}
