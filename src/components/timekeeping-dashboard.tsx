// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Clock, LogIn, LogOut, Coffee, CoffeeIcon, Search } from "lucide-react";
// import { useEmployeeStore } from "@/lib/employee-store";

// export default function TimekeepingDashboard() {
//   const { employees, timeEntries, addTimeEntry } = useEmployeeStore();
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split("T")[0]
//   );
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [isManualEntryOpen, setIsManualEntryOpen] = useState(false);

//   // Get today's entries
//   const todayEntries = timeEntries.filter(
//     (entry) => entry.date === selectedDate
//   );

//   // Filter employees based on search
//   const filteredEmployees = employees.filter(
//     (emp) =>
//       emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       emp.employeeNumber.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Get current time entry for an employee
//   const getCurrentEntry = (employeeId: number) => {
//     return todayEntries.find((entry) => entry.employeeId === employeeId);
//   };

//   // Check if employee is currently on break
//   const isOnBreak = (employeeId: number) => {
//     const entry = getCurrentEntry(employeeId);
//     return entry?.breakStart && !entry?.breakEnd;
//   };

//   // Check if employee has checked in today
//   const hasCheckedIn = (employeeId: number) => {
//     const entry = getCurrentEntry(employeeId);
//     return !!entry?.checkIn;
//   };

//   // Check if employee has checked out today
//   const hasCheckedOut = (employeeId: number) => {
//     const entry = getCurrentEntry(employeeId);
//     return !!entry?.checkOut;
//   };

//   const handleManualEntry = (formData: any) => {
//     const entry = {
//       employeeId: Number.parseInt(formData.employeeId),
//       date: formData.date,
//       checkIn: formData.checkIn || null,
//       checkOut: formData.checkOut || null,
//       breakStart: formData.breakStart || null,
//       breakEnd: formData.breakEnd || null,
//       totalHours: 0,
//       status: formData.status,
//       notes: formData.notes,
//     };

//     // Calculate total hours if both check in and out are provided
//     if (entry.checkIn && entry.checkOut) {
//       const checkInTime = new Date(`${entry.date}T${entry.checkIn}:00`);
//       const checkOutTime = new Date(`${entry.date}T${entry.checkOut}:00`);
//       let totalHours =
//         (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);

//       // Subtract break time if applicable
//       if (entry.breakStart && entry.breakEnd) {
//         const breakStartTime = new Date(`${entry.date}T${entry.breakStart}:00`);
//         const breakEndTime = new Date(`${entry.date}T${entry.breakEnd}:00`);
//         const breakHours =
//           (breakEndTime.getTime() - breakStartTime.getTime()) /
//           (1000 * 60 * 60);
//         totalHours -= breakHours;
//       }

//       entry.totalHours = Math.round(totalHours * 100) / 100;
//     }

