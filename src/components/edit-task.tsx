import { useDispatch } from "react-redux";
import { Pencil } from "lucide-react";

import { type Task } from "@/types/task.types";
import { updateTask } from "@/redux/slices/task-slice";
import TaskForm from "./task-form";

export const EditTask: React.FC<Task> = (task) => {
  const dispatch = useDispatch();
  return (
    <TaskForm
      initialData={task}
      onSubmit={(data) => dispatch(updateTask(data))}
      buttonLabel="Update your note"
      icon={<Pencil />}
    />
  );
};

export default EditTask;
