"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import type { FilterState, PerformanceEntry } from "@/types";
import { X, Search } from "lucide-react";
import type { DateRange } from "react-day-picker";

interface FilterControlsProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: FilterState;
  taskNames: string[];
  isLoading?: boolean;
}

export function FilterControls({
  onFilterChange,
  initialFilters = {},
  taskNames,
  isLoading = false,
}: FilterControlsProps) {
  const [searchTerm, setSearchTerm] = React.useState(initialFilters.searchTerm || "");
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(initialFilters.dateRange);
  const [status, setStatus] = React.useState<FilterState["status"]>(initialFilters.status || "all");
  const [selectedTaskName, setSelectedTaskName] = React.useState<string>(initialFilters.taskName || "all");

  React.useEffect(() => {
    const filters: FilterState = {
      searchTerm: searchTerm || undefined,
      dateRange: dateRange,
      status: status === "all" ? undefined : status,
      taskName: selectedTaskName === "all" ? undefined : selectedTaskName,
    };
    onFilterChange(filters);
  }, [searchTerm, dateRange, status, selectedTaskName, onFilterChange]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setDateRange(undefined);
    setStatus("all");
    setSelectedTaskName("all");
    onFilterChange({});
  };

  const allFiltersDefault = !searchTerm && !dateRange && status === "all" && selectedTaskName === "all";

  return (
    <div className="mb-6 p-4 bg-card rounded-lg shadow">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 items-end">
        <div className="space-y-1">
          <label htmlFor="search" className="text-sm font-medium text-muted-foreground">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search"
              placeholder="User, Task..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="date-range" className="text-sm font-medium text-muted-foreground">
            Date Range
          </label>
          <DateRangePicker 
            date={dateRange} 
            onDateChange={setDateRange}
            disabled={isLoading} 
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="status" className="text-sm font-medium text-muted-foreground">
            Status
          </label>
          <Select value={status} onValueChange={(value) => setStatus(value as FilterState["status"])} disabled={isLoading}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="quit">Quit</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1">
          <label htmlFor="taskName" className="text-sm font-medium text-muted-foreground">
            Task Name
          </label>
          <Select value={selectedTaskName} onValueChange={setSelectedTaskName} disabled={isLoading || taskNames.length === 0}>
            <SelectTrigger id="taskName">
              <SelectValue placeholder="Filter by task name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              {taskNames.map(name => (
                <SelectItem key={name} value={name}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleClearFilters}
          variant="outline"
          className="w-full xl:w-auto"
          disabled={isLoading || allFiltersDefault}
        >
          <X className="mr-2 h-4 w-4" /> Clear Filters
        </Button>
      </div>
    </div>
  );
}
