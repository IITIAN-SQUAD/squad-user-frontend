import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="account">Account Settings</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and profile picture
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="flex flex-col items-center">
                      <Avatar className="w-32 h-32 mb-4">
                        <AvatarImage src="/avatar.png" alt="User" />
                        <AvatarFallback className="text-2xl">US</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm" className="mb-2">
                        Change Photo
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        JPG, GIF or PNG. Max size 2MB
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="text-sm font-medium">First Name</div>
                          <Input
                            type="text"
                            id="firstName"
                            defaultValue="User"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Last Name</div>
                          <Input
                            type="text"
                            id="lastName"
                            defaultValue="Name"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Email</div>
                        <Input
                          type="email"
                          id="email"
                          defaultValue="user@example.com"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Phone Number</div>
                        <Input
                          type="tel"
                          id="phone"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end">
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account settings and password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Current Password</div>
                    <Input type="password" id="current-password" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">New Password</div>
                    <Input type="password" id="new-password" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Confirm New Password</div>
                    <Input type="password" id="confirm-password" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Update Password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Customize your learning experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Preference settings coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
