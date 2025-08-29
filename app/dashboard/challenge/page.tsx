import DashboardLayout from "@/components/layout/DashboardLayout";
import { Swords, Clock, Users, Trophy } from "lucide-react";

export default function ChallengePage() {
  // Example challenge data - would come from API in real app
  const upcomingChallenges = [
    {
      id: "c1",
      title: "JEE Physics Weekly Challenge",
      participants: 256,
      startTime: "2025-08-31T10:00:00",
      duration: 60, // minutes
      topics: ["Mechanics", "Thermodynamics", "Electromagnetism"],
      difficulty: "Medium"
    },
    {
      id: "c2",
      title: "Chemistry Mastery Challenge",
      participants: 189,
      startTime: "2025-09-02T15:30:00",
      duration: 45, // minutes
      topics: ["Organic Chemistry", "Inorganic Chemistry"],
      difficulty: "Hard"
    },
    {
      id: "c3",
      title: "Mathematics Sprint",
      participants: 312,
      startTime: "2025-09-05T18:00:00",
      duration: 30, // minutes
      topics: ["Calculus", "Algebra", "Coordinate Geometry"],
      difficulty: "Medium"
    }
  ];

  // Example past challenges
  const pastChallenges = [
    {
      id: "pc1",
      title: "JEE Full Mock Test",
      date: "2025-08-25",
      participants: 423,
      yourRank: 42,
      percentile: 90.1
    },
    {
      id: "pc2",
      title: "Physics Concept Challenge",
      date: "2025-08-20",
      participants: 287,
      yourRank: 18,
      percentile: 93.7
    },
    {
      id: "pc3",
      title: "Mathematics Problem Solving",
      date: "2025-08-15",
      participants: 356,
      yourRank: 29,
      percentile: 91.9
    }
  ];

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Challenges</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-border rounded-lg p-6 bg-card text-card-foreground">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-5 w-5 text-brand" />
              <h3 className="font-medium">Your Rank</h3>
            </div>
            <p className="text-3xl font-bold">24th</p>
            <p className="text-sm text-muted-foreground">Top 5% of all participants</p>
          </div>
          
          <div className="border border-border rounded-lg p-6 bg-card text-card-foreground">
            <div className="flex items-center gap-2 mb-2">
              <Swords className="h-5 w-5 text-brand" />
              <h3 className="font-medium">Challenges Completed</h3>
            </div>
            <p className="text-3xl font-bold">18</p>
            <p className="text-sm text-muted-foreground">+3 from last month</p>
          </div>
          
          <div className="border border-border rounded-lg p-6 bg-card text-card-foreground">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-5 w-5 text-brand" />
              <h3 className="font-medium">Win Rate</h3>
            </div>
            <p className="text-3xl font-bold">72%</p>
            <p className="text-sm text-muted-foreground">+5% from last month</p>
          </div>
        </div>
        
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-muted p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold">Upcoming Challenges</h2>
            <button className="px-3 py-1 bg-brand text-black text-sm font-medium rounded-md hover:bg-opacity-90 transition-colors">
              Create Challenge
            </button>
          </div>
          
          <div className="divide-y divide-border">
            {upcomingChallenges.map((challenge) => (
              <div key={challenge.id} className="p-4 hover:bg-muted/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">{challenge.title}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{formatDate(challenge.startTime)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{challenge.participants} participants</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm font-medium bg-secondary/50 px-2 py-0.5 rounded-full">
                        {challenge.difficulty}
                      </span>
                      {challenge.topics.map((topic) => (
                        <span key={topic} className="text-sm ml-2 text-muted-foreground">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{challenge.duration} min</p>
                    </div>
                    <button className="px-4 py-2 bg-brand text-black font-medium rounded-md hover:bg-opacity-90 transition-colors whitespace-nowrap">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-muted p-4 border-b border-border">
            <h2 className="font-semibold">Past Challenges</h2>
          </div>
          
          <div className="divide-y divide-border">
            {pastChallenges.map((challenge) => (
              <div key={challenge.id} className="p-4 hover:bg-muted/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground">{challenge.date} • {challenge.participants} participants</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Your Rank</p>
                      <p className="font-medium">{challenge.yourRank}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Percentile</p>
                      <p className="font-medium">{challenge.percentile}%</p>
                    </div>
                    <button className="px-3 py-1.5 border border-border rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                      View Results
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
