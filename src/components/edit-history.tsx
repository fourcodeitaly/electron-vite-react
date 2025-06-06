import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, History, User, Edit, ToggleLeft } from "lucide-react";
import { useEmployeeStore } from "@/lib/employee-store";

export default function EditHistory() {
  const { editHistory, employees } = useEmployeeStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  const filteredHistory = editHistory.filter((entry) => {
    const matchesSearch =
      entry.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.updatedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction =
      actionFilter === "all" || entry.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  const getActionIcon = (action: string) => {
    switch (action) {
      case "created":
        return <User className="w-4 h-4 text-green-600" />;
      case "updated":
        return <Edit className="w-4 h-4 text-blue-600" />;
      case "status_changed":
        return <ToggleLeft className="w-4 h-4 text-orange-600" />;
      default:
        return <History className="w-4 h-4 text-slate-600" />;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case "created":
        return (
          <Badge variant="default" className="bg-green-600">
            Tạo mới
          </Badge>
        );
      case "updated":
        return (
          <Badge variant="default" className="bg-blue-600">
            Cập nhật
          </Badge>
        );
      case "status_changed":
        return (
          <Badge variant="default" className="bg-orange-600">
            Thay đổi trạng thái
          </Badge>
        );
      default:
        return <Badge variant="secondary">{action}</Badge>;
    }
  };

  const formatChanges = (changes: Record<string, { from: any; to: any }>) => {
    return Object.entries(changes).map(([field, change]) => (
      <div key={field} className="text-sm">
        <span className="font-medium capitalize">
          {field.replace(/([A-Z])/g, " $1").toLowerCase()}:
        </span>
        <span className="text-red-600 line-through ml-1">
          {String(change.from)}
        </span>
        <span className="mx-1">→</span>
        <span className="text-green-600">{String(change.to)}</span>
      </div>
    ));
  };

  const getEmployeeAvatar = (employeeId: number) => {
    const employee = employees.find((emp) => emp.id === employeeId);
    return employee?.avatar || "/placeholder.svg";
  };

  const getEmployeeInitials = (employeeName: string) => {
    return employeeName
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Lịch sử chỉnh sửa</h2>
        <p className="text-slate-600">
          Theo dõi tất cả các thay đổi đã thực hiện đối với nhân viên
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bộ lọc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm theo tên nhân viên hoặc người thực hiện..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo hành động" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="created">Tạo mới</SelectItem>
                <SelectItem value="updated">Cập nhật</SelectItem>
                <SelectItem value="status_changed">
                  Thay đổi trạng thái
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử gần đây</CardTitle>
          <CardDescription>
            {filteredHistory.length} bản ghi đã tìm thấy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nhân viên</TableHead>
                <TableHead>Hành động</TableHead>
                <TableHead>Thay đổi</TableHead>
                <TableHead>Người thực hiện</TableHead>
                <TableHead>Ngày & Giờ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={
                            getEmployeeAvatar(entry.employeeId) ||
                            "/placeholder.svg"
                          }
                        />
                        <AvatarFallback className="text-xs">
                          {getEmployeeInitials(entry.employeeName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">
                          {entry.employeeName}
                        </p>
                        <p className="text-xs text-slate-500">
                          ID: {entry.employeeId}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getActionIcon(entry.action)}
                      {getActionBadge(entry.action)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {Object.keys(entry.changes).length > 0 ? (
                      <div className="space-y-1 max-w-md">
                        {formatChanges(entry.changes)}
                      </div>
                    ) : (
                      <span className="text-slate-500 text-sm">
                        Nhân viên mới đã được tạo
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium">
                      {entry.updatedBy}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </div>
                      <div className="text-slate-500">
                        {new Date(entry.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredHistory.length === 0 && (
            <div className="text-center py-8">
              <History className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600 mb-2">
                Không tìm thấy lịch sử
              </h3>
              <p className="text-slate-500">
                {searchTerm || actionFilter !== "all"
                  ? "Hãy điều chỉnh bộ lọc của bạn"
                  : "Không có thay đổi nào đã được thực hiện"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
