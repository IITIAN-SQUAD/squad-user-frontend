import DashboardLayout from "@/components/layout/DashboardLayout";
import { Trophy } from "lucide-react";

export default function LeaderboardPage() {
  // Example leaderboard data - would come from API in real app
  const leaderboardData = [
    { rank: 1, name: "Rahul Sharma", score: 9845, avatar: "RS" },
    { rank: 2, name: "Priya Patel", score: 9720, avatar: "PP" },
    { rank: 3, name: "Amit Kumar", score: 9650, avatar: "AK" },
    { rank: 4, name: "Sneha Gupta", score: 9580, avatar: "SG" },
    { rank: 5, name: "Vikram Singh", score: 9510, avatar: "VS" },
    { rank: 6, name: "Ananya Reddy", score: 9480, avatar: "AR" },
    { rank: 7, name: "Karthik Nair", score: 9420, avatar: "KN" },
    { rank: 8, name: "Neha Verma", score: 9350, avatar: "NV" },
    { rank: 9, name: "Rajesh Tiwari", score: 9290, avatar: "RT" },
    { rank: 10, name: "Meera Joshi", score: 9240, avatar: "MJ" },
  ];

  // Current user's rank
  const currentUserRank = 24;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Leaderboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top 3 users with special styling */}
          <div className="border border-border rounded-lg p-6 bg-card text-card-foreground order-2 md:order-1">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-chart-2/20 flex items-center justify-center">
                  <span className="text-xl font-bold">{leaderboardData[1].avatar}</span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-chart-2 text-white w-8 h-8 rounded-full flex items-center justify-center">
                  2
                </div>
              </div>
              <h3 className="mt-4 font-semibold">{leaderboardData[1].name}</h3>
              <p className="text-muted-foreground">{leaderboardData[1].score} pts</p>
            </div>
          </div>
          
          <div className="border border-border rounded-lg p-6 bg-card text-card-foreground order-1 md:order-2">
            <div className="flex flex-col items-center">
              <Trophy className="w-8 h-8 text-brand mb-2" />
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-brand/20 flex items-center justify-center border-2 border-brand">
                  <span className="text-2xl font-bold">{leaderboardData[0].avatar}</span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-brand text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
              </div>
              <h3 className="mt-4 font-semibold text-lg">{leaderboardData[0].name}</h3>
              <p className="text-muted-foreground font-medium">{leaderboardData[0].score} pts</p>
            </div>
          </div>
          
          <div className="border border-border rounded-lg p-6 bg-card text-card-foreground order-3">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-chart-3/20 flex items-center justify-center">
                  <span className="text-xl font-bold">{leaderboardData[2].avatar}</span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-chart-3 text-white w-8 h-8 rounded-full flex items-center justify-center">
                  3
                </div>
              </div>
              <h3 className="mt-4 font-semibold">{leaderboardData[2].name}</h3>
              <p className="text-muted-foreground">{leaderboardData[2].score} pts</p>
            </div>
          </div>
        </div>
        
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-muted p-4 border-b border-border">
            <h2 className="font-semibold">Top Performers</h2>
          </div>
          
          <div className="divide-y divide-border">
            {leaderboardData.slice(3).map((user) => (
              <div key={user.rank} className="flex items-center justify-between p-4 hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <span className="font-semibold text-muted-foreground">{user.rank}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <span className="font-medium">{user.avatar}</span>
                  </div>
                  <span className="font-medium">{user.name}</span>
                </div>
                <span className="font-medium">{user.score} pts</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border border-border rounded-lg p-4 bg-card text-card-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <span className="font-semibold text-muted-foreground">{currentUserRank}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="font-medium">US</span>
              </div>
              <span className="font-medium">You</span>
            </div>
            <span className="font-medium">8420 pts</span>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">To next rank</span>
              <span className="font-medium">120 pts more</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-brand" style={{ width: "70%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
