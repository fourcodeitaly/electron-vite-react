"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  TrendingUp,
  Building,
  Award,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Employee } from "@/type/employee";

// Mock data
const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Software Engineer",
    department: "Engineering",
    salary: 95000,
    startDate: "2022-03-15",
    status: "Active",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Experienced full-stack developer with expertise in React and Node.js",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@company.com",
    phone: "+1 (555) 234-5678",
    position: "Product Manager",
    department: "Product",
    salary: 110000,
    startDate: "2021-08-22",
    status: "Active",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Strategic product leader with 8+ years of experience in tech startups",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    phone: "+1 (555) 345-6789",
    position: "UX Designer",
    department: "Design",
    salary: 78000,
    startDate: "2023-01-10",
    status: "Active",
    location: "Austin, TX",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Creative designer passionate about user-centered design and accessibility",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@company.com",
    phone: "+1 (555) 456-7890",
    position: "Data Scientist",
    department: "Analytics",
    salary: 105000,
    startDate: "2022-11-05",
    status: "Active",
    location: "Seattle, WA",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "ML engineer specializing in predictive analytics and data visualization",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa.thompson@company.com",
    phone: "+1 (555) 567-8901",
    position: "Marketing Director",
    department: "Marketing",
    salary: 120000,
    startDate: "2020-06-18",
    status: "Active",
    location: "Los Angeles, CA",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Growth marketing expert with proven track record in B2B and B2C markets",
  },
  {
    id: 6,
    name: "James Wilson",
    email: "james.wilson@company.com",
    phone: "+1 (555) 678-9012",
    position: "DevOps Engineer",
    department: "Engineering",
    salary: 88000,
    startDate: "2023-04-12",
    status: "On Leave",
    location: "Denver, CO",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Infrastructure specialist focused on cloud architecture and automation",
  },
];

