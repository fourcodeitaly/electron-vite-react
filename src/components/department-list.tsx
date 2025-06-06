import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEmployeeStore, departments } from "@/lib/employee-store";
import { useTranslation } from "@/hooks/use-translate";

export default function DepartmentList() {
  const { employees } = useEmployeeStore();
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
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
                    deptEmployees.reduce((sum, emp) => sum + emp.salary, 0) /
                      deptEmployees.length
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
                      {t("{count} employees", { count: deptEmployees.length })}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold text-green-600">
                    ${avgSalary.toLocaleString()}
                  </div>
                  <p className="text-sm text-slate-600">
                    {t("Average salary")}
                  </p>
                  <div className="space-y-2">
                    {deptEmployees.slice(0, 3).map((emp) => (
                      <div key={emp.id} className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={emp.avatar || "/placeholder.svg"} />
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
                        {t("+{count} more employees", {
                          count: deptEmployees.length - 3,
                        })}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
