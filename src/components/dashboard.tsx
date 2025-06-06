import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Award, Building, DollarSign } from "lucide-react";
import { useEmployeeStore } from "@/lib/employee-store";
import { useTranslation } from "@/hooks/use-translate";

export default function Dashboard() {
  const { employees } = useEmployeeStore();
  const { t } = useTranslation();

  // Calculate statistics
  const stats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter((emp) => emp.status === "Active").length,
    departments: [...new Set(employees.map((emp) => emp.department))].length,
    averageSalary: Math.round(
      employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length
    ),
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("Total Employees")}
            </CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
            <p className="text-xs opacity-80">{t("Current Employees")}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("Active Employees")}
            </CardTitle>
            <Award className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeEmployees}</div>
            <p className="text-xs opacity-80">{t("Active Employees")}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("Departments")}
            </CardTitle>
            <Building className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.departments}</div>
            <p className="text-xs opacity-80">{t("Active Departments")}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("Average Salary")}
            </CardTitle>
            <DollarSign className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.averageSalary.toLocaleString()}
            </div>
            <p className="text-xs opacity-80">{t("Per employee")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Employees */}
      <Card>
        <CardHeader>
          <CardTitle>{t("Recent Hires")}</CardTitle>
          <CardDescription>
            {t("Latest additions to your team")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {employees
              .sort(
                (a, b) =>
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
                    <AvatarImage src={employee.avatar || "/placeholder.svg"} />
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
    </div>
  );
}