const departments = [
  "All",
  "Engineering",
  "Product",
  "Design",
  "Analytics",
  "Marketing",
];
const positions = [
  "Software Engineer",
  "Senior Software Engineer",
  "Product Manager",
  "UX Designer",
  "Data Scientist",
  "Marketing Director",
  "DevOps Engineer",
];

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [filteredEmployees, setFilteredEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Filter employees based on search and department
  useEffect(() => {
    let filtered = employees;

    if (searchTerm) {
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDepartment !== "All") {
      filtered = filtered.filter(
        (emp) => emp.department === selectedDepartment
      );
    }

    setFilteredEmployees(filtered);
  }, [employees, searchTerm, selectedDepartment]);

  // Calculate statistics
  const stats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter((emp) => emp.status === "Active").length,
    departments: [...new Set(employees.map((emp) => emp.department))].length,
    averageSalary: Math.round(
      employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length
    ),
  };

  const handleAddEmployee = (newEmployee: Employee) => {
    const employee = {
      ...newEmployee,
      id: Math.max(...employees.map((e) => e.id)) + 1,
      avatar: "/placeholder.svg?height=40&width=40",
    };
    setEmployees([...employees, employee]);
    setIsAddDialogOpen(false);
  };

  const handleEditEmployee = (updatedEmployee: Employee) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    setIsEditDialogOpen(false);
    setEditingEmployee(null);
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const openEditDialog = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Employee Management
          </h1>
          <p className="text-slate-600">
            Manage your team with ease and efficiency
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Employees
            </TabsTrigger>
            <TabsTrigger
              value="departments"
              className="flex items-center gap-2"
            >
              <Building className="w-4 h-4" />
              Departments
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Employees
                  </CardTitle>
                  <Users className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.totalEmployees}
                  </div>
                  <p className="text-xs opacity-80">Active workforce</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Employees
                  </CardTitle>
                  <Award className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.activeEmployees}
                  </div>
                  <p className="text-xs opacity-80">Currently working</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Departments
                  </CardTitle>
                  <Building className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.departments}</div>
                  <p className="text-xs opacity-80">Active departments</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg. Salary
                  </CardTitle>
                  <DollarSign className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${stats.averageSalary.toLocaleString()}
                  </div>
                  <p className="text-xs opacity-80">Per employee</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Employees */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Hires</CardTitle>
                <CardDescription>Latest additions to your team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employees
                    .sort(
                      (a: Employee, b: Employee) =>
                        new Date(b.startDate).getTime() -
                        new Date(a.startDate).getTime()
                    )
                    .slice(0, 3)
                    .map((employee) => (
                      <div
                        key={employee.id}
                        className="flex items-center space-x-4 p-4 rounded-lg bg-slate-50"
                      >
                        <Avatar>
                          <AvatarImage
                            src={employee.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-slate-600">
                            {employee.position}
                          </p>
                        </div>
                        <Badge variant="secondary">{employee.department}</Badge>
                        <p className="text-sm text-slate-500">
                          {new Date(employee.startDate).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Employees Tab */}
          <TabsContent value="employees" className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 gap-4 w-full sm:w-auto">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
                >
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Employee
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                    <DialogDescription>
                      Fill in the details to add a new team member
                    </DialogDescription>
                  </DialogHeader>
                  <EmployeeForm onSubmit={handleAddEmployee} />
                </DialogContent>
              </Dialog>
            </div>

            {/* Employee Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((employee) => (
                <Card
                  key={employee.id}
                  className="hover:shadow-lg transition-shadow duration-200"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage
                            src={employee.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {employee.name}
                          </CardTitle>
                          <CardDescription>{employee.position}</CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => setSelectedEmployee(employee)}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openEditDialog(employee)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteEmployee(employee.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          employee.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {employee.status}
                      </Badge>
                      <Badge variant="outline">{employee.department}</Badge>
                    </div>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        {employee.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {employee.phone}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {employee.location}
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-lg font-semibold text-green-600">
                        ${employee.salary.toLocaleString()}/year
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments
                .filter((dept) => dept !== "All")
                .map((department) => {
                  const deptEmployees = employees.filter(
                    (emp) => emp.department === department
                  );
                  const avgSalary =
                    deptEmployees.length > 0
                      ? Math.round(
                          deptEmployees.reduce(
                            (sum, emp) => sum + emp.salary,
                            0
                          ) / deptEmployees.length
                        )
                      : 0;

                  return (
                    <Card
                      key={department}
                      className="hover:shadow-lg transition-shadow duration-200"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {department}
                          <Badge variant="secondary">
                            {deptEmployees.length} employees
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-2xl font-bold text-green-600">
                          ${avgSalary.toLocaleString()}
                        </div>
                        <p className="text-sm text-slate-600">Average salary</p>
                        <div className="space-y-2">
                          {deptEmployees.slice(0, 3).map((emp) => (
                            <div
                              key={emp.id}
                              className="flex items-center space-x-2"
                            >
                              <Avatar className="w-6 h-6">
                                <AvatarImage
                                  src={emp.avatar || "/placeholder.svg"}
                                />
                                <AvatarFallback className="text-xs">
                                  {emp.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{emp.name}</span>
                            </div>
                          ))}
                          {deptEmployees.length > 3 && (
                            <p className="text-xs text-slate-500">
                              +{deptEmployees.length - 3} more employees
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Employee Detail Modal */}
        {selectedEmployee && (
          <Dialog
            open={!!selectedEmployee}
            onOpenChange={() => setSelectedEmployee(null)}
          >
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={selectedEmployee.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {selectedEmployee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">
                      {selectedEmployee.name}
                    </h3>
                    <p className="text-slate-600">
                      {selectedEmployee.position}
                    </p>
                  </div>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Department
                    </Label>
                    <p className="mt-1">{selectedEmployee.department}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Status
                    </Label>
                    <Badge
                      className="mt-1"
                      variant={
                        selectedEmployee.status === "Active"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {selectedEmployee.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Email
                    </Label>
                    <p className="mt-1">{selectedEmployee.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Phone
                    </Label>
                    <p className="mt-1">{selectedEmployee.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Location
                    </Label>
                    <p className="mt-1">{selectedEmployee.location}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Start Date
                    </Label>
                    <p className="mt-1">
                      {new Date(
                        selectedEmployee.startDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Salary
                    </Label>
                    <p className="mt-1 text-lg font-semibold text-green-600">
                      ${selectedEmployee.salary.toLocaleString()}/year
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Bio
                  </Label>
                  <p className="mt-1 text-slate-700">{selectedEmployee.bio}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Edit Employee Modal */}
        {editingEmployee && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Employee</DialogTitle>
                <DialogDescription>
                  Update employee information
                </DialogDescription>
              </DialogHeader>
              <EmployeeForm
                employee={editingEmployee}
                onSubmit={handleEditEmployee}
                isEditing={true}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

// Employee Form Component
function EmployeeForm({
  employee,
  onSubmit,
  isEditing = false,
}: {
  employee?: Employee;
  onSubmit: (employee: Employee) => void;
  isEditing?: boolean;
}) {
  const [formData, setFormData] = useState<Employee>({
    id: employee?.id || 0,
    name: employee?.name || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
    position: employee?.position || "",
    department: employee?.department || "",
    salary: Number(employee?.salary) || 0,
    startDate: employee?.startDate || "",
    status: employee?.status || "Active",
    location: employee?.location || "",
    bio: employee?.bio || "",
    avatar: employee?.avatar || "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: employee?.id || 0,
      salary: Number.parseInt(formData.salary.toString()),
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="position">Position</Label>
          <Select
            value={formData.position}
            onValueChange={(value: string) => handleChange("position", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              {positions.map((pos) => (
                <SelectItem key={pos} value={pos}>
                  {pos}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="department">Department</Label>
          <Select
            value={formData.department}
            onValueChange={(value: string) => handleChange("department", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments
                .filter((dept) => dept !== "All")
                .map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="salary">Salary</Label>
          <Input
            id="salary"
            type="number"
            value={formData.salary}
            onChange={(e) => handleChange("salary", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value: string) => handleChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="On Leave">On Leave</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          rows={3}
        />
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {isEditing ? "Update Employee" : "Add Employee"}
        </Button>
      </div>
    </form>
  );
}
