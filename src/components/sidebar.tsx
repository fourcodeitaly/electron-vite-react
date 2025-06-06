import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  UserX,
  History,
  UserPlus,
  AlertTriangle,
  LogOut,
} from "lucide-react";
import { useEmployeeStore } from "@/lib/employee-store";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/hooks/use-translate";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const { employees, editHistory } = useEmployeeStore();
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  const activeEmployees = employees.filter((emp) => emp.status === "Active");
  const inactiveEmployees = employees.filter(
    (emp) => emp.status === "Inactive"
  );
  const probationEmployees = employees.filter(
    (emp) => emp.probationPeriod.isOnProbation
  );

  const menuItems = [
    {
      id: "active-employees",
      label: t("Employee"),
      icon: Users,
      count: activeEmployees.length,
      color: "bg-green-500",
    },
    {
      id: "inactive-employees",
      label: t("Inactive Employee"),
      icon: UserX,
      count: inactiveEmployees.length,
      color: "bg-slate-500",
    },
    {
      id: "probation-employees",
      label: t("Probation Employee"),
      icon: AlertTriangle,
      count: probationEmployees.length,
      color: "bg-orange-500",
    },
    {
      id: "edit-history",
      label: t("Edit History"),
      icon: History,
      count: editHistory.length,
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="w-80 bg-white border-r border-slate-200 p-6 space-y-6 h-screen">
      {/* User Profile */}
      <div className="flex items-center space-x-3 pb-6 border-b">
        <Avatar>
          <AvatarFallback className="bg-blue-600 text-white">
            {user?.name.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-slate-900 truncate">{user?.name}</p>
          <p className="text-xs text-slate-500">
            {/* {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)} */}
          </p>
        </div>
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            title="Logout"
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white hover:text-white"
          >
            <LogOut className="h-6 w-4" />
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-slate-800">
          {t("Employee Management")}
        </h2>
        <p className="text-sm text-slate-600">
          {t("Employee Management Description")}
        </p>
      </div>

      {/* Navigation Menu */}
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start h-12 cursor-pointer ${
                isActive
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "hover:bg-slate-100"
              }`}
              onClick={() => onViewChange(item.id)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                <Badge
                  variant={isActive ? "secondary" : "outline"}
                  className="ml-auto"
                >
                  {item.count}
                </Badge>
              </div>
            </Button>
          );
        })}
      </div>

      {/* Add Employee Button */}
      <div className="pt-4 border-t border-slate-200">
        <Button
          className="w-full bg-green-600 hover:bg-green-700 cursor-pointer"
          onClick={() => onViewChange("employee-form")}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          {t("Add Employee")}
        </Button>
      </div>

      {/* Probation Alert */}
      {probationEmployees.length > 0 && (
        <Card className="p-4 bg-orange-50 border-orange-200">
          <div className="space-y-2">
            <h3 className="font-semibold text-orange-800 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              {t("Probation Period")}
            </h3>
            <p className="text-sm text-orange-700">
              {probationEmployees.length} {t("Employees")}
              {probationEmployees.length > 1 ? "s" : ""} {t("On Probation")}
            </p>
            <div className="space-y-1">
              {probationEmployees.slice(0, 3).map((emp) => (
                <div key={emp.id} className="text-xs text-orange-600">
                  {emp.name} - {t("Ends")}{" "}
                  {new Date(emp.probationPeriod.endDate).toLocaleDateString()}
                </div>
              ))}
              {probationEmployees.length > 3 && (
                <div className="text-xs text-orange-600">
                  +{probationEmployees.length - 3} {t("More")}
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
