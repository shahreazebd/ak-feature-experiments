"use client";

import { useEmployeeListQuery } from "./hooks/use-get-employee-list";

export default function EmployeeComboboxPage() {
  const { data } = useEmployeeListQuery();

  return (
    <div>
      <h1>Employee Combobox</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
