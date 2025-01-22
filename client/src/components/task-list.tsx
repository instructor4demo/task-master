import { useQuery } from "@tanstack/react-query";
import TaskCard from "./task-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { SelectTask } from "@db/schema";

export default function TaskList() {
  const { data: tasks, isLoading } = useQuery<SelectTask[]>({
    queryKey: ["/api/tasks"],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (!tasks?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">タスクがありません</p>
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}