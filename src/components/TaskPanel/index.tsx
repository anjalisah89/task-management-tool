import { useState, useEffect } from "react";
import { Box, Divider, useMediaQuery } from "@mui/material";
import { db } from "@/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { Task, TaskCategory } from "@/components/ui/types";
import TaskBar from "@/components/ui/TaskBar";
import TaskLabel from "@/components/ui/TaskLabel";
import TaskAccordion from "@/components/ui/TaskAccordion";
import TaskSheet from "@/components/ui/TaskSheet";

// Define Initial Tasks
const initialTasks: Record<TaskCategory, Task[]> = {
  todo: [],
  inProgress: [],
  completed: [],
};

const TaskPanel = ({ selectedTab }: { selectedTab: number }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [tasks, setTasks] =
    useState<Record<TaskCategory, Task[]>>(initialTasks);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

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
          date: new Date(data.date.seconds * 1000).toDateString(), // Convert to readable date
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

  // Function to match the selected date range
  const matchDateFilter = (taskDate: string) => {
    if (!selectedDate) return true;

    const today = new Date();
    const taskDateObj = new Date(taskDate);
    switch (selectedDate) {
      case "Yesterday":
        return (
          taskDateObj.toDateString() ===
          new Date(today.setDate(today.getDate() - 1)).toDateString()
        );
      case "Today":
        return taskDateObj.toDateString() === new Date().toDateString();
      case "Tomorrow":
        return (
          taskDateObj.toDateString() ===
          new Date(today.setDate(today.getDate() + 1)).toDateString()
        );
      case "Within a Week":
        return taskDateObj > new Date(today.setDate(today.getDate() - 7));
      case "Within a Month":
        return taskDateObj > new Date(today.setMonth(today.getMonth() - 1));
      case "Within a Year":
        return (
          taskDateObj > new Date(today.setFullYear(today.getFullYear() - 1))
        );
      default:
        return true;
    }
  };

  // Filtered tasks based on search, status, and date
  const filteredTasks = {
    todo: tasks.todo.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!selectedStatus || task.type === selectedStatus) &&
        matchDateFilter(task.date)
    ),
    inProgress: tasks.inProgress.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!selectedStatus || task.type === selectedStatus) &&
        matchDateFilter(task.date)
    ),
    completed: tasks.completed.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!selectedStatus || task.type === selectedStatus) &&
        matchDateFilter(task.date)
    ),
  };

  return (
    <Box sx={{ margin: 2, pr: isMobile ? 0 : 2 }}>
      {/* Task Create, filter and search bars */}
      <TaskBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={() => setSearchQuery(searchInput)}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {selectedTab === 0 ? (
        // Render the List view content
        <>
          {!isMobile && <Divider sx={{ my: 2 }} />}
          {/* Task Lables */}
          {!isMobile && <TaskLabel />}
          {/* Todo Accordion List */}
          <TaskAccordion
            title="To-Do"
            category="todo"
            tasks={filteredTasks.todo}
          />
          {/* Todo Accordion List */}
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
        </>
      ) : (
        // Render the Board view content
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
      )}
    </Box>
  );
};

export default TaskPanel;
