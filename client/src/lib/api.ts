import type { InsertTask, SelectTask } from "@db/schema";

export async function createTask(task: Pick<InsertTask, "title" | "description" | "status">) {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    throw new Error("Failed to create task");
  }

  return res.json() as Promise<SelectTask>;
}

export async function updateTask(
  id: number,
  task: Pick<InsertTask, "title" | "description" | "status">
) {
  const res = await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    throw new Error("Failed to update task");
  }

  return res.json() as Promise<SelectTask>;
}

export async function deleteTask(id: number) {
  const res = await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete task");
  }
}