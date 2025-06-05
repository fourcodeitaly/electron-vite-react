import { Employee, Department } from "../type/employee";

// Mock data
const mockEmployees: Employee[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1 234 567 890",
    department: "Engineering",
    position: "Senior Developer",
    hireDate: "2020-01-15",
    salary: 85000,
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@company.com",
    phone: "+1 234 567 891",
    department: "Marketing",
    position: "Marketing Manager",
    hireDate: "2019-06-01",
    salary: 95000,
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
];

const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Engineering",
    description: "Software development and IT operations",
    managerId: "1",
  },
  {
    id: "2",
    name: "Marketing",
    description: "Marketing and communications",
    managerId: "2",
  },
];

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const employeeService = {
  async getEmployees(): Promise<Employee[]> {
    await delay(500);
    return [...mockEmployees];
  },

  async getEmployee(id: string): Promise<Employee | undefined> {
    await delay(300);
    return mockEmployees.find((emp) => emp.id === id);
  },

  async addEmployee(employee: Omit<Employee, "id">): Promise<Employee> {
    await delay(500);
    const newEmployee = {
      ...employee,
      id: Math.random().toString(36).substr(2, 9),
    };
    mockEmployees.push(newEmployee);
    return newEmployee;
  },

  async updateEmployee(
    id: string,
    employee: Partial<Employee>
  ): Promise<Employee | undefined> {
    await delay(500);
    const index = mockEmployees.findIndex((emp) => emp.id === id);
    if (index === -1) return undefined;

    mockEmployees[index] = { ...mockEmployees[index], ...employee };
    return mockEmployees[index];
  },

  async deleteEmployee(id: string): Promise<boolean> {
    await delay(500);
    const index = mockEmployees.findIndex((emp) => emp.id === id);
    if (index === -1) return false;

    mockEmployees.splice(index, 1);
    return true;
  },

  async getDepartments(): Promise<Department[]> {
    await delay(300);
    return [...mockDepartments];
  },
};
