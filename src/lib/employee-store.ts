import { create } from "zustand";

export interface EmployeeDocument {
  id: number;
  name: string;
  type: "Contract" | "Proof" | "Other";
  url: string;
  uploadDate: string;
  size: string;
}

export interface Employee {
  id: number;
  employeeNumber: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  salary: number;
  startDate: string;
  status: "Active" | "Inactive";
  employmentType: "Full-time" | "Part-time" | "Contract" | "Probation";
  probationPeriod: {
    isOnProbation: boolean;
    startDate: string;
    endDate: string;
    duration: number; // in months
  };
  location: string;
  avatar: string;
  bio: string;
  // Personal Information
  dateOfBirth: string;
  gender: "Male" | "Female" | "Other" | "Prefer not to say";
  maritalStatus: "Single" | "Married" | "Divorced" | "Widowed";
  nationality: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  // Identification
  nationalId: string;
  passportNumber: string;
  drivingLicense: string;
  socialSecurityNumber: string;
  // Banking Information
  bankName: string;
  bankAccount: string;
  routingNumber: string;
  accountType: "Checking" | "Savings";
  // Emergency Contact
  emergencyContact: string;
  emergencyPhone: string;
  emergencyRelationship: string;
  emergencyAddress: string;
  // Work Information
  workSchedule: string;
  manager: string;
  skills: string[];
  education: string;
  experience: string;
  // Documents
  documents: EmployeeDocument[];
  // Audit Trail
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface EditHistory {
  id: number;
  employeeId: number;
  employeeName: string;
  action: "created" | "updated" | "status_changed";
  changes: Record<string, { from: any; to: any }>;
  timestamp: string;
  updatedBy: string;
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    employeeNumber: "EMP001",
    name: "Nguyễn Văn A",
    email: "nguyenvana@company.com",
    phone: "+1 (555) 123-4567",
    position: "Lập trình viên",
    department: "Kỹ thuật",
    salary: 95000,
    startDate: "2022-03-15",
    status: "Active",
    employmentType: "Contract",
    probationPeriod: {
      isOnProbation: false,
      startDate: "2022-03-15",
      endDate: "2022-09-15",
      duration: 6,
    },
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Experienced full-stack developer with expertise in React and Node.js",
    dateOfBirth: "1990-05-15",
    gender: "Female",
    maritalStatus: "Single",
    nationality: "Việt Nam",
    address: "123 Tech Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "Việt Nam",
    nationalId: "123-45-6789",
    passportNumber: "US123456789",
    drivingLicense: "CA-DL-123456",
    socialSecurityNumber: "123-45-6789",
    bankName: "Chase Bank",
    bankAccount: "****1234",
    routingNumber: "021000021",
    accountType: "Checking",
    emergencyContact: "John Johnson",
    emergencyPhone: "+1 (555) 123-4568",
    emergencyRelationship: "Brother",
    emergencyAddress: "456 Family Ave, San Francisco, CA",
    workSchedule: "9:00 AM - 5:00 PM",
    manager: "Tech Lead",
    skills: ["React", "Node.js", "TypeScript", "Python"],
    education: "BS Computer Science",
    experience: "5 years",
    documents: [
      {
        id: 1,
        name: "Resume_Sarah_Johnson.pdf",
        type: "Contract",
        url: "/documents/resume_sarah.pdf",
        uploadDate: "2022-03-10",
        size: "245 KB",
      },
      {
        id: 2,
        name: "Employment_Contract.pdf",
        type: "Proof",
        url: "/documents/contract_sarah.pdf",
        uploadDate: "2022-03-15",
        size: "1.2 MB",
      },
    ],
    createdAt: "2022-03-15T09:00:00Z",
    updatedAt: "2024-01-05T14:30:00Z",
    createdBy: "HR Admin",
    updatedBy: "HR Admin",
  },
  {
    id: 2,
    employeeNumber: "EMP002",
    name: "Nguyễn Văn B",
    email: "nguyenvanb@company.com",
    phone: "+1 (555) 234-5678",
    position: "Quản lý sản phẩm",
    department: "Sản phẩm",
    salary: 110000,
    startDate: "2021-08-22",
    status: "Active",
    employmentType: "Contract",
    probationPeriod: {
      isOnProbation: false,
      startDate: "2021-08-22",
      endDate: "2022-02-22",
      duration: 6,
    },
    location: "New York, NY",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Strategic product leader with 8+ years of experience in tech startups",
    dateOfBirth: "1988-12-03",
    gender: "Male",
    maritalStatus: "Married",
    nationality: "Việt Nam",
    address: "456 Business Ave",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "Việt Nam",
    nationalId: "987-65-4321",
    passportNumber: "US987654321",
    drivingLicense: "NY-DL-987654",
    socialSecurityNumber: "987-65-4321",
    bankName: "Bank of America",
    bankAccount: "****5678",
    routingNumber: "026009593",
    accountType: "Checking",
    emergencyContact: "Lisa Chen",
    emergencyPhone: "+1 (555) 234-5679",
    emergencyRelationship: "Spouse",
    emergencyAddress: "456 Business Ave, New York, NY",
    workSchedule: "9:00 AM - 6:00 PM",
    manager: "VP Product",
    skills: ["Product Strategy", "Analytics", "Leadership", "Agile"],
    education: "MBA Business Administration",
    experience: "8 years",
    documents: [],
    createdAt: "2021-08-22T09:00:00Z",
    updatedAt: "2024-01-05T14:30:00Z",
    createdBy: "HR Admin",
    updatedBy: "HR Admin",
  },
  {
    id: 3,
    employeeNumber: "EMP003",
    name: "Nguyễn Văn C",
    email: "nguyenvanc@company.com",
    phone: "+1 (555) 345-6789",
    position: "Thiết kế",
    department: "Thiết kế",
    salary: 78000,
    startDate: "2024-01-10",
    status: "Active",
    employmentType: "Full-time",
    probationPeriod: {
      isOnProbation: true,
      startDate: "2024-01-10",
      endDate: "2024-07-10",
      duration: 6,
    },
    location: "Austin, TX",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Creative designer passionate about user-centered design and accessibility",
    dateOfBirth: "1992-08-20",
    gender: "Female",
    maritalStatus: "Single",
    nationality: "Việt Nam",
    address: "789 Design Lane",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    country: "Việt Nam",
    nationalId: "456-78-9012",
    passportNumber: "MX456789012",
    drivingLicense: "TX-DL-456789",
    socialSecurityNumber: "456-78-9012",
    bankName: "Wells Fargo",
    bankAccount: "****9012",
    routingNumber: "121000248",
    accountType: "Checking",
    emergencyContact: "Carlos Rodriguez",
    emergencyPhone: "+1 (555) 345-6790",
    emergencyRelationship: "Father",
    emergencyAddress: "789 Design Lane, Austin, TX",
    workSchedule: "10:00 AM - 6:00 PM",
    manager: "Design Director",
    skills: ["Figma", "User Research", "Prototyping", "Accessibility"],
    education: "BFA Graphic Design",
    experience: "3 years",
    documents: [],
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-10T09:00:00Z",
    createdBy: "HR Admin",
    updatedBy: "HR Admin",
  },
  {
    id: 4,
    employeeNumber: "EMP004",
    name: "Nguyễn Văn D",
    email: "nguyenvand@company.com",
    phone: "+1 (555) 456-7890",
    position: "Lập trình viên",
    department: "Kỹ thuật",
    salary: 95000,
    startDate: "2022-03-15",
    status: "Active",
    employmentType: "Contract",
    probationPeriod: {
      isOnProbation: false,
      startDate: "2022-03-15",
      endDate: "2022-09-15",
      duration: 6,
    },
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Experienced full-stack developer with expertise in React and Node.js",
    dateOfBirth: "1990-05-15",
    gender: "Female",
    maritalStatus: "Single",
    nationality: "Việt Nam",
    address: "123 Tech Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "Việt Nam",
    nationalId: "123-45-6789",
    passportNumber: "US123456789",
    drivingLicense: "CA-DL-123456",
    socialSecurityNumber: "123-45-6789",
    bankName: "Chase Bank",
    bankAccount: "****1234",
    routingNumber: "021000021",
    accountType: "Checking",
    emergencyContact: "John Johnson",
    emergencyPhone: "+1 (555) 123-4568",
    emergencyRelationship: "Brother",
    emergencyAddress: "456 Family Ave, San Francisco, CA",
    workSchedule: "9:00 AM - 5:00 PM",
    manager: "Tech Lead",
    skills: ["React", "Node.js", "TypeScript", "Python"],
    education: "BS Computer Science",
    experience: "5 years",
    documents: [],
    createdAt: "2022-03-15T09:00:00Z",
    updatedAt: "2024-01-05T14:30:00Z",
    createdBy: "HR Admin",
    updatedBy: "HR Admin",
  },
  {
    id: 5,
    employeeNumber: "EMP005",
    name: "Nguyễn Văn E",
    email: "nguyenvand@company.com",
    phone: "+1 (555) 456-7890",
    position: "Lập trình viên",
    department: "Kỹ thuật",
    salary: 95000,
    startDate: "2022-03-15",
    status: "Active",
    employmentType: "Contract",
    probationPeriod: {
      isOnProbation: false,
      startDate: "2022-03-15",
      endDate: "2022-09-15",
      duration: 6,
    },
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Experienced full-stack developer with expertise in React and Node.js",
    dateOfBirth: "1990-05-15",
    gender: "Female",
    maritalStatus: "Single",
    nationality: "Việt Nam",
    address: "123 Tech Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "Việt Nam",
    nationalId: "123-45-6789",
    passportNumber: "US123456789",
    drivingLicense: "CA-DL-123456",
    socialSecurityNumber: "123-45-6789",
    bankName: "Chase Bank",
    bankAccount: "****1234",
    routingNumber: "021000021",
    accountType: "Checking",
    emergencyContact: "John Johnson",
    emergencyPhone: "+1 (555) 123-4568",
    emergencyRelationship: "Brother",
    emergencyAddress: "456 Family Ave, San Francisco, CA",
    workSchedule: "9:00 AM - 5:00 PM",
    manager: "Tech Lead",
    skills: ["React", "Node.js", "TypeScript", "Python"],
    education: "BS Computer Science",
    experience: "5 years",
    documents: [],
    createdAt: "2022-03-15T09:00:00Z",
    updatedAt: "2024-01-05T14:30:00Z",
    createdBy: "HR Admin",
    updatedBy: "HR Admin",
  },
  {
    id: 6,
    employeeNumber: "EMP006",
    name: "Nguyễn Văn F",
    email: "nguyenvand@company.com",
    phone: "+1 (555) 456-7890",
    position: "Lập trình viên",
    department: "Kỹ thuật",
    salary: 95000,
    startDate: "2022-03-15",
    status: "Active",
    employmentType: "Contract",
    probationPeriod: {
      isOnProbation: false,
      startDate: "2022-03-15",
      endDate: "2022-09-15",
      duration: 6,
    },
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Experienced full-stack developer with expertise in React and Node.js",
    dateOfBirth: "1990-05-15",
    gender: "Female",
    maritalStatus: "Single",
    nationality: "Việt Nam",
    address: "123 Tech Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "Việt Nam",
    nationalId: "123-45-6789",
    passportNumber: "US123456789",
    drivingLicense: "CA-DL-123456",
    socialSecurityNumber: "123-45-6789",
    bankName: "Chase Bank",
    bankAccount: "****1234",
    routingNumber: "021000021",
    accountType: "Checking",
    emergencyContact: "John Johnson",
    emergencyPhone: "+1 (555) 123-4568",
    emergencyRelationship: "Brother",
    emergencyAddress: "456 Family Ave, San Francisco, CA",
    workSchedule: "9:00 AM - 5:00 PM",
    manager: "Tech Lead",
    skills: ["React", "Node.js", "TypeScript", "Python"],
    education: "BS Computer Science",
    experience: "5 years",
    documents: [],
    createdAt: "2022-03-15T09:00:00Z",
    updatedAt: "2024-01-05T14:30:00Z",
    createdBy: "HR Admin",
    updatedBy: "HR Admin",
  },
  {
    id: 7,
    employeeNumber: "EMP007",
    name: "Nguyễn Văn G",
    email: "nguyenvand@company.com",
    phone: "+1 (555) 456-7890",
    position: "Lập trình viên",
    department: "Kỹ thuật",
    salary: 95000,
    startDate: "2022-03-15",
    status: "Active",
    employmentType: "Contract",
    probationPeriod: {
      isOnProbation: false,
      startDate: "2022-03-15",
      endDate: "2022-09-15",
      duration: 6,
    },
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Experienced full-stack developer with expertise in React and Node.js",
    dateOfBirth: "1990-05-15",
    gender: "Female",
    maritalStatus: "Single",
    nationality: "Việt Nam",
    address: "123 Tech Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "Việt Nam",
    nationalId: "123-45-6789",
    passportNumber: "US123456789",
    drivingLicense: "CA-DL-123456",
    socialSecurityNumber: "123-45-6789",
    bankName: "Chase Bank",
    bankAccount: "****1234",
    routingNumber: "021000021",
    accountType: "Checking",
    emergencyContact: "John Johnson",
    emergencyPhone: "+1 (555) 123-4568",
    emergencyRelationship: "Brother",
    emergencyAddress: "456 Family Ave, San Francisco, CA",
    workSchedule: "9:00 AM - 5:00 PM",
    manager: "Tech Lead",
    skills: ["React", "Node.js", "TypeScript", "Python"],
    education: "BS Computer Science",
    experience: "5 years",
    documents: [],
    createdAt: "2022-03-15T09:00:00Z",
    updatedAt: "2024-01-05T14:30:00Z",
    createdBy: "HR Admin",
    updatedBy: "HR Admin",
  },
  {
    id: 8,
    employeeNumber: "EMP008",
    name: "Nguyễn Văn H",
    email: "nguyenvand@company.com",
    phone: "+1 (555) 456-7890",
    position: "Lập trình viên",
    department: "Kỹ thuật",
    salary: 95000,
    startDate: "2022-03-15",
    status: "Active",
    employmentType: "Contract",
    probationPeriod: {
      isOnProbation: false,
      startDate: "2022-03-15",
      endDate: "2022-09-15",
      duration: 6,
    },
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Experienced full-stack developer with expertise in React and Node.js",
    dateOfBirth: "1990-05-15",
    gender: "Female",
    maritalStatus: "Single",
    nationality: "Việt Nam",
    address: "123 Tech Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "Việt Nam",
    nationalId: "123-45-6789",
    passportNumber: "US123456789",
    drivingLicense: "CA-DL-123456",
    socialSecurityNumber: "123-45-6789",
    bankName: "Chase Bank",
    bankAccount: "****1234",
    routingNumber: "021000021",
    accountType: "Checking",
    emergencyContact: "John Johnson",
    emergencyPhone: "+1 (555) 123-4568",
    emergencyRelationship: "Brother",
    emergencyAddress: "456 Family Ave, San Francisco, CA",
    workSchedule: "9:00 AM - 5:00 PM",
    manager: "Tech Lead",
    skills: ["React", "Node.js", "TypeScript", "Python"],
    education: "BS Computer Science",
    experience: "5 years",
    documents: [],
    createdAt: "2022-03-15T09:00:00Z",
    updatedAt: "2024-01-05T14:30:00Z",
    createdBy: "HR Admin",
    updatedBy: "HR Admin",
  },
  {
    id: 9,
    employeeNumber: "EMP009",
    name: "Nguyễn Văn I",
    email: "nguyenvand@company.com",
    phone: "+1 (555) 456-7890",
    position: "Lập trình viên",
    department: "Kỹ thuật",
    salary: 95000,
    startDate: "2022-03-15",
    status: "Active",
    employmentType: "Contract",
    probationPeriod: {
      isOnProbation: false,
      startDate: "2022-03-15",
      endDate: "2022-09-15",
      duration: 6,
    },
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Experienced full-stack developer with expertise in React and Node.js",
    dateOfBirth: "1990-05-15",
    gender: "Female",
    maritalStatus: "Single",
    nationality: "Việt Nam",
    address: "123 Tech Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "Việt Nam",
    nationalId: "123-45-6789",
    passportNumber: "US123456789",
    drivingLicense: "CA-DL-123456",
    socialSecurityNumber: "123-45-6789",
    bankName: "Chase Bank",
    bankAccount: "****1234",
    routingNumber: "021000021",
    accountType: "Checking",
    emergencyContact: "John Johnson",
    emergencyPhone: "+1 (555) 123-4568",
    emergencyRelationship: "Brother",
    emergencyAddress: "456 Family Ave, San Francisco, CA",
    workSchedule: "9:00 AM - 5:00 PM",
    manager: "Tech Lead",
    skills: ["React", "Node.js", "TypeScript", "Python"],
    education: "BS Computer Science",
    experience: "5 years",
    documents: [],
    createdAt: "2022-03-15T09:00:00Z",
    updatedAt: "2024-01-05T14:30:00Z",
    createdBy: "HR Admin",
    updatedBy: "HR Admin",
  },
  {
    id: 10,
    employeeNumber: "EMP010",
    name: "Nguyễn Văn J",
    email: "nguyenvand@company.com",
    phone: "+1 (555) 456-7890",
    position: "Lập trình viên",
    department: "Kỹ thuật",
    salary: 95000,
    startDate: "2022-03-15",
    status: "Active",
    employmentType: "Contract",
    probationPeriod: {
      isOnProbation: false,
      startDate: "2022-03-15",
      endDate: "2022-09-15",
      duration: 6,
    },
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Experienced full-stack developer with expertise in React and Node.js",
    dateOfBirth: "1990-05-15",
    gender: "Female",
    maritalStatus: "Single",
    nationality: "Việt Nam",
    address: "123 Tech Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "Việt Nam",
    nationalId: "123-45-6789",
    passportNumber: "US123456789",
    drivingLicense: "CA-DL-123456",
    socialSecurityNumber: "123-45-6789",
    bankName: "Chase Bank",
    bankAccount: "****1234",
    routingNumber: "021000021",
    accountType: "Checking",
    emergencyContact: "John Johnson",
    emergencyPhone: "+1 (555) 123-4568",
    emergencyRelationship: "Brother",
    emergencyAddress: "456 Family Ave, San Francisco, CA",
    workSchedule: "9:00 AM - 5:00 PM",
    manager: "Tech Lead",
    skills: ["React", "Node.js", "TypeScript", "Python"],
    education: "BS Computer Science",
    experience: "5 years",
    documents: [],
    createdAt: "2022-03-15T09:00:00Z",
    updatedAt: "2024-01-05T14:30:00Z",
    createdBy: "HR Admin",
    updatedBy: "HR Admin",
  },
];

