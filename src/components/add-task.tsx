import { useDispatch } from "react-redux";
import { Plus } from "lucide-react";

import { addTask } from "@/redux/slices/task-slice";
import TaskForm from "./task-form";

const AddTask = () => {
  const dispatch = useDispatch();
  return (
    <TaskForm
      onSubmit={(data) => dispatch(addTask(data))}
      buttonLabel="Create a note"
      icon={<Plus />}
    />
  );
};

export default AddTask;
