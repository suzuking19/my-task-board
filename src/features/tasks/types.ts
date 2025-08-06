interface Task {
  id: number;
  parent_task_id?: number;
  title: string;
  is_completed: boolean;
}

export type { Task };
