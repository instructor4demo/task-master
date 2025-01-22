import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TaskList from "@/components/task-list";
import TaskDialog from "@/components/task-dialog";
import StatusFilter from "@/components/status-filter";

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("all");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-medium text-gray-900">タスク管理</h1>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-gray-700 hover:bg-gray-600"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            タスク作成
          </Button>
        </header>

        <StatusFilter
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
        />

        <TaskList filter={currentFilter} />

        <TaskDialog 
          open={isDialogOpen} 
          onOpenChange={setIsDialogOpen}
          mode="create"
        />
      </div>
    </div>
  );
}