import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Building,
  User,
  CreditCard,
  Clock,
  GraduationCap,
  Award,
  Users,
  Home,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translate";

interface EmployeeDetailProps {
  employee: any;
  onBack: () => void;
  onEdit: () => void;
}

export default function EmployeeDetail({
  employee,
  onBack,
  onEdit,
}: EmployeeDetailProps) {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Employee List")}
        </Button>
        <Button
          onClick={onEdit}
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
        >
          <Edit className="w-4 h-4 mr-2" />
          {t("Edit Employee")}
        </Button>
      </div>

      {/* Employee Profile Card */}
      <Card className="max-w-6xl mx-auto">
        <CardHeader className="pb-6">
          <div className="flex items-center space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={employee.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">
                {employee.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-3xl font-bold mb-2">
                {employee.name}
              </CardTitle>
              <p className="text-xl text-slate-600 mb-1">{employee.position}</p>
              <p className="text-sm text-slate-500 mb-3">
                {employee.employeeNumber}
              </p>
              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    employee.status === "Active" ? "default" : "secondary"
                  }
                  className="text-sm"
                >
                  {employee.status}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {employee.department}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              {t("Contact Information")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
                <Mail className="w-5 h-5 text-slate-500" />
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    {t("Email")}
                  </Label>
                  <p className="text-slate-800">{employee.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
                <Phone className="w-5 h-5 text-slate-500" />
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    {t("Phone")}
                  </Label>
                  <p className="text-slate-800">{employee.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
                <MapPin className="w-5 h-5 text-slate-500" />
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    {t("Position")}
                  </Label>
                  <p className="text-slate-800">{employee.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
                <Home className="w-5 h-5 text-slate-500" />
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    {t("Address")}
                  </Label>
                  <p className="text-slate-800">{employee.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
                <Calendar className="w-5 h-5 text-slate-500" />
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    {t("Date of Birth")}
                  </Label>
                  <p className="text-slate-800">
                    {new Date(employee.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
                <CreditCard className="w-5 h-5 text-slate-500" />
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    {t("National ID")}
                  </Label>
                  <p className="text-slate-800">{employee.nationalId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              {t("Emergency Contact")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
                <User className="w-5 h-5 text-slate-500" />
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    {t("Emergency Contact Name")}
                  </Label>
                  <p className="text-slate-800">{employee.emergencyContact}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
                <Phone className="w-5 h-5 text-slate-500" />
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    {t("Emergency Contact Phone")}
                  </Label>
                  <p className="text-slate-800">{employee.emergencyPhone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Employment Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Building className="w-5 h-5" />
              {t("Employment Details")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
                <Building className="w-5 h-5 text-slate-500" />
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    {t("Department")}
                  </Label>
                  <p className="text-slate-800">{employee.department}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    {t("Annual Salary")}
                  </Label>
                  <p className="text-xl font-bold text-green-600">
                    ${employee.salary.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
                <Calendar className="w-5 h-5 text-slate-500" />
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    {t("Start Date")}
                  </Label>
                  <p className="text-slate-800">
                    {new Date(employee.startDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
                <Clock className="w-5 h-5 text-slate-500" />
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    {t("Work Schedule")}
                  </Label>
                  <p className="text-slate-800">{employee.workSchedule}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
                <User className="w-5 h-5 text-slate-500" />
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    {t("Manager")}
                  </Label>
                  <p className="text-slate-800">{employee.manager}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
                <CreditCard className="w-5 h-5 text-slate-500" />
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    {t("Bank Account")}
                  </Label>
                  <p className="text-slate-800">{employee.bankAccount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              {t("Professional Information")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-slate-50">
                  <Label className="text-sm font-medium text-slate-600 flex items-center gap-2 mb-2">
                    <GraduationCap className="w-4 h-4" />
                    {t("Education")}
                  </Label>
                  <p className="text-slate-800">{employee.education}</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50">
                  <Label className="text-sm font-medium text-slate-600 flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4" />
                    {t("Experience")}
                  </Label>
                  <p className="text-slate-800">{employee.experience}</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-slate-50">
                <Label className="text-sm font-medium text-slate-600 flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4" />
                  {t("Skills")}
                </Label>
                <div className="flex flex-wrap gap-2">
                  {employee.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          {employee.bio && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {t("Introduction")}
              </h3>
              <div className="p-4 rounded-lg bg-slate-50">
                <p className="text-slate-700 leading-relaxed">{employee.bio}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
