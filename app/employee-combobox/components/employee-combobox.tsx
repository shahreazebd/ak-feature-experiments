"use client";

import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { useMemo } from "react";
import {
  type EmployeeResult,
  useEmployeeListQuery,
} from "@/app/employee-combobox/hooks/use-get-employee-list";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

export type EmployeeParams = EmployeeResult & {
  value: string;
  label: string;
};

export type EmployeeComboboxProps = {
  readonly value?: string | null;
  readonly onValueChange?: (employee: EmployeeParams | null) => void;
};

export function EmployeeCombobox({
  value,
  onValueChange,
}: EmployeeComboboxProps) {
  const { data } = useEmployeeListQuery();

  const employees: EmployeeParams[] = useMemo(() => {
    return [
      ...(data?.results.map((item) => ({
        value: item.uuid,
        label: `${item.first_name} ${item.last_name}`,
        // avatar: item.avatar,
        // designation: item.designation,
        ...item,
      })) || []),
    ];
  }, [data]);

  const selectedEmployee = useMemo(() => {
    return employees.find((e) => e.value === value) ?? null;
  }, [employees, value]);

  return (
    <Combobox
      items={employees}
      value={selectedEmployee}
      onValueChange={onValueChange}
    >
      <ComboboxInput placeholder="Search" showClear />

      <ComboboxContent>
        <ComboboxEmpty>No employees found.</ComboboxEmpty>
        <ComboboxList>
          {(item: (typeof employees)[number]) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
