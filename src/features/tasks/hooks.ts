import { useState, useEffect } from "react";
import {
  getTaskAction,
  addTaskAction,
  toggleTaskAction,
  deleteCompletedTasksAction,
} from "./actions";
import type { Task } from "./types";
import type { KeyboardEvent } from "react";

function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const tasksFromDB = await getTaskAction();
      setTasks(tasksFromDB);
    };
    loadTasks();
  }, []);

  const addTask = async (title: string) => {
    if (title.trim() === "") return;

    const tmpId = Date.now();
    const tmpTask: Task = {
      id: tmpId,
      title: title,
      is_completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, tmpTask]);

    try {
      const newTask = await addTaskAction(title);

      if (newTask) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === tmpId ? newTask : task))
        );
      }
    } catch (error) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id == tmpId ? tmpTask : task))
      );
      console.error("Faild to add task with:", error);
    }
  };

  const toggleCheckboxChange = async (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, is_completed: !task.is_completed } : task
      )
    );

    try {
      const updatedTask = await toggleTaskAction(id);

      if (updatedTask) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? updatedTask : task))
        );
      }
    } catch (error) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, is_completed: !task.is_completed } : task
        )
      );
      console.error("Failed to toggle completed flag with:", error);
    }
  };

  const deleteCompletedTasks = async (tasks: Task[]): Promise<void> => {
    const completedTasksIds = tasks
      .filter((task) => task.is_completed)
      .map((task) => task.id);

    const inCompletedTasks = tasks.filter((task) => !task.is_completed);
    setTasks(inCompletedTasks);

    try {
      await deleteCompletedTasksAction(completedTasksIds);
    } catch (error) {
      console.error("Failed to delete completed tasks with:", error);
    }
  };

  return {
    tasks,
    addTask,
    toggleCheckboxChange,
    deleteCompletedTasks,
  };
}

function useNewTaskInput() {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    onSubmit: (title: string) => void
  ) => {
    if (e.key == "Enter") {
      setNewTaskTitle("");
      onSubmit(newTaskTitle);
    }
  };
  return {
    newTaskTitle,
    setNewTaskTitle,
    handleKeyDown,
  };
}

export { useTasks, useNewTaskInput };
