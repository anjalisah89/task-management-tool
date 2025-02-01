import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import TaskAccordion from "@/components/ui/TaskAccordion";
import { Task, TaskCategory } from "@/components/ui/types";
import { db } from "@/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

// Define Initial Tasks
const initialTasks: Record<TaskCategory, Task[]> = {
  todo: [],
  inProgress: [],
  completed: [],
};

const AccordionList = () => {
  const [tasks, setTasks] =
    useState<Record<TaskCategory, Task[]>>(initialTasks);

  // Fetch tasks from Firebase
  useEffect(() => {
    const q = query(collection(db, "todo"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Security Check
      if (snapshot.empty) {
        // console.log("No data found!");
        return;
      }

      const updatedTasks: Record<TaskCategory, Task[]> = {
        todo: [],
        inProgress: [],
        completed: [],
      };

      snapshot.forEach((doc) => {
        const data = doc.data();
        // console.log("Fetched data:", data);

        const task: Task = {
          id: doc.id,
          title: data.title,
          date: new Date(data.date.seconds * 1000).toDateString(),
          type: data.type,
          completed: data.completed,
          category: data.category,
        };

        if (data.completed) {
          updatedTasks.completed.push(task);
        } else if (data.category === "inProgress") {
          updatedTasks.inProgress.push(task);
        } else {
          updatedTasks.todo.push(task);
        }
      });

      setTasks(updatedTasks);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Box sx={{ marginY: 2 }}>
      <TaskAccordion title="To-Do" category="todo" tasks={tasks.todo} />
      <TaskAccordion
        title="In-Progress"
        category="inProgress"
        tasks={tasks.inProgress}
      />
      <TaskAccordion
        title="Completed"
        category="completed"
        tasks={tasks.completed}
      />
    </Box>
  );
};

export default AccordionList;
