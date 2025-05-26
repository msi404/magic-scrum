import { z } from 'zod'

export const taskSchema = z.object({
	title: z.string().min(1, 'العنوان مطلوب'),
	description: z.string().min(1, 'الوصف مطلوب'),
	date: z.string().min(1, 'التاريخ مطلوب'),
	status: z.enum(['to do', 'progress', 'complete'], {
		errorMap: () => ({
			message: 'الحالة يجب أن تكون: قيد التنفيذ , قيد المراجعة أو مكتملة'
		})
	})
})

export type TaskFormValues = z.infer<typeof taskSchema>
