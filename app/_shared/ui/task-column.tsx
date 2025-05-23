"use client";

import { useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskCard } from "./task-card";

type Task = {
	id: string;
	title: string;
	description: string;
	date: string;
	status: "to do" | "progress" | "complete";
};

type TaskColumnProps = {
	id: string;
	title: string;
	color: string;
	tasks: Task[];
	onEdit: (task: Task) => void;
	onDelete: (taskId: string) => void;
	isDeleting: string | null;
	onDeleteConfirm: (taskId: string) => void;
	onDeleteCancel: () => void;
};

export const TaskColumn = ({
	id,
	title,
	color,
	tasks,
	onEdit,
	onDelete,
	isDeleting,
	onDeleteConfirm,
	onDeleteCancel,
}: TaskColumnProps) => {
	const { setNodeRef } = useDroppable({
		id,
	});

	return (
		<div className="space-y-4">
			<div className={`p-4 rounded-xl ${color} shadow-sm`}>
				<h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{title}</h3>
				<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
					{tasks.length} مهام
				</p>
			</div>
			<div
				ref={setNodeRef}
				className="min-h-[100px] space-y-3 p-3 rounded-xl border-2 border-dashed border-gray-200/50 dark:border-gray-800/50 bg-gray-50/30 dark:bg-gray-900/30 backdrop-blur-sm"
			>
				<SortableContext
					items={tasks.map(t => t.id)}
					strategy={verticalListSortingStrategy}
				>
					{tasks.map(task => (
						<TaskCard
							key={task.id}
							task={task}
							onEdit={() => onEdit(task)}
							onDelete={() => onDelete(task.id)}
							isDeleting={isDeleting === task.id}
							onDeleteConfirm={() => onDeleteConfirm(task.id)}
							onDeleteCancel={onDeleteCancel}
						/>
					))}
					{/* Empty drop slot */}
					<div 
						className="h-32 p-4 rounded-lg border-2 border-dashed border-gray-200/50 dark:border-gray-800/50 bg-gray-50/30 dark:bg-gray-900/30 backdrop-blur-sm flex items-center justify-center"
						data-droppable="true"
					>
						<span className="text-sm text-gray-500 dark:text-gray-400">اسحب المهمة هنا</span>
					</div>
				</SortableContext>
			</div>
		</div>
	);
};
