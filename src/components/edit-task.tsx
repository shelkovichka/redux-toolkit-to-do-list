import { useDispatch } from "react-redux";
import { Pencil } from "lucide-react";
import { Task } from "@/types/task.types";
import { updateTask } from "@/redux/slices/task-slice";
import TaskForm from "./task-form";

export const EditTask: React.FC<Task> = (task) => {
  const dispatch = useDispatch();

  const handleUpdateTask = (data: Task) => {
    dispatch(
      updateTask({
        ...data,
        userId: task.userId,
      })
    );
  };

  return (
    <TaskForm
      initialData={task}
      onSubmit={handleUpdateTask}
      buttonLabel="Update your note"
      icon={<Pencil />}
    />
  );
};

export default EditTask;
