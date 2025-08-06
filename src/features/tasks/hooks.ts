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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubTaskMode, setIsSubTaskMode] = useState(false);
  const [latestTask, setLatestTask] = useState<Task>(tasks[tasks.length - 1]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksFromDB = await getTaskAction();
        setTasks(tasksFromDB);
        setLatestTask(tasksFromDB[tasksFromDB.length - 1]);
      } catch (error) {
        console.error("Failed to load tasks with: ", error);
      } finally {
        setIsLoading(false);
      }
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

    setLatestTask(tmpTask);

    try {
      const newTask = await addTaskAction(title);

      if (newTask) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === tmpId ? newTask : task))
        );

        setLatestTask(newTask);
      }
    } catch (error) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id == tmpId ? tmpTask : task))
      );
      setLatestTask(tmpTask);

      console.error("Faild to add task with:", error);
    }
  };

  const addSubTask = async (parentId: number, title: string) => {
    if (title.trim() === "") return;

    const tmpId = Date.now();
    const tmpTask: Task = {
      id: tmpId,
      parent_task_id: parentId,
      title: title,
      is_completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, tmpTask]);

    setLatestTask(tmpTask);

    try {
      const newTask = await addTaskAction(title);

      if (newTask) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === tmpId ? newTask : task))
        );

        setLatestTask(newTask);
      }
    } catch (error) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id == tmpId ? tmpTask : task))
      );
      setLatestTask(tmpTask);

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

  const toggleSubTaskMode = () => {
    setIsSubTaskMode((prev) => !prev);
  };

  return {
    tasks,
    isLoading,
    isSubTaskMode,
    latestTask,
    addTask,
    addSubTask,
    toggleCheckboxChange,
    deleteCompletedTasks,
    toggleSubTaskMode,
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

  const handleKeyDownForSubTask = (
    e: KeyboardEvent<HTMLInputElement>,
    parentId: number,
    onSubmit: (parentId: number, title: string) => void
  ) => {
    if (e.key == "Enter") {
      setNewTaskTitle("");
      onSubmit(parentId, newTaskTitle);
    }
  };
  return {
    newTaskTitle,
    setNewTaskTitle,
    handleKeyDown,
    handleKeyDownForSubTask,
  };
}

export { useTasks, useNewTaskInput };
