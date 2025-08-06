import TaskList from "@/features/tasks/TaskList";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className=" p-6 w-full max-w-md">
        <TaskList />
      </div>

      <div className="mt-8 w-full max-w-md text-gray-600">
        <h2 className="text-xl font-bold mb-4 text-center">Shortcuts</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
          <li>
            <strong className="text-gray-800">
              Focused input field + Enter
            </strong>
            : Add a new task
          </li>
          <li>
            <strong className="text-gray-800">Ctrl + S</strong>: Clear completed
            tasks
          </li>
          <li>
            <strong className="text-gray-800">Focused input field + Tab</strong>
            : Change a normal task to a child task before adding
          </li>
          <li>
            <strong className="text-gray-800">
              Focused input field + Shift + Tab
            </strong>
            : Change a child task to a normal task before adding
          </li>
        </ul>
      </div>
    </div>
  );
}
