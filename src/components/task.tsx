import {FC} from 'react';
import {Calendar, Trash, GripVertical} from 'lucide-react';
import {format} from 'date-fns';
import {useSnackbar} from 'notistack';
import {useDispatch} from 'react-redux';

import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import EditTask from '@/components/edit-task';
import {useTheme} from '@/theme/use-theme';
import {Task as TaskType} from '@/types/task.types';
import {deleteTask} from '@/redux/slices/task-slice';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Task: FC<TaskType> = ({id, title, date, tag}) => {
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();

  const {tagColors} = useTheme();
  const tagColor = tagColors[tag];

  const handleDelete = () => {
    dispatch(deleteTask(id));
    enqueueSnackbar('Note deleted!', {variant: 'info'});
  };

  return (
    <Card
      className={`
        size-72 sm:size-56 md:size-64 lg:size-80 ${tagColor}
        cursor-grab active:cursor-grabbing
      `}
    >
      <CardContent className="flex flex-col p-4 h-full justify-between">
        <div>
          <div className="flex justify-between">
            <div className="pt-2 text-gray-500 hover:opacity-100">
              <GripVertical size={16} />
            </div>
            <div data-no-dnd="true">
              <EditTask id={id} title={title} date={date} tag={tag} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-md lg:text-xl py-4 text-black">{title}</p>
          </div>
        </div>
        <div className="flex justify-between items-end w-full">
          <div>
            {date && (
              <div className="flex gap-4 items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Calendar className="w-4 h-4 text-black" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Due date</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className="text-sm lg:text-base text-black">
                  {format(date, 'PP')}
                </p>
              </div>
            )}
          </div>
          <div className="flex self-end" data-no-dnd="true">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="size-8 md:size-10 rounded-full"
                    onClick={() => handleDelete()}
                  >
                    <Trash />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete note</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Task;
