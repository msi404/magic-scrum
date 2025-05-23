import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTaskMutation } from "@/app/_shared/api/tasksApi";
import { TaskFormValues, taskSchema } from "@/app/_shared/validations/task";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_shared/ui/form";
import { Input } from "@/app/_shared/ui/input";
import { Button } from "@/app/_shared/ui/button";
import { DynamicDialog } from "@/app/_shared/ui/dynamic-dialog";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_shared/ui/select";
import { DatePicker } from "@/app/_shared/ui/date-picker";

export const useCreateTask = () => {
  const [createTask] = useCreateTaskMutation();
  const [open, setOpen] = useState(false);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      status: "progress",
    } satisfies TaskFormValues,
  });

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      form.reset();
    }
  };

  const onSubmit = async (data: TaskFormValues) => {
    try {
      await createTask({
        title: String(data.title),
        description: String(data.description),
        date: String(data.date),
        status: String(data.status)
      }).unwrap();
      handleOpenChange(false);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const CreateTaskDialog = () => (
    <DynamicDialog
      button={<Button>إنشاء مهمة جديدة</Button>}
      title="إنشاء مهمة جديدة"
      description="قم بإدخال تفاصيل المهمة الجديدة"
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
                    onChange={(date) => field.onChange(date?.toISOString() ?? "")}
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            >
              إلغاء
            </Button>
            <Button type="submit">حفظ</Button>
          </div>
        </form>
      </Form>
    </DynamicDialog>
  );

  return {
    CreateTaskDialog,
  };
};
