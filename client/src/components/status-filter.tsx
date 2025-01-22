import { Button } from "@/components/ui/button";

const statusFilters = [
  { label: "すべて", value: "all" },
  { label: "未着手", value: "未着手" },
  { label: "進行中", value: "進行中" },
  { label: "完了", value: "完了" }
] as const;

const statusColors = {
  "未着手": "text-gray-800 bg-gray-100 hover:bg-gray-200 data-[state=active]:bg-gray-300",
  "進行中": "text-blue-800 bg-blue-100 hover:bg-blue-200",
  "完了": "text-green-800 bg-green-100 hover:bg-green-200",
  "all": "text-gray-800 bg-white hover:bg-gray-50 data-[state=active]:bg-gray-100"
} as const;

interface StatusFilterProps {
  currentFilter: string;
  onFilterChange: (status: string) => void;
}

export default function StatusFilter({ currentFilter, onFilterChange }: StatusFilterProps) {
  return (
    <div className="flex gap-2 mb-6">
      {statusFilters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          data-state={currentFilter === filter.value ? "active" : "inactive"}
          className={`${statusColors[filter.value as keyof typeof statusColors]}`}
          variant="ghost"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}