"use client";

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts"
import { CheckCircle, XCircle, Clock, TrendingUp, TrendingDown } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface AttemptRecord {
  id: string
  attemptNumber: number
  timestamp: Date
  selectedAnswer: string
  correctAnswer: string
  isCorrect: boolean
  accuracy: number // percentage for this attempt
}

const mockAttempts: AttemptRecord[] = [
  {
    id: "1",
    attemptNumber: 1,
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    selectedAnswer: "2.5 m/s²",
    correctAnswer: "5.0 m/s²",
    isCorrect: false,
    accuracy: 0
  },
  {
    id: "2",
    attemptNumber: 2,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    selectedAnswer: "7.5 m/s²",
    correctAnswer: "5.0 m/s²",
    isCorrect: false,
    accuracy: 0
  },
  {
    id: "3",
    attemptNumber: 3,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    selectedAnswer: "5.0 m/s²",
    correctAnswer: "5.0 m/s²",
    isCorrect: true,
    accuracy: 100
  }
]

const performanceData = [
  { attempt: 1, accuracy: 0 },
  { attempt: 2, accuracy: 0 },
  { attempt: 3, accuracy: 100 }
]

interface AttemptHistoryTabProps {
  questionId: string
}

export default function AttemptHistoryTab({ questionId }: AttemptHistoryTabProps) {
  const [attempts] = useState<AttemptRecord[]>(mockAttempts)

  const totalAttempts = attempts.length
  const correctAttempts = attempts.filter(a => a.isCorrect).length
  const accuracyRate = correctAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0
  const improvementTrend = attempts.length > 1 ? 
    attempts[attempts.length - 1].accuracy > attempts[0].accuracy : null


  return (
    <div className="space-y-6">
      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{totalAttempts}</div>
            <p className="text-sm text-muted-foreground">Total Attempts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{correctAttempts}</div>
            <p className="text-sm text-muted-foreground">Correct Attempts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1">
              <div className="text-2xl font-bold text-blue-600">{accuracyRate}%</div>
              {improvementTrend !== null && (
                improvementTrend ? 
                  <TrendingUp className="h-4 w-4 text-green-600" /> :
                  <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Accuracy Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="attempt" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Accuracy']} />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#22c55e" 
                  strokeWidth={3}
                  dot={{ fill: '#22c55e', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Attempt History */}
      <Card>
        <CardHeader>
          <CardTitle>Attempt Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attempts.map((attempt) => (
              <div 
                key={attempt.id} 
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg hover:bg-gray-50 gap-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    {attempt.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="font-medium">Attempt #{attempt.attemptNumber}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {formatDistanceToNow(attempt.timestamp, { addSuffix: true })}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="flex-1">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Your answer: </span>
                      <span className={attempt.isCorrect ? "text-green-600 font-medium" : "text-red-600"}>
                        {attempt.selectedAnswer}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Correct: {attempt.correctAnswer}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={attempt.isCorrect ? "default" : "destructive"}
                    >
                      {attempt.accuracy}%
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
            
            {attempts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No attempts yet. Try solving this question to see your progress!
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      {attempts.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {correctAttempts > 0 && (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 p-3 rounded-lg">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">
                    Great job! You solved this question correctly in {correctAttempts} out of {totalAttempts} attempts.
                  </span>
                </div>
              )}
              
              {improvementTrend && (
                <div className="flex items-center gap-2 text-blue-700 bg-blue-50 p-3 rounded-lg">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">
                    Your accuracy improved from {attempts[0].accuracy}% to {attempts[attempts.length - 1].accuracy}% - great progress!
                  </span>
                </div>
              )}
              
              {attempts.length >= 3 && correctAttempts === 0 && (
                <div className="flex items-center gap-2 text-yellow-700 bg-yellow-50 p-3 rounded-lg">
                  <XCircle className="h-4 w-4" />
                  <span className="text-sm">
                    Consider reviewing the concept or checking the explanation before your next attempt.
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
