import { useState, useEffect } from "react";
import { Box, Divider } from "@mui/material";
import { db } from "@/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { Task, TaskCategory } from "@/components/ui/types";
import TaskBar from "@/components/ui/TaskBar";
import TaskLabel from "@/components/ui/TaskLabel";
import TaskAccordion from "@/components/ui/TaskAccordion";

// Define Initial Tasks
const initialTasks: Record<TaskCategory, Task[]> = {
  todo: [],
  inProgress: [],
  completed: [],
};

const TaskList = () => {
  const [tasks, setTasks] =
    useState<Record<TaskCategory, Task[]>>(initialTasks);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  // Apply search when clicking the icon
  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const filteredTasks = {
    todo: tasks.todo.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    inProgress: tasks.inProgress.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    completed: tasks.completed.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  };

  return (
    <Box sx={{ margin: 2 }}>
      {/* Task Create, filter and search bars */}
      <TaskBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
      />
      <Divider sx={{ my: 2 }} />
      {/* Task Lables */}
      <TaskLabel />
      {/* Todo Accordion List */}
      <TaskAccordion title="To-Do" category="todo" tasks={filteredTasks.todo} />
      <TaskAccordion
        title="In-Progress"
        category="inProgress"
        tasks={filteredTasks.inProgress}
      />
      {/* Completed Accordion List */}
      <TaskAccordion
        title="Completed"
        category="completed"
        tasks={filteredTasks.completed}
      />
    </Box>
  );
};

export default TaskList;
