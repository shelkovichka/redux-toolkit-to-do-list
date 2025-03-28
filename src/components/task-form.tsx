import {FC, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {cn} from '@/lib/utils';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import DatePicker from '@/components/date-picker';
import {Task} from '@/types/task.types';
import {TagType} from '@/theme/types';
import {useTheme} from '@/theme/use-theme';
const schema = yup.object().shape({
  title: yup
      .string()
      .max(100, 'Max number of symbols is 100')
      .required('Title is required'),
  date: yup.date().nullable().defined(),
  tag: yup.string() as yup.Schema<TagType>,
});

interface TaskFormProps {
  initialData?: Partial<Task>;
  onSubmit: (data: Task) => void;
  buttonLabel: string;
  icon: React.ReactNode;
  className?: string;
  tooltipText: string;
}

interface FormValues {
  title: string;
  date: Date | null;
  tag: TagType;
}

const TaskForm: FC<TaskFormProps> = ({
  initialData,
  onSubmit,
  buttonLabel,
  icon,
  className,
  tooltipText,
}) => {
  const [open, setOpen] = useState(false);
  const {tagColors} = useTheme();

  const {
    handleSubmit,
    control,
    formState: {errors},
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: initialData?.title || '',
      date: initialData?.date ?? null,
      tag: initialData?.tag || 'personal',
    },
  });

  const handleFormSubmit = (data: FormValues) => {
    onSubmit({
      ...data,
      id: initialData?.id || Math.random().toString(),
      userId: initialData?.userId,
    });
    reset();
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className={cn('rounded-full', className)}
                onClick={() => setOpen(true)}
              >
                {icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent
        className="min-h-[250px] max-w-[450px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
        data-no-dnd="true"
        onMouseDown={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <DialogHeader className="mb-6 text-left">
            <DialogTitle>Notes</DialogTitle>
            <DialogDescription>{buttonLabel}</DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Controller
              name="title"
              control={control}
              render={({field}) => (
                <Textarea
                  autoFocus={false}
                  placeholder="Task"
                  className={`max-h-[200px] ${
                    errors.title && 'border-red-500'
                  }`}
                  {...field}
                />
              )}
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
                render={({field}) => (
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
                render={({field: {onChange, value}}) => (
                  <Select onValueChange={onChange} defaultValue={value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tag" />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(tagColors) as TagType[]).map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          <div className="flex items-center gap-2">
                            <div
                              className={`size-4 ${tagColors[tag]} 
                                rounded-full`}
                            />
                            <span>{tag}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
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
