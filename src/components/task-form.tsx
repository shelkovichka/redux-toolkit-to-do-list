import React, { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import DatePicker from "@/components/date-picker";
import { Task, TAG_OPTIONS } from "@/types/task.types";

const schema = yup.object().shape({
  title: yup
    .string()
    .max(100, "Max number of symbols is 100")
    .required("Title is required"),
  date: yup.date().nullable(),
  tag: yup.string().required("Tag is required"),
});

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: Task) => void;
  buttonLabel: string;
  icon: React.ReactNode;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialData,
  onSubmit,
  buttonLabel,
  icon,
}) => {
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: initialData?.title || "",
      date: initialData?.date ?? null,
      tag: initialData?.tag || "",
    },
  });

  const handleFormSubmit = (data: {
    title: string;
    date?: Date | null;
    tag: string;
  }) => {
    onSubmit({ id: initialData?.id || Math.random().toString(), ...data });
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-10 w-10 rounded-full"
          onClick={() => setOpen(true)}
        >
          {icon}
        </Button>
      </DialogTrigger>
      <DialogContent className="min-h-[250px]">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="w-full space-y-6"
        >
          <DialogHeader className="mb-6">
            <DialogTitle>Notes</DialogTitle>
            <DialogDescription>{buttonLabel}</DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Controller
              name="title"
              control={control}
              render={({ field }) => <Textarea placeholder="Task" {...field} />}
            />
            {errors.title && (
              <p className="absolute top-15 left-3.5 text-red-500 text-sm">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value}
                    onDateChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="relative flex-1">
              <Controller
                name="tag"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} defaultValue={value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tag" />
                    </SelectTrigger>
                    <SelectContent>
                      {TAG_OPTIONS.map((tag) => (
                        <SelectItem key={tag.value} value={tag.value}>
                          {tag.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.tag && (
                <p className="absolute top-9 left-3.5 text-red-500 text-sm">
                  {errors.tag.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="w-fit">
              {buttonLabel}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
