'use client'

import {
	Card,
	CardContent,
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/app/_shared/ui'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

type Task = {
	id: string
	title: string
	description: string
	date: string
	status: 'to do' | 'progress' | 'complete'
}

const statusGradients = {
	'to do':
		'bg-gradient-to-br from-green-50/80 via-green-100/80 to-green-200/80 dark:from-green-900/80 dark:via-green-800/80 dark:to-green-700/80 border-green-100/20 dark:border-green-800/20',
	progress:
		'bg-gradient-to-br from-yellow-50/80 via-yellow-100/80 to-yellow-200/80 dark:from-yellow-900/80 dark:via-yellow-800/80 dark:to-yellow-700/80 border-yellow-100/20 dark:border-yellow-800/20',
	complete:
		'bg-gradient-to-br from-blue-50/80 via-blue-100/80 to-blue-200/80 dark:from-blue-900/80 dark:via-blue-800/80 dark:to-blue-700/80 border-blue-100/20 dark:border-blue-800/20'
} as const

type TaskCardProps = {
	task: Task
	onEdit: () => void
	onDelete: () => void
	isDeleting: boolean
	onDeleteConfirm: () => void
	onDeleteCancel: () => void
	isDragging?: boolean
}

export const TaskCard = ({
	task,
	onEdit,
	onDelete,
	isDeleting,
	onDeleteConfirm,
	onDeleteCancel,
	isDragging = false
}: TaskCardProps) => {
	const [isExiting, setIsExiting] = useState(false)
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging: isSortableDragging
	} = useSortable({
		id: task.id,
		data: {
			type: 'task',
			task
		}
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isSortableDragging ? 0.5 : 1
	}

	const handleDelete = () => {
		setIsExiting(true)
		setTimeout(() => {
			onDeleteConfirm()
		}, 300)
	}

	const cardContent = (
		<Card
			ref={setNodeRef}
			style={style}
			className={`p-4 cursor-grab active:cursor-grabbing ${
				statusGradients[task.status]
			} backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300 ${
				isDragging ? 'opacity-90' : ''
			}`}
			{...attributes}
			{...listeners}
		>
			<CardContent className="p-0">
				<div className="space-y-3">
					<h4 className="font-medium bg-gradient-to-r from-orange-500 to-purple-500 dark:from-orange-400 dark:to-purple-400 bg-clip-text text-transparent">
						{task.title}
					</h4>
					<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
						{task.description}
					</p>
					<p className="text-xs text-gray-500 dark:text-gray-500">
						{task.date}
					</p>
					<div className="flex justify-end gap-2 pt-2">
						<Button
							variant="secondary"
							size="sm"
							onClick={onEdit}
							className="bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-900 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 shadow-sm hover:shadow transition-all duration-300"
						>
							تعديل
						</Button>
						<Popover
							open={isDeleting}
							onOpenChange={(open) => !open && onDeleteCancel()}
						>
							<PopoverTrigger asChild>
								<Button
									variant="secondary"
									size="sm"
									onClick={onDelete}
									className="bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-900 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-red-600 dark:text-red-400 shadow-sm hover:shadow transition-all duration-300"
								>
									حذف
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-xl">
								<div className="flex flex-col gap-4">
									<p className="text-sm text-gray-700 dark:text-gray-300">
										هل أنت متأكد من حذف هذه المهمة؟
									</p>
									<div className="flex justify-end gap-2">
										<Button
											variant="secondary"
											size="sm"
											onClick={onDeleteCancel}
											className="bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-900 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 shadow-sm hover:shadow transition-all duration-300"
										>
											إلغاء
										</Button>
										<Button
											variant="destructive"
											size="sm"
											onClick={handleDelete}
											className="bg-red-50 dark:bg-red-900/50 hover:bg-red-100 dark:hover:bg-red-900/70 backdrop-blur-sm border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 shadow-sm hover:shadow transition-all duration-300"
										>
											حذف
										</Button>
									</div>
								</div>
							</PopoverContent>
						</Popover>
					</div>
				</div>
			</CardContent>
		</Card>
	)

	if (isDragging) {
		return cardContent
	}

	return (
		<AnimatePresence mode="wait" onExitComplete={() => setIsExiting(false)}>
			{!isExiting && (
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{
						opacity: 0,
						scale: 0.8,
						transition: {
							duration: 0.3,
							ease: 'easeInOut'
						}
					}}
					layout
				>
					{cardContent}
				</motion.div>
			)}
		</AnimatePresence>
	)
}
