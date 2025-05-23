"use client";

import {
	useGetTasksQuery,
	useEditTaskMutation,
} from "@/app/_shared/api/tasksApi";
import { useCreateTask } from "@/app/_shared/models/use-create-task";
import { useEditTask } from "@/app/_shared/models/use-edit-task";
import { useDeleteTaskMutation } from "@/app/_shared/api/tasksApi";
import { useState } from "react";
import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	useSensor,
	useSensors,
	PointerSensor,
	DragOverEvent,
} from "@dnd-kit/core";
import { TaskColumn } from "./task-column";
import { TaskCard } from "./task-card";

type Task = {
	id: string;
	title: string;
	description: string;
	date: string;
	status: "to do" | "progress" | "complete";
};

const statusConfig = {
	"to do": {
		title: "قيد التنفيذ",
		color: "bg-gradient-to-br from-green-50/80 via-green-100/80 to-green-200/80 backdrop-blur-sm dark:from-green-900/80 dark:via-green-800/80 dark:to-green-700/80 border border-green-100/20 dark:border-green-800/20",
	},
	progress: {
		title: "قيد المراجعة",
		color: "bg-gradient-to-br from-yellow-50/80 via-yellow-100/80 to-yellow-200/80 backdrop-blur-sm dark:from-yellow-900/80 dark:via-yellow-800/80 dark:to-yellow-700/80 border border-yellow-100/20 dark:border-yellow-800/20",
	},
	complete: {
		title: "مكتمل",
		color: "bg-gradient-to-br from-blue-50/80 via-blue-100/80 to-blue-200/80 backdrop-blur-sm dark:from-blue-900/80 dark:via-blue-800/80 dark:to-blue-700/80 border border-blue-100/20 dark:border-blue-800/20",
	},
} as const;

export const TaskBoard = () => {
	const { data: tasks = [] } = useGetTasksQuery({});
	const [deleteTask] = useDeleteTaskMutation();
	const [editTask] = useEditTaskMutation();
	const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
	const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
	const [activeTask, setActiveTask] = useState<Task | null>(null);
	const { CreateTaskDialog } = useCreateTask();
	const { EditTaskDialog, setOpen: setEditDialogOpen } = useEditTask({
		task: editingTask,
		button: null,
	});

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	);

	const getTasksByStatus = (status: Task["status"]) => {
		return tasks.filter((task: Task) => task.status === status);
	};

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		const task = tasks.find((t: Task) => t.id === active.id);
		if (task) {
			setActiveTask(task);
		}
	};

	const handleDragOver = (event: DragOverEvent) => {
		const { active, over } = event;
		if (!over) return;

		const activeTask = tasks.find((t: Task) => t.id === active.id);
		const overTask = tasks.find((t: Task) => t.id === over.id);
		
		if (!activeTask || !overTask) return;

		// If dragging over a task, update the status to match the over task's status
		if (activeTask.status !== overTask.status) {
			editTask({
				id: activeTask.id,
				...activeTask,
				status: overTask.status,
			});
		}
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		setActiveTask(null);

		if (!over) return;

		const taskId = active.id as string;
		const newStatus = over.id as Task["status"];

		const task = tasks.find((t: Task) => t.id === taskId);
		if (!task || task.status === newStatus) return;

		editTask({
			id: taskId,
			...task,
			status: newStatus,
		});
	};

	return (
		<div className="space-y-6 p-4">
			<div className="flex justify-end mb-6">
				<CreateTaskDialog />
			</div>
			<DndContext
				sensors={sensors}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
			>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{Object.entries(statusConfig).map(([status, config]) => (
						<TaskColumn
							key={status}
							id={status}
							title={config.title}
							color={config.color}
							tasks={getTasksByStatus(status as Task["status"])}
							onEdit={task => {
								setEditingTask(task);
								setEditDialogOpen(true);
							}}
							onDelete={setOpenPopoverId}
							isDeleting={openPopoverId}
							onDeleteConfirm={taskId => {
								deleteTask(taskId);
								setOpenPopoverId(null);
							}}
							onDeleteCancel={() => setOpenPopoverId(null)}
						/>
					))}
				</div>
				<DragOverlay>
					{activeTask ? (
						<TaskCard
							task={activeTask}
							onEdit={() => {}}
							onDelete={() => {}}
							isDeleting={false}
							onDeleteConfirm={() => {}}
							onDeleteCancel={() => {}}
							isDragging={true}
						/>
					) : null}
				</DragOverlay>
			</DndContext>
			{editingTask && <EditTaskDialog />}
		</div>
	);
};
