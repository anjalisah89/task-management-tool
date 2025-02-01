import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Task, TaskCategory } from "@/components/ui/types";
import { db } from "@/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import TaskSheet from "@/components/ui/TaskSheet";

// Define Initial Tasks
const initialTasks: Record<TaskCategory, Task[]> = {
  todo: [],
  inProgress: [],
  completed: [],
};

const TaskBox = () => {
  const [tasks, setTasks] =
    useState<Record<TaskCategory, Task[]>>(initialTasks);

  // Fetch tasks from Firebase
  useEffect(() => {
    const q = query(collection(db, "todo"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedTasks: Record<TaskCategory, Task[]> = {
        todo: [],
        inProgress: [],
        completed: [],
      };

      snapshot.forEach((doc) => {
        const data = doc.data();
        const task: Task = {
          id: doc.id,
          title: data.title,
          date: new Date(data.date.seconds * 1000).toDateString(),
          type: data.type,
          completed: data.completed,
          category: data.category,
          description: data.description,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        };

        if (data.completed) {
          updatedTasks.completed.push(task);
        } else if (data.category === "inProgress") {
          updatedTasks.inProgress.push(task);
        } else {
          updatedTasks.todo.push(task);
        }
      });

      setTasks(updatedTasks); // Update the state with the new data
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        mt: 3,
      }}
    >
      {/* Todo Task Board */}
      <TaskSheet title="To-Do" category="todo" tasks={tasks.todo} />
      {/* In-Progress Task Board */}
      <TaskSheet
        title="In-Progress"
        category="inProgress"
        tasks={tasks.inProgress}
      />
      {/* Completed Task Board */}
      <TaskSheet
        title="Completed"
        category="completed"
        tasks={tasks.completed}
      />
    </Box>
  );
};

export default TaskBox;
