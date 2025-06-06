import { useState } from "react";
import EmployeeList from "@/components/employee-list";
import EmployeeDetail from "@/components/employee-detail";
import EmployeeForm from "@/components/employee-form";
import EditHistory from "@/components/edit-history";
import Sidebar from "@/components/sidebar";
import { useEmployeeStore } from "@/lib/employee-store";
import ProtectedRoute from "@/components/protected-route";
import { useTranslation } from "@/hooks/use-translate";

export default function EmployeeManagement() {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState("active-employees");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { employees } = useEmployeeStore();

  const handleViewEmployee = (id: number) => {
    setSelectedEmployeeId(id);
    setIsCreating(false);
    setIsEditing(false);
    setActiveView("employee-detail");
  };

  const handleCreateEmployee = () => {
    setSelectedEmployeeId(null);
    setIsCreating(true);
    setIsEditing(false);
    setActiveView("employee-form");
  };

  const handleEditEmployee = (id: number) => {
    setSelectedEmployeeId(id);
    setIsCreating(false);
    setIsEditing(true);
    setActiveView("employee-form");
  };

  const handleBackToList = (view = "active-employees") => {
    setActiveView(view);
    setSelectedEmployeeId(null);
    setIsCreating(false);
    setIsEditing(false);
  };

  const selectedEmployee = selectedEmployeeId
    ? employees.find((emp) => emp.id === selectedEmployeeId)
    : null;

  const renderContent = () => {
    switch (activeView) {
      case "active-employees":
        return (
          <EmployeeList
            employees={employees.filter((emp) => emp.status === "Active")}
            title={t("Active Employees")}
            onViewEmployee={handleViewEmployee}
            onCreateEmployee={handleCreateEmployee}
            onEditEmployee={handleEditEmployee}
          />
        );
      case "inactive-employees":
        return (
          <EmployeeList
            employees={employees.filter((emp) => emp.status === "Inactive")}
            title={t("Inactive Employees")}
            onViewEmployee={handleViewEmployee}
            onCreateEmployee={handleCreateEmployee}
            onEditEmployee={handleEditEmployee}
          />
        );
      case "probation-employees":
        return (
          <EmployeeList
            employees={employees.filter(
              (emp) => emp.probationPeriod.isOnProbation
            )}
            title={t("Probation Employees")}
            onViewEmployee={handleViewEmployee}
            onCreateEmployee={handleCreateEmployee}
            onEditEmployee={handleEditEmployee}
          />
        );
      case "edit-history":
        return <EditHistory />;
      case "employee-detail":
        return selectedEmployee ? (
          <EmployeeDetail
            employee={selectedEmployee}
            onBack={() => {
              if (selectedEmployee.probationPeriod.isOnProbation) {
                handleBackToList("probation-employees");
              } else {
                handleBackToList(
                  selectedEmployee.status === "Active"
                    ? "active-employees"
                    : "inactive-employees"
                );
              }
            }}
            onEdit={() => handleEditEmployee(selectedEmployee.id)}
          />
        ) : null;
      case "employee-form":
        return (
          <EmployeeForm
            employee={isEditing ? selectedEmployee : null}
            isEditing={isEditing}
            onBack={() => handleBackToList("active-employees")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex">
          <Sidebar activeView={activeView} onViewChange={setActiveView} />
          <div className="flex-1 p-6">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                {t("Employee Management")}
              </h1>
              <p className="text-slate-600">
                {t("Employee Management Description")}
              </p>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
