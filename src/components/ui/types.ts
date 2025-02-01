// Define Task Type

export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export type Task = {
  id: string;
  title: string;
  date: string;
  type: "Work" | "Personal";
  completed: boolean;
  category: string;
  description: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

// Define Task Category
export type TaskCategory = "todo" | "inProgress" | "completed";

// Define Task Props
export interface TaskProps {
  title: string;
  category: TaskCategory;
  tasks: Task[];
}

// Define Task Item
export type TaskItemProps = Omit<TaskProps, "title" | "tasks"> & {
  task: Task;
};
