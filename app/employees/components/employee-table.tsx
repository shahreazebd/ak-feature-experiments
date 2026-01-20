"use client";

import { useEmployeeListQuery } from "@/app/employee-combobox/hooks/use-get-employee-list";
import { useDataTable } from "@/components/data-table/use-data-table";
import { columns } from "./columns";
import { CustomersTableToolbar } from "./customers-table-toolbar";

export function EmployeeTable() {
  const { data: employeeData, isLoading } = useEmployeeListQuery();

  const { table, render } = useDataTable({
    columns,
    data: employeeData?.results || [],
    loading: isLoading,
  });

  return (
    <div className="space-y-4">
      <CustomersTableToolbar table={table} />

      <div className="hidden md:block">{render}</div>
    </div>
  );
}
