import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <div className="border border-border rounded-lg p-6 bg-card text-card-foreground">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary-foreground text-2xl">
              US
            </div>
            <div>
              <h2 className="text-xl font-semibold">User Name</h2>
              <p className="text-muted-foreground">user@example.com</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <input type="text" className="w-full mt-1 p-2 border border-input rounded-md bg-background" defaultValue="User Name" />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <input type="email" className="w-full mt-1 p-2 border border-input rounded-md bg-background" defaultValue="user@example.com" disabled />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                <input type="tel" className="w-full mt-1 p-2 border border-input rounded-md bg-background" defaultValue="+91 9876543210" />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Target Exam</label>
                <select className="w-full mt-1 p-2 border border-input rounded-md bg-background">
                  <option>JEE Main & Advanced</option>
                  <option>NEET</option>
                  <option>GATE</option>
                  <option>UPSC</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Bio</label>
              <textarea className="w-full mt-1 p-2 border border-input rounded-md bg-background h-24" defaultValue="Aspiring IITian preparing for JEE Advanced."></textarea>
            </div>
            
            <div className="pt-4">
              <button className="px-4 py-2 bg-brand text-black font-medium rounded-md hover:bg-opacity-90 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
