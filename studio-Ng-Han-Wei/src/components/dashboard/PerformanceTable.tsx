"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PerformanceEntry } from "@/types";
import { ArrowUpDown, ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface PerformanceTableProps {
  data: PerformanceEntry[];
  isLoading?: boolean;
}

type SortKey = keyof PerformanceEntry | null;
type SortDirection = "asc" | "desc";

const ITEMS_PER_PAGE = 10;

export function PerformanceTable({ data, isLoading = false }: PerformanceTableProps) {
  const [sortKey, setSortKey] = React.useState<SortKey>("timestamp");
  const [sortDirection, setSortDirection] = React.useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = React.useState(1);

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];

      if (valA instanceof Date && valB instanceof Date) {
        valA = valA.getTime();
        valB = valB.getTime();
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortDirection]);

  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
    setCurrentPage(1); // Reset to first page on sort
  };

  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };
  
  const renderTableContent = () => {
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={`loading-${index}`}>
          {Array.from({ length: 7 }).map((_, cellIndex) => (
            <TableCell key={`cell-loading-${cellIndex}`} className="py-3">
              <div className="h-4 bg-muted rounded animate-pulse"></div>
            </TableCell>
          ))}
        </TableRow>
      ));
    }

    if (paginatedData.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
            No performance data found.
          </TableCell>
        </TableRow>
      );
    }

    return paginatedData.map((entry) => (
      <TableRow key={entry.id} className="hover:bg-muted/50 transition-colors">
        <TableCell className="font-medium">{entry.userName}</TableCell>
        <TableCell>{entry.taskName}</TableCell>
        <TableCell>{format(new Date(entry.timestamp), "PPpp")}</TableCell>
        <TableCell className="text-center">{entry.score}</TableCell>
        <TableCell className="text-center">{entry.durationSeconds}s</TableCell>
        <TableCell className="text-center">{entry.errors}</TableCell>
        <TableCell>
          <Badge
            variant={
              entry.completionStatus === "completed"
                ? "default"
                : entry.completionStatus === "failed"
                ? "destructive"
                : "secondary"
            }
            className={entry.completionStatus === "completed" ? "bg-green-500 hover:bg-green-600 text-white" : ""}
          >
            {entry.completionStatus}
          </Badge>
        </TableCell>
      </TableRow>
    ));
  };

  const columns: { key: SortKey; label: string; className?: string }[] = [
    { key: "userName", label: "User" },
    { key: "taskName", label: "Task" },
    { key: "timestamp", label: "Timestamp" },
    { key: "score", label: "Score", className: "text-center" },
    { key: "durationSeconds", label: "Duration", className: "text-center" },
    { key: "errors", label: "Errors", className: "text-center" },
    { key: "completionStatus", label: "Status" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Performance Data</CardTitle>
        <CardDescription>Individual session records. Click column headers to sort.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map(col => (
                  <TableHead key={String(col.key)} className={col.className}>
                    <Button variant="ghost" onClick={() => handleSort(col.key)} className="px-1 py-0 h-auto hover:bg-transparent">
                      {col.label}
                      {getSortIcon(col.key)}
                    </Button>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {renderTableContent()}
            </TableBody>
          </Table>
        </div>
        {totalPages > 1 && !isLoading && (
          <div className="flex items-center justify-end space-x-2 py-4">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
