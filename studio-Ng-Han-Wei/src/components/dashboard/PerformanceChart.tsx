"use client";

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { PerformanceEntry } from "@/types";
import { useMemo } from "react";
import { format } from "date-fns";

interface PerformanceChartProps {
  data: PerformanceEntry[];
  isLoading?: boolean;
}

interface ChartDataPoint {
  date: string;
  averageScore: number;
  sessions: number;
}

export function PerformanceChart({ data, isLoading = false }: PerformanceChartProps) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const aggregatedData: { [key: string]: { totalScore: number; count: number, sessions: number } } = {};

    data.forEach(entry => {
      const dateStr = format(entry.timestamp, "yyyy-MM-dd");
      if (!aggregatedData[dateStr]) {
        aggregatedData[dateStr] = { totalScore: 0, count: 0, sessions: 0 };
      }
      aggregatedData[dateStr].totalScore += entry.score;
      aggregatedData[dateStr].count += 1;
      aggregatedData[dateStr].sessions +=1;
    });

    return Object.entries(aggregatedData)
      .map(([date, { totalScore, count, sessions }]) => ({
        date,
        averageScore: parseFloat((totalScore / count).toFixed(2)),
        sessions,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Loading chart data...</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </CardContent>
      </Card>
    );
  }
  
  if (chartData.length === 0) {
     return (
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Average score and session count over time.</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center justify-center">
          <p className="text-muted-foreground">No data available to display chart.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
        <CardDescription>Average score and session count over time.</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(str) => format(new Date(str), "MMM d")}
              stroke="hsl(var(--foreground))"
              fontSize={12}
            />
            <YAxis 
              yAxisId="left" 
              label={{ value: 'Avg Score', angle: -90, position: 'insideLeft', fill: 'hsl(var(--foreground))', fontSize: 12 }}
              stroke="hsl(var(--chart-1))"
              fontSize={12}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              label={{ value: 'Sessions', angle: 90, position: 'insideRight', fill: 'hsl(var(--foreground))', fontSize: 12 }}
              stroke="hsl(var(--chart-2))"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="averageScore" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2} 
              dot={{ r: 3, fill: 'hsl(var(--chart-1))' }}
              activeDot={{ r: 5 }}
              name="Average Score"
            />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="sessions" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2}
              dot={{ r: 3, fill: 'hsl(var(--chart-2))' }}
              activeDot={{ r: 5 }}
              name="Sessions"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
