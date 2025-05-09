
"use client";

import * as React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { FilterControls } from "@/components/dashboard/FilterControls";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { PerformanceTable } from "@/components/dashboard/PerformanceTable";
import { getPerformanceData, getUniqueTaskNames } from "@/services/performanceService";
import type { PerformanceEntry, FilterState } from "@/types";
import { Users, TrendingUp, Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function DashboardPage() {
  const [performanceData, setPerformanceData] = React.useState<PerformanceEntry[]>([]);
  const [filteredData, setFilteredData] = React.useState<PerformanceEntry[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [taskNames, setTaskNames] = React.useState<string[]>([]);
  const [currentFilters, setCurrentFilters] = React.useState<FilterState>({});

  React.useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      try {
        const [data, uniqueTasks] = await Promise.all([
          getPerformanceData(), // Fetch all data initially
          getUniqueTaskNames()
        ]);
        setPerformanceData(data);
        setFilteredData(data); // Initially, filtered data is all data
        setTaskNames(uniqueTasks);
      } catch (error) {
        console.error("Failed to load performance data:", error);
        // Here you might want to show a toast notification
      } finally {
        setIsLoading(false);
      }
    }
    loadInitialData();
  }, []);

  const handleFilterChange = React.useCallback(async (filters: FilterState) => {
    setIsLoading(true);
    setCurrentFilters(filters);
    try {
      const data = await getPerformanceData(filters);
      setFilteredData(data);
    } catch (error) {
      console.error("Failed to apply filters:", error);
      // Here you might want to show a toast notification
    } finally {
      setIsLoading(false);
    }
  }, []); // State setters (setIsLoading, setCurrentFilters, setFilteredData) are stable.

  const summaryStats = React.useMemo(() => {
    const dataToSummarize = filteredData; // Use filtered data for stats
    if (dataToSummarize.length === 0 && !isLoading) {
      return {
        totalSessions: 0,
        averageScore: 0,
        averageDuration: 0,
        completionRate: 0,
      };
    }
    const totalSessions = dataToSummarize.length;
    const averageScore = totalSessions > 0 
      ? parseFloat((dataToSummarize.reduce((sum, entry) => sum + entry.score, 0) / totalSessions).toFixed(1))
      : 0;
    const averageDuration = totalSessions > 0 
      ? parseFloat((dataToSummarize.reduce((sum, entry) => sum + entry.durationSeconds, 0) / totalSessions).toFixed(1))
      : 0;
    const completedSessions = dataToSummarize.filter(entry => entry.completionStatus === 'completed').length;
    const completionRate = totalSessions > 0 
      ? parseFloat(((completedSessions / totalSessions) * 100).toFixed(1))
      : 0;

    return { totalSessions, averageScore, averageDuration, completionRate };
  }, [filteredData, isLoading]);


  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">VR Performance Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Sessions" 
            value={summaryStats.totalSessions} 
            icon={Users} 
            description="Total recorded VR sessions"
            isLoading={isLoading}
          />
          <StatCard 
            title="Average Score" 
            value={`${summaryStats.averageScore}%`} 
            icon={TrendingUp} 
            description="Average performance score"
            isLoading={isLoading}
          />
          <StatCard 
            title="Average Duration" 
            value={`${summaryStats.averageDuration}s`} 
            icon={Clock} 
            description="Average session duration"
            isLoading={isLoading}
          />
          <StatCard 
            title="Completion Rate" 
            value={`${summaryStats.completionRate}%`} 
            icon={CheckCircle} 
            description="Sessions marked as completed"
            isLoading={isLoading}
          />
        </div>

        <FilterControls onFilterChange={handleFilterChange} taskNames={taskNames} isLoading={isLoading} initialFilters={currentFilters} />

        <PerformanceChart data={filteredData} isLoading={isLoading} />

        <PerformanceTable data={filteredData} isLoading={isLoading} />
      </div>
    </AppLayout>
  );
}
