'use client'
import { type FC } from 'react'
import { useEditTask } from '@/app/_shared/models/use-edit-task'
import {
	DynamicDialog,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Button,
	Input,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	DatePicker
} from '@/app/_shared/ui'

export const EditTask: FC = () => {
	const { button, onOpenChange, open, onSubmit, form, isLoading } =
		useEditTask()
	return (
		<DynamicDialog
			button={button}
			title="تعديل المهمة"
			description="قم بتعديل تفاصيل المهمة"
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
							onClick={() => onOpenChange(false)}
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
}
