'use client'
import { type FC } from 'react'
import { useCreateTask } from '@/app/_shared/models/use-create-task'

import {
	Input,
	Button,
	DynamicDialog,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	DatePicker
} from '@/app/_shared/ui'

export const CreateTask: FC = () => {
	const { open, onOpenChange, form, onSubmit } = useCreateTask()
	return (
		<DynamicDialog
			button={<Button>إنشاء تاسك جديد</Button>}
			title="إنشاء تاسك جديد"
			description="قم بإدخال تفاصيل التاسك الجديد"
			open={open}
			onOpenChange={onOpenChange}
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
									<Input {...field} />
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
									<Input {...field} />
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
							onClick={() => onOpenChange(false)}
						>
							إلغاء
						</Button>
						<Button type="submit">حفظ</Button>
					</div>
				</form>
			</Form>
		</DynamicDialog>
	)
}
