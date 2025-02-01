import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { db } from "@/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import TaskBar from "@/components/ui/TaskBar";
import TaskSheet from "@/components/ui/TaskSheet";
import { Task, TaskCategory } from "@/components/ui/types";

// Define Initial Tasks
const initialTasks: Record<TaskCategory, Task[]> = {
  todo: [],
  inProgress: [],
  completed: [],
};

const TaskBox = () => {
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

  // Filter tasks based on search query
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
      {/* Task Create, Filter, and Search Bar */}
      <TaskBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
      />
      <Box sx={{ display: "flex", gap: 3, mt: 3 }}>
        {/* Todo Task Board */}
        <TaskSheet title="To-Do" category="todo" tasks={filteredTasks.todo} />
        {/* In-Progress Task Board */}
        <TaskSheet
          title="In-Progress"
          category="inProgress"
          tasks={filteredTasks.inProgress}
        />
        {/* Completed Task Board */}
        <TaskSheet
          title="Completed"
          category="completed"
          tasks={filteredTasks.completed}
        />
      </Box>
    </Box>
  );
};

export default TaskBox;
