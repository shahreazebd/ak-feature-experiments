"use client";

import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { useMemo, useState } from "react";
import { useEmployeeListQuery } from "@/app/employee-combobox/hooks/use-get-employee-list";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import type { EmployeeResult } from "../hooks/use-get-employee-list";

export interface EmployeeComboboxProps {
  value?: string | null;
  onValueChange?: (employee: string | null) => void;
}

export function EmployeeCombobox({
  value,
  onValueChange,
}: Readonly<EmployeeComboboxProps>) {
  const [val, setVal] = useState<string | null>(value || null);
  const { data } = useEmployeeListQuery();
  const [searchValue, setSearchValue] = useState("");

  const { contains } = BaseCombobox.useFilter({ value });

  const employees = data?.results || [];

  const filteredItems = useMemo(() => {
    return employees.filter((item) =>
      contains(`${item.first_name} ${item.last_name}`, searchValue),
    );
  }, [contains, searchValue, employees]);

  // useEffect(() => {
  //   if (!val) setSearchValue("");
  // }, [val]);

  return (
    <Combobox
      items={employees}
      filteredItems={filteredItems}
      value={val}
      onValueChange={(val) => {
        console.log(val);

        setVal(val);
        if (val) onValueChange?.(val);
        // else setSearchValue("");

        const employee = employees.find((e) => e.uuid === val);
        if (employee) {
          setSearchValue(
            `${employee.first_name} ${employee.last_name}`.toLowerCase(),
          );
        }
      }}
    >
      <ComboboxInput
        placeholder="Select an employee"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        showClear
      />
      <ComboboxContent>
        <ComboboxEmpty>No employees found.</ComboboxEmpty>
        <ComboboxList>
          {(item: EmployeeResult) => (
            <ComboboxItem key={item.uuid} value={item.uuid}>
              {`${item.first_name} ${item.last_name}`}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
