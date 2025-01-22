import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SelectTask } from "@db/schema";
import { useState } from "react";
import TaskDialog from "./task-dialog";
import { useToast } from "@/hooks/use-toast";
import { deleteTask } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

const statusColors = {
  "未着手": "bg-gray-200 text-gray-800",
  "進行中": "bg-blue-100 text-blue-800",
  "完了": "bg-green-100 text-green-800"
} as const;

interface TaskCardProps {
  task: SelectTask;
}

export default function TaskCard({ task }: TaskCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({
        title: "タスクを削除しました",
        description: task.title,
      });
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "タスクの削除に失敗しました",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card className="mb-4 border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {task.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{task.description}</p>
              <Badge className={statusColors[task.status as keyof typeof statusColors]}>
                {task.status}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <TaskDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        mode="edit"
        task={task}
      />
    </>
  );
}
