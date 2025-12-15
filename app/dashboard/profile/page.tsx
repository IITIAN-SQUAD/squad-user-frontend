"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProfileUpdate from "@/components/profile/ProfileUpdate";
import { getUserProfile } from "@/lib/authApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle, CheckCircle, Clock, Eye, Flag, Shield, ExternalLink, Mail, Timer, GraduationCap, Users, Calendar, Star } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("user@example.com");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState("");
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    // Fetch user data from backend
    const fetchUserData = async () => {
      try {
        console.log('🔄 ProfilePage: Fetching user profile...');
        const profile = await getUserProfile();
        console.log('✅ ProfilePage: Profile fetched:', profile);
        
        if (profile && profile.name && profile.email) {
          setName(profile.name);
          setEmail(profile.email);
          setProfileImage(profile.image_url || null);
          console.log('✅ Profile page data set:', { name: profile.name, email: profile.email, image: profile.image_url });
        } else {
          console.error('❌ Invalid profile data:', profile);
        }
      } catch (error) {
        console.error('❌ ProfilePage: Failed to fetch user profile:', error);
        // If not authenticated, redirect to login
        router.push('/login');
      }
    };

    fetchUserData();
  }, [router]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleEmailUpdate = () => {
    if (newEmail && newEmail !== email) {
      setShowOtpDialog(true);
      sendOtp();
    }
  };

  const sendOtp = () => {
    setOtpSent(true);
    setCountdown(60);
    // Simulate countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const verifyOtp = async () => {
    setIsVerifying(true);
    // Simulate API call
    setTimeout(() => {
      if (otp === "123456") { // Mock verification
        setEmail(newEmail);
        setShowOtpDialog(false);
        setNewEmail("");
        setOtp("");
        setOtpSent(false);
        alert("Email updated successfully!");
      } else {
        alert("Invalid OTP. Please try again.");
      }
      setIsVerifying(false);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="enrollments">My Enrollments</TabsTrigger>
            <TabsTrigger value="account">Account Settings</TabsTrigger>
            <TabsTrigger value="reports">Report Management</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <ProfileUpdate onProfileUpdated={() => window.location.reload()} />
          </TabsContent>

          <TabsContent value="enrollments">
            <Card>
              <CardHeader>
                <CardTitle>My Enrollments</CardTitle>
                <CardDescription>
                  Manage your coaching institute enrollments and access your learning dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Institute</TableHead>
                      <TableHead>Batch</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Aakash Institute</TableCell>
                      <TableCell>JEE Advanced Batch A</TableCell>
                      <TableCell><Badge className="bg-green-100 text-green-800">Active</Badge></TableCell>
                      <TableCell className="text-right">
                        <Link href="/dashboard/coaching/1">
                          <Button variant="outline" size="sm">Enter Dashboard</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Allen Career Institute</TableCell>
                      <TableCell>NEET Foundation</TableCell>
                      <TableCell><Badge className="bg-green-100 text-green-800">Active</Badge></TableCell>
                      <TableCell className="text-right">
                        <Link href="/dashboard/coaching/2">
                          <Button variant="outline" size="sm">Enter Dashboard</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Resonance Eduventures</TableCell>
                      <TableCell>Board Preparation</TableCell>
                      <TableCell><Badge>Completed</Badge></TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" disabled>View Dashboard</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account settings and security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Password</h3>
                        <p className="text-sm text-muted-foreground">Update your password securely</p>
                      </div>
                      <Button variant="outline" asChild>
                        <Link href="/forgot-password">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Reset Password
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline" disabled>
                        Coming Soon
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <div className="space-y-6">
              {/* Report Submission */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flag className="h-5 w-5" />
                    Submit a Report
                  </CardTitle>
                  <CardDescription>
                    Report inappropriate content, bugs, or other issues on our platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Flag className="h-4 w-4 mr-2" />
                    Create New Report
                  </Button>
                </CardContent>
              </Card>

              {/* Platform Transparency */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Platform Transparency
                  </CardTitle>
                  <CardDescription>
                    We are committed to addressing all reports within 7 days and maintaining transparency in our actions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert className="mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Our Commitment:</strong> All reports are reviewed within 24 hours and resolved within 7 days. Actions taken are logged for transparency.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">24h</div>
                      <div className="text-sm text-muted-foreground">Initial Review</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">7 days</div>
                      <div className="text-sm text-muted-foreground">Full Resolution</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">100%</div>
                      <div className="text-sm text-muted-foreground">Transparency</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Your Reports */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Reports</CardTitle>
                  <CardDescription>
                    Track the status of your submitted reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Action Taken</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-mono text-sm">#RPT-001</TableCell>
                        <TableCell>
                          <Badge variant="outline">Inappropriate Content</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default" className="bg-green-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Resolved
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">2 days ago</TableCell>
                        <TableCell className="text-sm">Content removed, user warned</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-sm">#RPT-002</TableCell>
                        <TableCell>
                          <Badge variant="outline">Bug Report</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            <Clock className="h-3 w-3 mr-1" />
                            In Progress
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">1 day ago</TableCell>
                        <TableCell className="text-sm">Fix scheduled for next release</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <div className="mt-4 text-center">
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View All Reports
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Community Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Community Actions</CardTitle>
                  <CardDescription>
                    Public log of actions taken based on community reports (last 30 days)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-red-500 pl-4 py-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">Content Violation - Question #Q12345</div>
                          <div className="text-xs text-muted-foreground">Inappropriate language in solution explanation</div>
                        </div>
                        <Badge variant="destructive">Content Removed</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">Resolved in 2 days • 3 days ago</div>
                    </div>
                    
                    <div className="border-l-4 border-yellow-500 pl-4 py-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">User Behavior - Multiple Spam Reports</div>
                          <div className="text-xs text-muted-foreground">User posting irrelevant content repeatedly</div>
                        </div>
                        <Badge variant="secondary">Account Suspended</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">Resolved in 1 day • 5 days ago</div>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4 py-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">Bug Fix - Login Issue</div>
                          <div className="text-xs text-muted-foreground">Users unable to login with Google OAuth</div>
                        </div>
                        <Badge variant="default" className="bg-green-600">Fixed</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">Resolved in 4 days • 1 week ago</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button variant="outline">
                      View Full Transparency Log
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
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
        
        {/* OTP Verification Dialog */}
        <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Verify Your Email
              </DialogTitle>
              <DialogDescription>
                We've sent a verification code to <strong>{newEmail}</strong>
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {otpSent && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    OTP sent successfully! Check your email inbox.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Enter 6-digit OTP</div>
                <Input
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                />
                <div className="text-xs text-muted-foreground text-center">
                  Enter the 6-digit code sent to your email
                </div>
              </div>
              
              {countdown > 0 && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Timer className="h-4 w-4" />
                  Resend OTP in {countdown}s
                </div>
              )}
              
              {countdown === 0 && otpSent && (
                <div className="text-center">
                  <Button variant="outline" onClick={sendOtp} size="sm">
                    Resend OTP
                  </Button>
                </div>
              )}
            </div>
            
            <DialogFooter className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowOtpDialog(false);
                  setOtp("");
                  setOtpSent(false);
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={verifyOtp}
                disabled={otp.length !== 6 || isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify & Update"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
