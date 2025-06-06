import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Building,
  CreditCard,
  Clock,
  GraduationCap,
  Award,
  Users,
  Home,
  Plus,
  X,
  AlertTriangle,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import {
  useEmployeeStore,
  departments,
  positions,
  Employee,
} from "@/lib/employee-store";
import { useTranslation } from "@/hooks/use-translate";

interface EmployeeFormProps {
  employee?: any;
  isEditing?: boolean;
  onBack: () => void;
}

export default function EmployeeForm({
  employee,
  isEditing = false,
  onBack,
}: EmployeeFormProps) {
  const { addEmployee, updateEmployee } = useEmployeeStore();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    employeeNumber: employee?.employeeNumber || "",
    name: employee?.name || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
    position: employee?.position || "",
    department: employee?.department || "",
    salary: employee?.salary || "",
    startDate: employee?.startDate || "",
    status: employee?.status || "Active",
    employmentType: employee?.employmentType || "Full-time",
    location: employee?.location || "",
    bio: employee?.bio || "",
    dateOfBirth: employee?.dateOfBirth || "",
    gender: employee?.gender || "",
    maritalStatus: employee?.maritalStatus || "",
    nationality: employee?.nationality || "",
    address: employee?.address || "",
    city: employee?.city || "",
    state: employee?.state || "",
    zipCode: employee?.zipCode || "",
    country: employee?.country || "",
    nationalId: employee?.nationalId || "",
    passportNumber: employee?.passportNumber || "",
    drivingLicense: employee?.drivingLicense || "",
    socialSecurityNumber: employee?.socialSecurityNumber || "",
    bankName: employee?.bankName || "",
    bankAccount: employee?.bankAccount || "",
    routingNumber: employee?.routingNumber || "",
    accountType: employee?.accountType || "Checking",
    emergencyContact: employee?.emergencyContact || "",
    emergencyPhone: employee?.emergencyPhone || "",
    emergencyRelationship: employee?.emergencyRelationship || "",
    emergencyAddress: employee?.emergencyAddress || "",
    workSchedule: employee?.workSchedule || "9:00 AM - 5:00 PM",
    manager: employee?.manager || "",
    skills: employee?.skills || [],
    education: employee?.education || "",
    experience: employee?.experience || "",
    // Probation fields
    isOnProbation: employee?.probationPeriod?.isOnProbation || false,
    probationStartDate: employee?.probationPeriod?.startDate || "",
    probationEndDate: employee?.probationPeriod?.endDate || "",
    probationDuration: employee?.probationPeriod?.duration || 6,
  });

  const [newSkill, setNewSkill] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const employeeData = {
      ...formData,
      salary: Number.parseInt(formData.salary),
      probationPeriod: {
        isOnProbation: formData.isOnProbation,
        startDate: formData.probationStartDate,
        endDate: formData.probationEndDate,
        duration: Number.parseInt(formData.probationDuration),
      },
      createdBy: "Current User", // In real app, get from auth context
      updatedBy: "Current User",
    };

    if (isEditing) {
      updateEmployee(employee.id, employeeData, "Current User");
    } else {
      addEmployee(employeeData as any);
    }

    onBack();
  };

  const handleChange = (field: string, value: boolean | string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill: string) => skill !== skillToRemove),
    }));
  };

  // Calculate probation end date when start date or duration changes
  const calculateProbationEndDate = (startDate: string, duration: string) => {
    if (!startDate || !duration) return "";
    const start = new Date(startDate);
    const end = new Date(
      start.setMonth(start.getMonth() + Number.parseInt(duration))
    );
    return end.toISOString().split("T")[0];
  };

  // Update probation end date when start date or duration changes
  const handleProbationStartDateChange = (value: string) => {
    handleChange("probationStartDate", value);
    const endDate = calculateProbationEndDate(
      value,
      formData.probationDuration
    );
    handleChange("probationEndDate", endDate);
  };

  const handleProbationDurationChange = (value: string) => {
    handleChange("probationDuration", value);
    const endDate = calculateProbationEndDate(
      formData.probationStartDate,
      value
    );
    handleChange("probationEndDate", endDate);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Employee List")}
        </Button>
      </div>

      {/* Form Card */}
      <Card className="max-w-6xl mx-auto">
        <CardHeader className="pb-6">
          <div className="flex items-center space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={employee?.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">
                {formData.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("") || "??"}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl font-bold mb-2">
                {isEditing ? t("Edit Employee") : t("Add Employee")}
              </CardTitle>
              <p className="text-slate-600">
                {isEditing
                  ? t("Update Employee Information")
                  : t("Enter information to add a new employee")}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Employment Status & Probation */}
            {isEditing && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <ToggleLeft className="w-5 h-5" />
                  {t("Employment Status & Probation")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="status">{t("Employment Status")}</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: string) =>
                        handleChange("status", value)
                      }
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">
                          <div className="flex items-center gap-2">
                            <ToggleRight className="w-4 h-4 text-green-600" />
                            {t("Active")}
                          </div>
                        </SelectItem>
                        <SelectItem value="Inactive">
                          <div className="flex items-center gap-2">
                            <ToggleLeft className="w-4 h-4 text-slate-400" />
                            {t("Inactive")}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="probationToggle"
                      className="flex items-center gap-2"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      {t("Probation Period")}
                    </Label>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <Switch
                        id="probationToggle"
                        checked={formData.isOnProbation}
                        onCheckedChange={(checked: boolean) =>
                          handleChange("isOnProbation", checked)
                        }
                      />
                      <Label htmlFor="probationToggle" className="text-sm">
                        {formData.isOnProbation
                          ? t("On Probation")
                          : t("Not on Probation")}
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Probation Details */}
                {formData.isOnProbation && (
                  <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <h4 className="font-medium text-orange-800 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      {t("Probation Period")}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="probationStartDate">
                          {t("Start Date")}
                        </Label>
                        <Input
                          id="probationStartDate"
                          type="date"
                          value={formData.probationStartDate}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleProbationStartDateChange(e.target.value)
                          }
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="probationDuration">
                          {t("Probation Duration")}
                        </Label>
                        <Select
                          value={formData.probationDuration.toString()}
                          onValueChange={(value: string) =>
                            handleProbationDurationChange(value)
                          }
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">{t("3 months")}</SelectItem>
                            <SelectItem value="6">{t("6 months")}</SelectItem>
                            <SelectItem value="9">{t("9 months")}</SelectItem>
                            <SelectItem value="12">{t("12 months")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="probationEndDate">
                          {t("End Date")}
                        </Label>
                        <Input
                          id="probationEndDate"
                          type="date"
                          value={formData.probationEndDate}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange("probationEndDate", e.target.value)
                          }
                          className="h-12"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                {t("Personal Information")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="employeeNumber"
                    className="flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    {t("Employee Number")}
                  </Label>
                  <Input
                    id="employeeNumber"
                    value={formData.employeeNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("employeeNumber", e.target.value)
                    }
                    required
                    className="h-12"
                    placeholder="EMP001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {t("Name")}
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("name", e.target.value)
                    }
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {t("Email")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("email", e.target.value)
                    }
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {t("Phone")}
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("phone", e.target.value)
                    }
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="dateOfBirth"
                    className="flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    {t("Date of Birth")}
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("dateOfBirth", e.target.value)
                    }
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">{t("Gender")}</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value: string) =>
                      handleChange("gender", value)
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={t("Select Gender")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nam">Nam</SelectItem>
                      <SelectItem value="Nữ">Nữ</SelectItem>
                      <SelectItem value="Khác">Khác</SelectItem>
                      <SelectItem value="Không muốn tiết lộ">
                        Không muốn tiết lộ
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">{t("Marital Status")}</Label>
                  <Select
                    value={formData.maritalStatus}
                    onValueChange={(value: string) =>
                      handleChange("maritalStatus", value)
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={t("Select Marital Status")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Độc thân">Độc thân</SelectItem>
                      <SelectItem value="Đã kết hôn">Đã kết hôn</SelectItem>
                      <SelectItem value="Đã ly hôn">Đã ly hôn</SelectItem>
                      <SelectItem value="Đã ly thân">Đã ly thân</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">{t("Nationality")}</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("nationality", e.target.value)
                    }
                    required
                    className="h-12"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Home className="w-5 h-5" />
                {t("Address")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">{t("Address")}</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("address", e.target.value)
                    }
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">{t("City")}</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("city", e.target.value)
                    }
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">{t("State")}</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">{t("Zip Code")}</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleChange("zipCode", e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">{t("Country")}</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {t("Location")}
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
              </div>
            </div>

            {/* Identification */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                {t("Identification")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nationalId">{t("National ID")}</Label>
                  <Input
                    id="nationalId"
                    value={formData.nationalId}
                    onChange={(e) => handleChange("nationalId", e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passportNumber">{t("Passport Number")}</Label>
                  <Input
                    id="passportNumber"
                    value={formData.passportNumber}
                    onChange={(e) =>
                      handleChange("passportNumber", e.target.value)
                    }
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="drivingLicense">{t("Driving License")}</Label>
                  <Input
                    id="drivingLicense"
                    value={formData.drivingLicense}
                    onChange={(e) =>
                      handleChange("drivingLicense", e.target.value)
                    }
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="socialSecurityNumber">
                    {t("Social Security Number")}
                  </Label>
                  <Input
                    id="socialSecurityNumber"
                    value={formData.socialSecurityNumber}
                    onChange={(e) =>
                      handleChange("socialSecurityNumber", e.target.value)
                    }
                    className="h-12"
                  />
                </div>
              </div>
            </div>

            {/* Banking Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                {t("Banking Information")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bankName">{t("Bank Name")}</Label>
                  <Input
                    id="bankName"
                    value={formData.bankName}
                    onChange={(e) => handleChange("bankName", e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankAccount">{t("Bank Account")}</Label>
                  <Input
                    id="bankAccount"
                    value={formData.bankAccount}
                    onChange={(e) =>
                      handleChange("bankAccount", e.target.value)
                    }
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="routingNumber">{t("Routing Number")}</Label>
                  <Input
                    id="routingNumber"
                    value={formData.routingNumber}
                    onChange={(e) =>
                      handleChange("routingNumber", e.target.value)
                    }
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountType">{t("Account Type")}</Label>
                  <Select
                    value={formData.accountType}
                    onValueChange={(value) =>
                      handleChange("accountType", value)
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Checking">{t("Checking")}</SelectItem>
                      <SelectItem value="Savings">{t("Savings")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                {t("Emergency Contact")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">
                    {t("Emergency Contact")}
                  </Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) =>
                      handleChange("emergencyContact", e.target.value)
                    }
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">{t("Emergency Phone")}</Label>
                  <Input
                    id="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={(e) =>
                      handleChange("emergencyPhone", e.target.value)
                    }
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyRelationship">
                    {t("Emergency Relationship")}
                  </Label>
                  <Input
                    id="emergencyRelationship"
                    value={formData.emergencyRelationship}
                    onChange={(e) =>
                      handleChange("emergencyRelationship", e.target.value)
                    }
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyAddress">
                    {t("Emergency Address")}
                  </Label>
                  <Input
                    id="emergencyAddress"
                    value={formData.emergencyAddress}
                    onChange={(e) =>
                      handleChange("emergencyAddress", e.target.value)
                    }
                    required
                    className="h-12"
                  />
                </div>
              </div>
            </div>

            {/* Employment Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Building className="w-5 h-5" />
                {t("Employment Details")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="position">{t("Position")}</Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) => handleChange("position", value)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={t("Select Position")} />
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
                <div className="space-y-2">
                  <Label htmlFor="department">{t("Department")}</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => handleChange("department", value)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={t("Select Department")} />
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
                <div className="space-y-2">
                  <Label htmlFor="employmentType">{t("Employment Type")}</Label>
                  <Select
                    value={formData.employmentType}
                    onValueChange={(value) =>
                      handleChange("employmentType", value)
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">
                        {t("Full-time")}
                      </SelectItem>
                      <SelectItem value="Part-time">
                        {t("Part-time")}
                      </SelectItem>
                      <SelectItem value="Contract">{t("Contract")}</SelectItem>
                      <SelectItem value="Intern">{t("Intern")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary" className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    {t("Salary")}
                  </Label>
                  <Input
                    id="salary"
                    type="number"
                    value={formData.salary}
                    onChange={(e) => handleChange("salary", e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="startDate"
                    className="flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    {t("Start Date")}
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange("startDate", e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="workSchedule"
                    className="flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    {t("Work Schedule")}
                  </Label>
                  <Input
                    id="workSchedule"
                    value={formData.workSchedule}
                    onChange={(e) =>
                      handleChange("workSchedule", e.target.value)
                    }
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manager">{t("Manager")}</Label>
                  <Input
                    id="manager"
                    value={formData.manager}
                    onChange={(e) => handleChange("manager", e.target.value)}
                    required
                    className="h-12"
                  />
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
                <div className="space-y-2">
                  <Label htmlFor="education">{t("Education")}</Label>
                  <Input
                    id="education"
                    value={formData.education}
                    onChange={(e) => handleChange("education", e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">{t("Experience")}</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleChange("experience", e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    {t("Skills")}
                  </Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder={t("Add Skill")}
                      className="h-12"
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addSkill())
                      }
                    />
                    <Button
                      type="button"
                      onClick={addSkill}
                      className="h-12 px-4"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {skill}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => removeSkill(skill)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {t("Introduction")}
              </h3>
              <div className="space-y-2">
                <Label htmlFor="bio">{t("Introduction")}</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  rows={4}
                  placeholder={t("Enter introduction")}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 h-12 px-8 cursor-pointer"
              >
                <Save className="w-4 h-4 mr-2" />
                {isEditing ? t("Update") : t("Add")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
