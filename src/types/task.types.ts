export interface Task {
  id: string;
  title: string;
  date: string | null;
  checked: boolean;
}

export interface TaskState {
  tasks: Task[];
}
