'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateTaskMutation } from '@/app/_shared/api/tasksApi'
import { TaskFormValues, taskSchema } from '@/app/_shared/validations/task'

export const useCreateTask = () => {
	const [createTask] = useCreateTaskMutation()
	const [open, setOpen] = useState(false)

	const form = useForm<TaskFormValues>({
		resolver: zodResolver(taskSchema),
		defaultValues: {
			title: '',
			description: '',
			date: '',
			status: 'progress'
		} satisfies TaskFormValues
	})

	const onOpenChange = (newOpen: boolean) => {
		setOpen(newOpen)
		if (!newOpen) {
			form.reset()
		}
	}

	const onSubmit = async (data: TaskFormValues) => {
		try {
			await createTask({
				title: String(data.title),
				description: String(data.description),
				date: String(data.date),
				status: String(data.status)
			}).unwrap()
			onOpenChange(false)
		} catch (error) {
			console.error('Failed to create task:', error)
		}
	}

	return {
		open,
		form,
		onSubmit,
		onOpenChange
	}
}
