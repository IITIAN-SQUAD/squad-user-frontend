import { BookOpen } from "lucide-react";

export default function PracticeTab() {
  // Example practice categories - these would come from your API in a real app
  const practiceCategories = [
    {
      id: "physics",
      name: "Physics",
      topics: 24,
      questions: 1200,
      progress: 35,
    },
    {
      id: "chemistry",
      name: "Chemistry",
      topics: 18,
      questions: 950,
      progress: 42,
    },
    {
      id: "mathematics",
      name: "Mathematics",
      topics: 22,
      questions: 1350,
      progress: 28,
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Practice</h1>
        <button className="px-4 py-2 bg-brand text-black font-medium rounded-md hover:bg-opacity-90 transition-colors">
          Start Quick Practice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {practiceCategories.map((category) => (
          <div 
            key={category.id}
            className="border border-border rounded-lg p-6 bg-card text-card-foreground hover:border-brand transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <BookOpen className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Topics</span>
                <span className="font-medium">{category.topics}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Questions</span>
                <span className="font-medium">{category.questions}</span>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{category.progress}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand" 
                    style={{ width: `${category.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="w-full py-2 border border-border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                Continue Practice
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 border border-border rounded-lg p-6 bg-card text-card-foreground">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium">Physics - Mechanics Quiz</p>
              <p className="text-sm text-muted-foreground">15 questions • 75% correct</p>
            </div>
            <span className="text-sm text-muted-foreground">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium">Chemistry - Organic Chemistry Test</p>
              <p className="text-sm text-muted-foreground">20 questions • 80% correct</p>
            </div>
            <span className="text-sm text-muted-foreground">Yesterday</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Mathematics - Calculus Practice</p>
              <p className="text-sm text-muted-foreground">25 questions • 68% correct</p>
            </div>
            <span className="text-sm text-muted-foreground">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
