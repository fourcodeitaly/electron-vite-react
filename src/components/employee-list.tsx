import type React from "react";

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
import {
  Search,
  Edit,
  Mail,
  Phone,
  MapPin,
  Clock,
  AlertTriangle,
  Users,
  Languages,
} from "lucide-react";
import type { Employee } from "@/lib/employee-store";
import { useTranslation } from "@/hooks/use-translate";
import { useLanguage } from "@/lib/language-provider";

interface EmployeeListProps {
  employees: Employee[];
  title: string;
  onViewEmployee: (id: number) => void;
  onCreateEmployee: () => void;
  onEditEmployee: (id: number) => void;
}

export default function EmployeeList({
  employees,
  title,
  onViewEmployee,
  onCreateEmployee,
  onEditEmployee,
}: EmployeeListProps) {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter employees based on search (name and employee ID)
  useEffect(() => {
    let filtered = employees;

    if (searchTerm) {
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.employeeNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEmployees(filtered);
  }, [employees, searchTerm]);

  const handleEditClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onEditEmployee(id);
  };

  const isOnProbation = (employee: Employee) => {
    return (
      employee.probationPeriod.isOnProbation &&
      new Date() < new Date(employee.probationPeriod.endDate)
    );
  };

  const getProbationDaysLeft = (employee: Employee) => {
    if (!employee.probationPeriod.isOnProbation) return 0;
    const endDate = new Date(employee.probationPeriod.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
          <p className="text-slate-600">
            {t("{count} employees found", { count: filteredEmployees.length })}
          </p>
        </div>

        <div className="flex gap-4 items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === "vi" ? "zh" : "vi")}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white hover:text-white"
          >
            <Languages className="w-4 h-4" />
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder={t("Search by name or employee ID...")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <Card
            key={employee.id}
            className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.02] relative"
            onClick={() => onViewEmployee(employee.id)}
          >
            {/* Probation Badge */}
            {isOnProbation(employee) && (
              <div className="absolute top-2 right-2 z-10">
                <Badge
                  variant="outline"
                  className="bg-orange-50 text-orange-700 border-orange-300"
                >
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {t("Probation")}
                </Badge>
              </div>
            )}

            <CardHeader className="pb-4 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{employee.name}</CardTitle>
                    <CardDescription>{employee.position}</CardDescription>
                    <p className="text-xs text-slate-500 mt-1">
                      {employee.employeeNumber}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    employee.status === "Active" ? "default" : "secondary"
                  }
                >
                  {t(employee.status)}
                </Badge>
                <Badge variant="outline">{employee.department}</Badge>
              </div>

              {/* Probation Info */}
              {isOnProbation(employee) && (
                <div className="p-2 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-2 text-sm text-orange-700">
                    <Clock className="w-4 h-4" />
                    <span>
                      {t("{days} days left in probation period", {
                        days: getProbationDaysLeft(employee),
                      })}
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="truncate">{employee.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {employee.phone}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="truncate">{employee.location}</span>
                </div>
              </div>
              <div className="border-t">
                <p className="text-lg font-semibold text-green-600">
                  ${employee.salary.toLocaleString()}/year
                </p>
                <p className="text-xs text-slate-500">
                  {employee.employmentType}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-4">
            <Users className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-slate-600 mb-2">
            {t("No employees found")}
          </h3>
          <p className="text-slate-500 mb-4">
            {searchTerm
              ? t("Try adjusting your search terms")
              : t("No employees in this category yet")}
          </p>
          {!searchTerm && (
            <Button
              onClick={onCreateEmployee}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {t("Add First Employee")}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
