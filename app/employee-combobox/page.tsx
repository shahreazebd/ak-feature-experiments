"use client";

import { useState } from "react";
import { EmployeeCombobox } from "./components/employee-combobox";
import { EmployeeForm } from "./components/employee-form";

export default function EmployeeComboboxPage() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    "83eff0b6-f6a1-4ec7-9036-486d34808d83",
  );

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="mb-4 text-xl font-bold">Employee Combobox</h1>

      <div className="mb-8 space-y-4">
        <h2 className="text-lg font-semibold">
          Controlled Component (ID: {selectedEmployeeId})
        </h2>
        <EmployeeCombobox
          value={selectedEmployeeId}
          onValueChange={(employee) => {
            console.log("Selected Employee:", employee);
            setSelectedEmployeeId(employee?.value || null);
          }}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold">Form with Combobox</h2>
        <EmployeeForm />
      </div>

      {/* <ComboboxExample /> */}
    </div>
  );
}
