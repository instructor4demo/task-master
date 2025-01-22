import { useQuery } from "@tanstack/react-query";
import TaskCard from "./task-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { SelectTask } from "@db/schema";

interface TaskListProps {
  filter: string;
}

export default function TaskList({ filter }: TaskListProps) {
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

  const filteredTasks = filter === "all" 
    ? tasks 
    : tasks.filter(task => task.status === filter);

  if (!filteredTasks.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">該当するタスクがありません</p>
      </div>
    );
  }

  return (
    <div>
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}