//     addTimeEntry(entry);
//     setIsManualEntryOpen(false);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header with Quick Actions */}
//       <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold">Timekeeping Dashboard</h2>
//           <p className="text-slate-600">
//             Track employee attendance and working hours
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <Input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="w-40"
//           />
//           <Dialog open={isManualEntryOpen} onOpenChange={setIsManualEntryOpen}>
//             <DialogTrigger asChild>
//               <Button variant="outline">
//                 <Clock className="w-4 h-4 mr-2" />
//                 Manual Entry
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Add Manual Time Entry</DialogTitle>
//                 <DialogDescription>
//                   Add or edit time entry for an employee
//                 </DialogDescription>
//               </DialogHeader>
//               <ManualEntryForm
//                 onSubmit={handleManualEntry}
//                 employees={employees}
//               />
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       {/* Quick Check-in/out Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//         {employees
//           .filter((emp) => emp.status === "Active")
//           .slice(0, 8)
//           .map((employee) => {
//             const currentEntry = getCurrentEntry(employee.id);
//             const checkedIn = hasCheckedIn(employee.id);
//             const checkedOut = hasCheckedOut(employee.id);
//             const onBreak = isOnBreak(employee.id);

//             return (
//               <Card
//                 key={employee.id}
//                 className="hover:shadow-md transition-shadow"
//               >
//                 <CardHeader className="pb-3">
//                   <div className="flex items-center space-x-3">
//                     <Avatar className="w-10 h-10">
//                       <AvatarImage
//                         src={employee.avatar || "/placeholder.svg"}
//                       />
//                       <AvatarFallback>
//                         {employee.name
//                           .split(" ")
//                           .map((n) => n[0])
//                           .join("")}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="flex-1 min-w-0">
//                       <p className="font-medium text-sm truncate">
//                         {employee.name}
//                       </p>
//                       <p className="text-xs text-slate-500">
//                         {employee.employeeNumber}
//                       </p>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="space-y-2">
//                   <div className="flex items-center justify-between text-xs">
//                     <span>Status:</span>
//                     <Badge
//                       variant={
//                         checkedOut
//                           ? "secondary"
//                           : onBreak
//                           ? "outline"
//                           : checkedIn
//                           ? "default"
//                           : "secondary"
//                       }
//                       className="text-xs"
//                     >
//                       {checkedOut
//                         ? "Checked Out"
//                         : onBreak
//                         ? "On Break"
//                         : checkedIn
//                         ? "Working"
//                         : "Not Started"}
//                     </Badge>
//                   </div>
//                   {currentEntry && (
//                     <div className="text-xs text-slate-600 space-y-1">
//                       {currentEntry.checkIn && (
//                         <p>In: {currentEntry.checkIn}</p>
//                       )}
//                       {currentEntry.checkOut && (
//                         <p>Out: {currentEntry.checkOut}</p>
//                       )}
//                       {currentEntry.totalHours > 0 && (
//                         <p>Hours: {currentEntry.totalHours}</p>
//                       )}
//                     </div>
//                   )}
//                   <div className="flex gap-1">
//                     {!checkedIn ? (
//                       <Button
//                         size="sm"
//                         onClick={() => checkIn(employee.id)}
//                         className="flex-1 h-8 text-xs"
//                       >
//                         <LogIn className="w-3 h-3 mr-1" />
//                         Check In
//                       </Button>
//                     ) : !checkedOut ? (
//                       <>
//                         {!onBreak ? (
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             onClick={() => startBreak(employee.id)}
//                             className="flex-1 h-8 text-xs"
//                           >
//                             <Coffee className="w-3 h-3 mr-1" />
//                             Break
//                           </Button>
//                         ) : (
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             onClick={() => endBreak(employee.id)}
//                             className="flex-1 h-8 text-xs"
//                           >
//                             <CoffeeIcon className="w-3 h-3 mr-1" />
//                             End Break
//                           </Button>
//                         )}
//                         <Button
//                           size="sm"
//                           onClick={() => checkOut(employee.id)}
//                           className="flex-1 h-8 text-xs"
//                         >
//                           <LogOut className="w-3 h-3 mr-1" />
//                           Check Out
//                         </Button>
//                       </>
//                     ) : (
//                       <div className="text-xs text-green-600 text-center w-full py-1">
//                         ✓ Completed
//                       </div>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//       </div>

//       {/* Time Entries Table */}
//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle>Time Entries</CardTitle>
//               <CardDescription>
//                 Employee attendance for{" "}
//                 {new Date(selectedDate).toLocaleDateString()}
//               </CardDescription>
//             </div>
//             <div className="flex gap-2">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
//                 <Input
//                   placeholder="Search employees..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 w-64"
//                 />
//               </div>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Employee</TableHead>
//                 <TableHead>Check In</TableHead>
//                 <TableHead>Break Start</TableHead>
//                 <TableHead>Break End</TableHead>
//                 <TableHead>Check Out</TableHead>
//                 <TableHead>Total Hours</TableHead>
//                 <TableHead>Status</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredEmployees.map((employee) => {
//                 const entry = getCurrentEntry(employee.id);
//                 return (
//                   <TableRow key={employee.id}>
//                     <TableCell>
//                       <div className="flex items-center space-x-3">
//                         <Avatar className="w-8 h-8">
//                           <AvatarImage
//                             src={employee.avatar || "/placeholder.svg"}
//                           />
//                           <AvatarFallback className="text-xs">
//                             {employee.name
//                               .split(" ")
//                               .map((n) => n[0])
//                               .join("")}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <p className="font-medium text-sm">{employee.name}</p>
//                           <p className="text-xs text-slate-500">
//                             {employee.employeeNumber}
//                           </p>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>{entry?.checkIn || "-"}</TableCell>
//                     <TableCell>{entry?.breakStart || "-"}</TableCell>
//                     <TableCell>{entry?.breakEnd || "-"}</TableCell>
//                     <TableCell>{entry?.checkOut || "-"}</TableCell>
//                     <TableCell>
//                       {entry?.totalHours ? `${entry.totalHours}h` : "-"}
//                     </TableCell>
//                     <TableCell>
//                       <Badge
//                         variant={
//                           entry?.status === "present"
//                             ? "default"
//                             : entry?.status === "late"
//                             ? "destructive"
//                             : entry?.status === "half-day"
//                             ? "outline"
//                             : "secondary"
//                         }
//                       >
//                         {entry?.status || "absent"}
//                       </Badge>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// // Manual Entry Form Component
// function ManualEntryForm({ onSubmit, employees }) {
//   const [formData, setFormData] = useState({
//     employeeId: "",
//     date: new Date().toISOString().split("T")[0],
//     checkIn: "",
//     checkOut: "",
//     breakStart: "",
//     breakEnd: "",
//     status: "present",
//     notes: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     setFormData({
//       employeeId: "",
//       date: new Date().toISOString().split("T")[0],
//       checkIn: "",
//       checkOut: "",
//       breakStart: "",
//       breakEnd: "",
//       status: "present",
//       notes: "",
//     });
//   };

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="employee">Employee</Label>
//           <Select
//             value={formData.employeeId}
//             onValueChange={(value) => handleChange("employeeId", value)}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select employee" />
//             </SelectTrigger>
//             <SelectContent>
//               {employees.map((emp) => (
//                 <SelectItem key={emp.id} value={emp.id.toString()}>
//                   {emp.name} ({emp.employeeNumber})
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="date">Date</Label>
//           <Input
//             id="date"
//             type="date"
//             value={formData.date}
//             onChange={(e) => handleChange("date", e.target.value)}
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="checkIn">Check In</Label>
//           <Input
//             id="checkIn"
//             type="time"
//             value={formData.checkIn}
//             onChange={(e) => handleChange("checkIn", e.target.value)}
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="checkOut">Check Out</Label>
//           <Input
//             id="checkOut"
//             type="time"
//             value={formData.checkOut}
//             onChange={(e) => handleChange("checkOut", e.target.value)}
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="breakStart">Break Start</Label>
//           <Input
//             id="breakStart"
//             type="time"
//             value={formData.breakStart}
//             onChange={(e) => handleChange("breakStart", e.target.value)}
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="breakEnd">Break End</Label>
//           <Input
//             id="breakEnd"
//             type="time"
//             value={formData.breakEnd}
//             onChange={(e) => handleChange("breakEnd", e.target.value)}
//           />
//         </div>
//       </div>
//       <div className="space-y-2">
//         <Label htmlFor="status">Status</Label>
//         <Select
//           value={formData.status}
//           onValueChange={(value) => handleChange("status", value)}
//         >
//           <SelectTrigger>
//             <SelectValue />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="present">Present</SelectItem>
//             <SelectItem value="late">Late</SelectItem>
//             <SelectItem value="half-day">Half Day</SelectItem>
//             <SelectItem value="absent">Absent</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//       <div className="space-y-2">
//         <Label htmlFor="notes">Notes</Label>
//         <Input
//           id="notes"
//           value={formData.notes}
//           onChange={(e) => handleChange("notes", e.target.value)}
//           placeholder="Optional notes"
//         />
//       </div>
//       <div className="flex justify-end pt-4">
//         <Button type="submit">Add Entry</Button>
//       </div>
//     </form>
//   );
// }
