import type { Metadata } from "next";
import { EmployeeTable } from "./components/employee-table";

export const metadata: Metadata = {
  title: "Employees",
  description: "Manage your employees",
};

export default async function EmployeesPage() {
  return (
    <div className="max-w-7xl mx-auto mt-10">
      <EmployeeTable />
    </div>
  );
}
