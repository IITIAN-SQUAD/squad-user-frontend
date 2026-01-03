"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  PieChart,
  Pie,
  Cell,
  Tooltip, 
  ResponsiveContainer
} from "recharts"

const subjectCoverage = [
  { subject: "Physics", covered: 85, total: 120, percentage: 71 },
  { subject: "Chemistry", covered: 78, total: 95, percentage: 82 },
  { subject: "Mathematics", covered: 92, total: 110, percentage: 84 }
]

const difficultyBreakdown = [
  { name: "Easy", value: 45, color: "#22c55e" },
  { name: "Medium", value: 35, color: "#f59e0b" },
  { name: "Hard", value: 20, color: "#ef4444" }
]

export default function PerformanceGraphs() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {/* Subject-wise Coverage */}
      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Coverage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjectCoverage.map((subject) => (
              <div key={subject.subject}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{subject.subject}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {subject.covered}/{subject.total}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {subject.percentage}%
                    </span>
                  </div>
                </div>
                <Progress value={subject.percentage} className="h-3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Difficulty Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Question Difficulty Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={difficultyBreakdown}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {difficultyBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
