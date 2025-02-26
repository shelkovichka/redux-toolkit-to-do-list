import React from "react";
import { Calendar, Trash } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface TaskProps {
  id: string;
  title: string;
  date: string | null;
  checked: boolean;
  onCheckboxChange: (id: string, checked: boolean) => void;
  onDelete: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({
  id,
  title,
  date,
  checked,
  onCheckboxChange,
  onDelete,
}) => {
  const formatDate = (date: string | null) => {
    if (date) return format(date, "dd.MM.yy");
  };

  return (
    <div className="flex justify-between items-center rounded-lg p-4 bg-muted text-muted-foreground">
      <div className="flex-col space-y-2">
        <div className="flex items-center gap-4">
          <Checkbox
            checked={checked}
            onCheckedChange={(checked: boolean) =>
              onCheckboxChange(id, checked)
            }
          />
          <p className={`${checked ? "line-through" : ""}`}>{title}</p>
        </div>
        <div className="flex gap-4">
          <Calendar className="w-4 h-4" />
          <p className="text-sm">Due {formatDate(date)}</p>
        </div>
      </div>

      <Button variant="ghost" onClick={() => onDelete(id)}>
        <Trash className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Task;
