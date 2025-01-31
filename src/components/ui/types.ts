// Define Task Type
export type Task = {
  id: number;
  title: string;
  date: string;
  type: "Work" | "Personal";
  completed: boolean;
  category: string;
};

// Define Task Category
export type TaskCategory = "todo" | "inProgress" | "completed";

// Define Task Accordion
export interface TaskAccordionProps {
  title: string;
  category: TaskCategory;
  tasks: Task[];
  moveTask: (taskId: number, from: TaskCategory, to: TaskCategory) => void;
  deleteTask: (taskId: number, category: TaskCategory) => void;
}

// Define Task Item
export type TaskItemProps = Omit<TaskAccordionProps, "title" | "tasks"> & {
  task: Task;
};
