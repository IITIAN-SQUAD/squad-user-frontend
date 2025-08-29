import DashboardLayout from "@/components/layout/DashboardLayout";
import { FileText, Search, Filter, Download } from "lucide-react";

export default function PYQPage() {
  // Example PYQ data - would come from API in real app
  const pyqData = [
    {
      id: "pyq1",
      exam: "JEE Advanced",
      year: 2024,
      paper: "Paper 1",
      questions: 54,
      subjects: ["Physics", "Chemistry", "Mathematics"],
      difficulty: "Hard"
    },
    {
      id: "pyq2",
      exam: "JEE Advanced",
      year: 2023,
      paper: "Paper 2",
      questions: 54,
      subjects: ["Physics", "Chemistry", "Mathematics"],
      difficulty: "Hard"
    },
    {
      id: "pyq3",
      exam: "JEE Advanced",
      year: 2023,
      paper: "Paper 1",
      questions: 54,
      subjects: ["Physics", "Chemistry", "Mathematics"],
      difficulty: "Hard"
    },
    {
      id: "pyq4",
      exam: "JEE Main",
      year: 2024,
      paper: "February Session",
      questions: 90,
      subjects: ["Physics", "Chemistry", "Mathematics"],
      difficulty: "Medium"
    },
    {
      id: "pyq5",
      exam: "JEE Main",
      year: 2023,
      paper: "April Session",
      questions: 90,
      subjects: ["Physics", "Chemistry", "Mathematics"],
      difficulty: "Medium"
    }
  ];

  // Example recent attempts
  const recentAttempts = [
    {
      id: "ra1",
      exam: "JEE Advanced 2023",
      paper: "Paper 1",
      date: "2025-08-20",
      score: "68/108",
      percentile: 92.4
    },
    {
      id: "ra2",
      exam: "JEE Main 2024",
      paper: "February Session",
      date: "2025-08-15",
      score: "76/90",
      percentile: 94.7
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Previous Year Questions</h1>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search PYQs by exam, year, subject..." 
              className="pl-9 pr-4 py-2 w-full border border-input rounded-md bg-background"
            />
          </div>
          
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-input rounded-md bg-background hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
            <button className="px-4 py-2 bg-brand text-black font-medium rounded-md hover:bg-opacity-90 transition-colors">
              Find PYQs
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-border rounded-lg p-6 bg-card text-card-foreground">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-brand" />
              <h3 className="font-medium">Total PYQs Solved</h3>
            </div>
            <p className="text-3xl font-bold">248</p>
            <p className="text-sm text-muted-foreground">Across 12 papers</p>
          </div>
          
          <div className="border border-border rounded-lg p-6 bg-card text-card-foreground">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-brand" />
              <h3 className="font-medium">Average Score</h3>
            </div>
            <p className="text-3xl font-bold">72%</p>
            <p className="text-sm text-muted-foreground">+4% from last month</p>
          </div>
          
          <div className="border border-border rounded-lg p-6 bg-card text-card-foreground">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-brand" />
              <h3 className="font-medium">Most Attempted</h3>
            </div>
            <p className="text-3xl font-bold">JEE Adv.</p>
            <p className="text-sm text-muted-foreground">8 papers attempted</p>
          </div>
        </div>
        
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-muted p-4 border-b border-border">
            <h2 className="font-semibold">Available Papers</h2>
          </div>
          
          <div className="divide-y divide-border">
            {pyqData.map((paper) => (
              <div key={paper.id} className="p-4 hover:bg-muted/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{paper.exam} {paper.year}</h3>
                      <span className="text-sm font-medium bg-secondary/50 px-2 py-0.5 rounded-full">
                        {paper.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{paper.paper} • {paper.questions} questions</p>
                    <div className="mt-1 flex gap-2">
                      {paper.subjects.map((subject) => (
                        <span key={subject} className="text-xs px-2 py-0.5 bg-accent rounded-full">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-2 border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="px-4 py-2 bg-brand text-black font-medium rounded-md hover:bg-opacity-90 transition-colors whitespace-nowrap">
                      Solve Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-muted p-4 border-b border-border">
            <h2 className="font-semibold">Recent Attempts</h2>
          </div>
          
          <div className="divide-y divide-border">
            {recentAttempts.map((attempt) => (
              <div key={attempt.id} className="p-4 hover:bg-muted/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{attempt.exam}</h3>
                    <p className="text-sm text-muted-foreground">{attempt.paper} • Attempted on {attempt.date}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Score</p>
                      <p className="font-medium">{attempt.score}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Percentile</p>
                      <p className="font-medium">{attempt.percentile}%</p>
                    </div>
                    <button className="px-3 py-1.5 border border-border rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                      View Analysis
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
