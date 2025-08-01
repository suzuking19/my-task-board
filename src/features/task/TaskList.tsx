"use client";
import { useTasks, useNewTaskInput } from "./hooks";

export default function TaskList() {
  const { tasks, addTask, toggleCheckboxChange } = useTasks();
  const { newTaskTitle, setNewTaskTitle, handleKeyDown } = useNewTaskInput();

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-start">
        <div>
          {tasks.length === 0 && <p>No Task yet haha...</p>}
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center space-x-2 ">
                <input
                  type="checkbox"
                  checked={task.is_completed}
                  onChange={() => toggleCheckboxChange(task.id)}
                />
                <p
                  className={
                    task.is_completed ? "line-through text-gray-400" : ""
                  }
                >
                  {task.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <input type="checkbox" checked={false} disabled />
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, addTask)}
            placeholder="add new task"
            className="pl-2"
          />
        </div>
      </div>
    </div>
  );
}
