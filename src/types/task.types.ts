import {TagType} from '@/theme/types';

export interface Task {
  id: string;
  title: string;
  date: Date | null;
  tag: TagType;
  userId?: string;
}

export interface TaskState {
  tasks: Task[];
  filterTag: string | null;
}

export const TAG_OPTIONS = [
  {value: 'personal', label: 'Personal'},
  {value: 'work', label: 'Work'},
  {value: 'important', label: 'Important'},
  {value: 'idea', label: 'Idea'},
  {value: 'study', label: 'Study'},
];