const initialEditHistory: EditHistory[] = [
  {
    id: 1,
    employeeId: 1,
    employeeName: "Sarah Johnson",
    action: "created",
    changes: {},
    timestamp: "2022-03-15T09:00:00Z",
    updatedBy: "HR Admin",
  },
  {
    id: 2,
    employeeId: 1,
    employeeName: "Sarah Johnson",
    action: "updated",
    changes: {
      salary: { from: 90000, to: 95000 },
      position: { from: "Software Engineer", to: "Senior Software Engineer" },
    },
    timestamp: "2024-01-05T14:30:00Z",
    updatedBy: "HR Admin",
  },
];

export const departments = [
  "Kỹ thuật",
  "Sản phẩm",
  "Thiết kế",
  "Phân tích",
  "Marketing",
  "Nhân sự",
  "Tài chính",
  "Kinh doanh",
];
export const positions = [
  "Lập trình viên",
  "Quản lý sản phẩm",
  "Thiết kế",
  "Phân tích",
  "Quản lý marketing",
  "Quản lý DevOps",
  "Quản lý nhân sự",
  "Quản lý tài chính",
  "Quản lý kinh doanh",
];

interface EmployeeStore {
  employees: Employee[];
  editHistory: EditHistory[];
  addEmployee: (
    employee: Omit<
      Employee,
      "id" | "employeeNumber" | "createdAt" | "updatedAt" | "documents"
    >
  ) => void;
  updateEmployee: (
    id: number,
    employee: Partial<Employee>,
    updatedBy: string
  ) => void;
  toggleEmployeeStatus: (id: number, updatedBy: string) => void;
  getEmployeeById: (id: number) => Employee | undefined;
  addDocument: (
    employeeId: number,
    document: Omit<EmployeeDocument, "id">
  ) => void;
  removeDocument: (employeeId: number, documentId: number) => void;
  getEditHistory: () => EditHistory[];
  getEditHistoryByEmployee: (employeeId: number) => EditHistory[];
}

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  employees: initialEmployees,
  editHistory: initialEditHistory,

  addEmployee: (employee) =>
    set((state) => {
      const newId = Math.max(...state.employees.map((e) => e.id)) + 1;
      // Use provided employeeNumber or generate one if not provided
      const employeeNumber = `EMP${newId.toString().padStart(3, "0")}`;
      const now = new Date().toISOString();

      const newEmployee: Employee = {
        ...employee,
        id: newId,
        employeeNumber,
        avatar: "/placeholder.svg?height=40&width=40",
        documents: [],
        createdAt: now,
        updatedAt: now,
      };

      const historyEntry: EditHistory = {
        id: Math.max(...state.editHistory.map((h) => h.id), 0) + 1,
        employeeId: newId,
        employeeName: employee.name,
        action: "created",
        changes: {},
        timestamp: now,
        updatedBy: employee.createdBy,
      };

      return {
        employees: [...state.employees, newEmployee],
        editHistory: [...state.editHistory, historyEntry],
      };
    }),

  updateEmployee: (id, updatedEmployee, updatedBy) =>
    set((state) => {
      const existingEmployee = state.employees.find((emp) => emp.id === id);
      if (!existingEmployee) return state;

      const changes: Record<string, { from: any; to: any }> = {};
      Object.keys(updatedEmployee).forEach((key) => {
        if (key !== "updatedAt" && key !== "updatedBy") {
          const oldValue = existingEmployee[key as keyof Employee];
          const newValue = updatedEmployee[key as keyof Employee];
          if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
            changes[key] = { from: oldValue, to: newValue };
          }
        }
      });

      const now = new Date().toISOString();
      const historyEntry: EditHistory = {
        id: Math.max(...state.editHistory.map((h) => h.id), 0) + 1,
        employeeId: id,
        employeeName: existingEmployee.name,
        action: "updated",
        changes,
        timestamp: now,
        updatedBy,
      };

      return {
        employees: state.employees.map((emp) =>
          emp.id === id
            ? { ...emp, ...updatedEmployee, updatedAt: now, updatedBy }
            : emp
        ),
        editHistory:
          Object.keys(changes).length > 0
            ? [...state.editHistory, historyEntry]
            : state.editHistory,
      };
    }),

  toggleEmployeeStatus: (id, updatedBy) =>
    set((state) => {
      const employee = state.employees.find((emp) => emp.id === id);
      if (!employee) return state;

      const newStatus = employee.status === "Active" ? "Inactive" : "Active";
      const now = new Date().toISOString();

      const historyEntry: EditHistory = {
        id: Math.max(...state.editHistory.map((h) => h.id), 0) + 1,
        employeeId: id,
        employeeName: employee.name,
        action: "status_changed",
        changes: {
          status: { from: employee.status, to: newStatus },
        },
        timestamp: now,
        updatedBy,
      };

      return {
        employees: state.employees.map((emp) =>
          emp.id === id
            ? { ...emp, status: newStatus, updatedAt: now, updatedBy }
            : emp
        ),
        editHistory: [...state.editHistory, historyEntry],
      };
    }),

  getEmployeeById: (id) => get().employees.find((emp) => emp.id === id),

  addDocument: (employeeId, document) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === employeeId
          ? {
              ...emp,
              documents: [
                ...emp.documents,
                {
                  ...document,
                  id: Math.max(...emp.documents.map((d) => d.id), 0) + 1,
                },
              ],
            }
          : emp
      ),
    })),

  removeDocument: (employeeId, documentId) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === employeeId
          ? {
              ...emp,
              documents: emp.documents.filter((doc) => doc.id !== documentId),
            }
          : emp
      ),
    })),

  getEditHistory: () =>
    get().editHistory.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ),

  getEditHistoryByEmployee: (employeeId) =>
    get()
      .editHistory.filter((entry) => entry.employeeId === employeeId)
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
}));
