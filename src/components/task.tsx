import {FC} from 'react';
import {Calendar, Trash} from 'lucide-react';
import {format} from 'date-fns';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader} from '@/components/ui/card';
import EditTask from '@/components/edit-task';
import {useTheme} from '@/theme/use-theme';
import {Task as TaskType} from '@/types/task.types';

interface TaskProps extends TaskType {
  onDelete: (id: string) => void;
}

const Task: FC<TaskProps> = ({id, title, date, tag, onDelete}) => {
  const {tagColors} = useTheme();
  const tagColor = tagColors[tag];

  return (
    <Card className={`relative task-card-size ${tagColor}`}>
      <CardHeader />
      <CardContent>
        <div className="flex items-center gap-4">
          <p className="tex-md lg:text-xl py-4 text-black">{title}</p>
        </div>
        <div className="absolute top-4 right-4">
          <EditTask id={id} title={title} date={date} tag={tag} />
        </div>
        {date && (
          <div className="absolute bottom-4 left-4 flex gap-4 items-center">
            <Calendar className="w-4 h-4 text-black" />
            <p className="text-md text-black">{format(date, 'PP')}</p>
          </div>
        )}
        <div className="absolute bottom-4 right-4">
          <Button
            className="size-8 md:size-10 rounded-full"
            onClick={() => onDelete(id)}
          >
            <Trash />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Task;
