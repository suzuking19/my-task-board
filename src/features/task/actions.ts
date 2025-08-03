"use server";
import { createClient } from "@/utils/supabase/server";
import type { Task } from "./types";

async function getTaskAction(): Promise<Task[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("tasks").select("*");

  if (error) {
    throw error;
  }

  return data || [];
}

async function addTaskAction(title: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tasks")
    .insert({ title, is_completed: false })
    .select();

  if (error) {
    throw error;
  }
  return data[0];
}

async function toggleTaskAction(id: number) {
  const supabase = await createClient();

  const { data: currentTask } = await supabase
    .from("tasks")
    .select("is_completed")
    .eq("id", id)
    .single();

  if (!currentTask) {
    throw new Error(`Task ID ${id} not found`);
  }

  const { data, error } = await supabase
    .from("tasks")
    .update({ is_completed: !currentTask.is_completed })
    .eq("id", id);

  if (error) {
    throw error;
  }
  return data;
}

async function deleteCompletedTasksAction(task_ids: number[]) {
  const supabase = await createClient();

  const { error } = await supabase.from("tasks").delete().in("id", task_ids);

  if (error) {
    throw error;
  }
}

export {
  getTaskAction,
  addTaskAction,
  toggleTaskAction,
  deleteCompletedTasksAction,
};
