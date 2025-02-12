import React, { useState } from "react";
import { Plus } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { addTask } from "@/redux/slices/task-slice";

import DatePicker from "./date-picker";

const AddTask = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        title: yup.string().required("Title is required"),
        date: yup.date().nullable().required("Date is required"),
      })
    ),
  });

  const onSubmit = (data: { title: string; date: Date | null }) => {
    dispatch(
      addTask({
        id: Math.random().toString(),
        title: data.title,
        date: data.date ? data.date.toISOString() : null,
        checked: false,
      })
    );
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-8 w-8 rounded-full" onClick={() => setOpen(true)}>
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="min-h-[250px]">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <DialogHeader className="mb-6">
            <DialogTitle>Task Tracker</DialogTitle>
            <DialogDescription>Create a new task</DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Controller
              name="title"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  name="title"
                  placeholder="Task"
                  onChange={onChange}
                  value={value || ""}
                />
              )}
            />
            {errors.title && (
              <p className="absolute top-9 left-3.5 text-red-500 text-sm">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="relative">
            <Controller
              name="date"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker value={value} onDateChange={onChange} />
              )}
            />
            {errors.date && (
              <p className="absolute top-9 left-3.5 text-red-500 text-sm">
                {errors.date.message}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="w-fit">
              Add Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
