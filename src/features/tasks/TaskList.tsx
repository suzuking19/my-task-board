"use client";
import { useTasks, useNewTaskInput } from "./hooks";
import type { KeyboardEvent } from "react";

export default function TaskList() {
  const {
    tasks,
    isLoading,
    isSubTaskMode,
    latestTask,
    addTask,
    addSubTask,
    toggleCheckboxChange,
    deleteCompletedTasks,
    toggleSubTaskMode,
  } = useTasks();
  const {
    newTaskTitle,
    setNewTaskTitle,
    handleKeyDown,
    handleKeyDownForSubTask,
  } = useNewTaskInput();

  const handleAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    let parentId: number;

    if (
      latestTask &&
      "parent_task_id" in latestTask &&
      latestTask.parent_task_id
    ) {
      parentId = latestTask.parent_task_id;
    } else if (latestTask?.id) {
      parentId = latestTask.id;
    } else {
      console.warn("No parent task available for subtask");
      return;
    }
    if (isSubTaskMode) {
      handleKeyDownForSubTask(e, parentId, addSubTask);
    } else {
      handleKeyDown(e, addTask);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 w-full max-w-md shadow-amber-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Tasks
      </h1>

      <div className="mb-6">
        {isLoading ? (
          <p className="text-gray-500 text-center italic">
            Oh, wait.... , now loading
          </p>
        ) : (
          ""
        )}
        {!isLoading && tasks.length === 0 ? (
          <p className="text-gray-500 text-center italic">
            No tasks yet. Add one below!
          </p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center space-x-3 py-1   last:border-b-0"
              >
                <input
                  type="checkbox"
                  checked={task.is_completed}
                  onChange={() => toggleCheckboxChange(task.id)}
                  className="form-checkbox h-5 w-5 text-gray-700 rounded focus:ring-gray-500 cursor-pointer"
                />
                <p
                  className={`flex-1 text-xl ${
                    task.is_completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center space-x-3 mb-6">
        <input
          type="checkbox"
          checked={false}
          disabled
          className={`h-5 w-5 transition-all duration-300 ${
            isSubTaskMode ? `ml-5` : ``
          }`}
        />
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => handleAddTask(e)}
          placeholder="Add a new task"
          className="flex-1 p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-800"
        />
      </div>
      <div className="text-center" onClick={() => toggleSubTaskMode()}>
        <button className="text-gray-700 hover:text-gray-900 border border-gray-400 hover:border-gray-600 font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75">
          {isSubTaskMode ? "通常タスクに変換" : "子タスクに変換"}
        </button>
      </div>
      {/* 
      <div className="text-center">
        <button
          onClick={() => deleteCompletedTasks(tasks)}
          className="text-gray-700 hover:text-gray-900 border border-gray-400 hover:border-gray-600 font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
        >
          Clear Completed Tasks
        </button>
      </div> */}
    </div>
  );
}
