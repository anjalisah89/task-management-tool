// Define Task Type
export type Task = {
  id: string;
  title: string;
  date: string;
  type: "Work" | "Personal";
  completed: boolean;
  category: string;
  description: string;
  createdAt: string;
};

// Define Task Category
export type TaskCategory = "todo" | "inProgress" | "completed";

// Define Task Accordion
export interface TaskAccordionProps {
  title: string;
  category: TaskCategory;
  tasks: Task[];
}

// Define Task Item
export type TaskItemProps = Omit<TaskAccordionProps, "title" | "tasks"> & {
  task: Task;
};
