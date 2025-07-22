"use client"

import React from "react"
import { Bell, Search, Moon, ChevronDown, Plus, LogOut, Settings, FileText, Bot, Users, Wallet, MoreHorizontal, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect } from "react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import DashboardHeader from "@/components/ui/DashboardHeader";


export default function ServicePortal() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [metricsLoading, setMetricsLoading] = useState(true)
  const [businessCategory, setBusinessCategory] = useState("garage")
  const [username, setUsername] = useState<string>("User")
  const [metricsData, setMetricsData] = useState([
    { date: "Jul 1", value: 85 },
    { date: "Jul 2", value: 92 },
    { date: "Jul 3", value: 88 },
    { date: "Jul 4", value: 95 },
    { date: "Jul 5", value: 89 },
    { date: "Jul 6", value: 91 },
    { date: "Jul 7", value: 94 },
  ])

  const [serviceData] = useState([
    { name: "Consulting", value: 40, color: "#0088FE" },
    { name: "Support", value: 30, color: "#00C49F" },
    { name: "Training", value: 20, color: "#FFBB28" },
    { name: "Implementation", value: 10, color: "#FF8042" },
  ])

  const [recentServices] = useState([
    { name: "IT Consulting", status: "Active", revenue: "$2,500" },
    { name: "Technical Support", status: "Completed", revenue: "$800" },
    { name: "Training Session", status: "Scheduled", revenue: "$1,200" },
    { name: "System Implementation", status: "In Progress", revenue: "$5,000" },
  ])

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setMetricsLoading(true)
    const timer = setTimeout(() => setMetricsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const category = localStorage.getItem("businessCategory") || "garage"
    setBusinessCategory(category)
    // Username logic
    const orgName = localStorage.getItem("organizationName")
    const userEmail = localStorage.getItem("userEmail")
    setUsername(orgName || userEmail || "User")
    setIsAuth(localStorage.getItem("isAuth") === "true")
  }, [])
  
  const handleLogout = () => {
    localStorage.removeItem("isAuth")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userPortal")
    window.location.href = "/login"
  }

  const upcomingTasks = [
    { title: "Client Meeting", time: "Nov 20, 10:00 AM" },
    { title: "Service Review", time: "Nov 21, 2:00 PM" },
    { title: "Training Session", time: "Nov 22, 9:00 AM" },
    { title: "Project Delivery", time: "Nov 23, 3:00 PM" },
  ]

  const teamMembers = [
    { name: "Alex", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Emma", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "David", avatar: "/placeholder.svg?height=32&width=32" },
  ]

  const defaultCategories = ["garage", "consulting", "healthcare", "education"];
  const isCustomCategory = !defaultCategories.includes(businessCategory);
  const [editingCategory, setEditingCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState(isCustomCategory ? businessCategory : "");

  const handleCustomCategorySave = () => {
    if (customCategory.trim()) {
      setBusinessCategory(customCategory.trim());
      localStorage.setItem("businessCategory", customCategory.trim());
      setEditingCategory(false);
    }
  };

  return (
    <div className="flex-1 space-y-3 py-2 pr-4 md:pr-8 lg:pr-12 xl:pr-16">
      <DashboardHeader
        username={username}
        avatarUrl={"/placeholder.svg?height=32&width=32"}
        theme={theme}
        setTheme={setTheme}
      />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Banner */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">
                      {isCustomCategory && !editingCategory ? (
                        <>
                          Welcome to <span className="inline-block px-2 py-1 rounded bg-white/10 text-yellow-200 font-semibold">{businessCategory}</span> Service System!
                          <Button
                            size="sm"
                            variant="ghost"
                            className="ml-2 text-xs text-yellow-200 hover:text-yellow-300 hover:bg-white/10 px-2 py-1"
                            onClick={() => setEditingCategory(true)}
                          >
                            Edit
                          </Button>
                        </>
                      ) : editingCategory ? (
                        <div className="flex items-center gap-2">
                          <Input
                            value={customCategory}
                            onChange={e => setCustomCategory(e.target.value)}
                            className="w-auto px-2 py-1 text-black dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded"
                            placeholder="Your service name"
                            autoFocus
                          />
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1" onClick={handleCustomCategorySave}>Save</Button>
                          <Button size="sm" variant="ghost" className="text-white px-2 py-1" onClick={() => setEditingCategory(false)}>Cancel</Button>
                        </div>
                      ) : (
                        <>Welcome to {businessCategory === "garage" ? "Auto Garage Service System" : businessCategory === "consulting" ? "Consulting Service System" : businessCategory === "healthcare" ? "Healthcare Service System" : "Education Service System"}! </>
                      )}
                    </h1>
                    <p className="text-blue-100 mb-4">
                      {isCustomCategory ? (
                        <>Manage your <span className="font-semibold text-yellow-200">{businessCategory}</span> services and operations</>
                      ) : businessCategory === "garage" ? "Manage your automotive repair and maintenance services" : businessCategory === "consulting" ? "Manage your consulting services and client operations" : businessCategory === "healthcare" ? "Manage your healthcare services and patient care" : "Manage your educational services and training operations"}
                    </p>
                    <div className="flex space-x-3">
                      <Button className="bg-white text-blue-600 hover:bg-gray-100">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Service
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                        onClick={() => router.push('/service/reports')}
                      >
                        View Reports
                      </Button>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-32 h-32 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Settings className="w-16 h-16 text-blue-300" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold">94%</p>
                      <p className="text-gray-600">Satisfaction</p>
                    </div>
                    <Button asChild variant="ghost" size="icon">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className="flex flex-col space-y-1">
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Export</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </Button>
                  </div>
                  <h3 className="font-semibold mb-4">Client Satisfaction</h3>
                  <div className="relative w-24 h-24 mx-auto">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-green-600"
                        strokeDasharray="251.2"
                        strokeDashoffset="15.072"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold">94%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold">$8,750</p>
                      <p className="text-gray-600">+18%</p>
                    </div>
                    <Button asChild variant="ghost" size="icon">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className="flex flex-col space-y-1">
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Export</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </Button>
                  </div>
                  <h3 className="font-semibold mb-4">Service Revenue</h3>
                  <div className="h-24">
                    {metricsLoading ? (
                      <Skeleton className="w-full h-full" />
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={metricsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Service Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    {metricsLoading ? (
                      <Skeleton className="w-full h-full" />
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={metricsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Bar dataKey="value" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    {metricsLoading ? (
                      <Skeleton className="w-full h-full" />
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={serviceData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {serviceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Services */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Settings className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{service.name}</h4>
                          <p className="text-sm text-gray-500">Status: {service.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{service.revenue}</p>
                        <p className="text-sm text-gray-500">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" onClick={() => router.push('/service/services')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Add Service
                </Button>
                <Button variant="outline" className="w-full" onClick={() => router.push('/service/reports')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full" onClick={() => router.push('/service/ai-chat')}>
                  <Bot className="w-4 h-4 mr-2" />
                  AI Assistant
                </Button>
                <Button variant="outline" className="w-full" onClick={() => router.push('/service/departments')}>
                  <Building2 className="w-4 h-4 mr-2" />
                  Manage Departments
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{task.title}</p>
                        <p className="text-xs text-gray-500">{task.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{member.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle>Are you sure you want to log out?</DialogTitle>
              <DialogDescription>
                You will be logged out of your account. Do you want to continue?
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 mt-4">
              <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleLogout}>Yes, log out</Button>
              <Button variant="outline" onClick={() => setShowLogoutModal(false)}>Cancel</Button>
            </div>
          </DialogContent>
        </Dialog>
    </div>
  )
} 