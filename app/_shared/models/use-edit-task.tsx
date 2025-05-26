'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	useEditTaskMutation,
	useGetTaskQuery
} from '@/app/_shared/api/tasksApi'
import { TaskFormValues, taskSchema } from '@/app/_shared/validations/task'
import { useState, useEffect } from 'react'

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

	const onOpenChange = (newOpen: boolean) => {
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
			onOpenChange(false)
		} catch (error) {
			console.error('Failed to edit task:', error)
		}
	}

	return {
		onOpenChange,
		onSubmit,
		form,
		button,
		isLoading,
		open,
		setOpen
	}
}
