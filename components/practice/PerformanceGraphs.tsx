"use client";

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Label, Pie, PieChart } from "recharts"

const subjectCoverage = [
  { subject: "Physics", covered: 85, total: 120, percentage: 71 },
  { subject: "Chemistry", covered: 78, total: 95, percentage: 82 },
  { subject: "Mathematics", covered: 92, total: 110, percentage: 84 }
]

const difficultyBreakdown = [
  { name: "Easy", value: 45, color: "hsl(142, 76%, 36%)" },
  { name: "Medium", value: 35, color: "hsl(217, 91%, 60%)" },
  { name: "Hard", value: 20, color: "hsl(262, 83%, 58%)" }
]

function getSubjectColor(percentage: number) {
  if (percentage >= 80) return "hsl(142, 76%, 36%)" 
  if (percentage >= 60) return "hsl(217, 91%, 60%)" 
  return "hsl(262, 83%, 58%)" 
}

export default function PerformanceGraphs() {
  return (
    <div className="space-y-4 mb-6 sm:mb-8">
      <Accordion type="single" collapsible defaultValue="performance-stats" className="space-y-4">
        <AccordionItem value="performance-stats" className="border rounded-lg">
          <Card className="border-0">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <h3 className="text-lg font-semibold">Performance Statistics</h3>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className="pt-0 pb-6 space-y-8">
                {/* Subject-wise Coverage */}
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-4">Subject-wise Coverage</h4>
                  <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
                    {subjectCoverage.map((subject) => {
                      const chartData = [
                        { name: "covered", value: subject.covered, fill: getSubjectColor(subject.percentage) },
                        { name: "remaining", value: subject.total - subject.covered, fill: "hsl(var(--muted))" }
                      ]
                      const chartConfig = {
                        covered: { label: "Covered" },
                        remaining: { label: "Remaining" }
                      }
                      
                      return (
                        <div key={subject.subject} className="flex flex-col items-center min-w-[90px] sm:min-w-[120px]">
                          <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square w-[90px] h-[90px] sm:w-[120px] sm:h-[120px]"
                          >
                            <PieChart>
                              <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                              />
                              <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={25}
                                outerRadius={45}
                                strokeWidth={0}
                                className="sm:innerRadius-[35] sm:outerRadius-[60]"
                              >
                                <Label
                                  content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                      return (
                                        <text
                                          x={viewBox.cx}
                                          y={viewBox.cy}
                                          textAnchor="middle"
                                          dominantBaseline="middle"
                                        >
                                          <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-lg sm:text-2xl font-bold"
                                          >
                                            {subject.percentage}%
                                          </tspan>
                                        </text>
                                      )
                                    }
                                  }}
                                />
                              </Pie>
                            </PieChart>
                          </ChartContainer>
                          <div className="mt-2 sm:mt-3 text-center">
                            <div className="font-semibold text-sm sm:text-base">{subject.subject}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {subject.covered}/{subject.total}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Difficulty Distribution */}
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-4">Question Difficulty Distribution</h4>
                  <div className="space-y-4">
                    {/* Segmented Progress Bar */}
                    <div className="w-full h-8 flex rounded-lg overflow-hidden">
                      {difficultyBreakdown.map((item, index) => (
                        <div
                          key={item.name}
                          style={{
                            width: `${item.value}%`,
                            backgroundColor: item.color
                          }}
                          className="relative group transition-all hover:opacity-90"
                        >
                          <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm">
                            {item.value}%
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Legend */}
                    <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
                      {difficultyBreakdown.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-sm"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm font-medium">{item.name}</span>
                          <span className="text-sm text-muted-foreground">({item.value}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
