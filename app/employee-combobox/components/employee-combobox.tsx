"use client";

import { useMemo } from "react";
import {
  type EmployeeResult,
  useEmployeeListQuery,
} from "@/app/employee-combobox/hooks/use-get-employee-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
            <ComboboxItem key={item.value} value={item} className="py-2.5">
              <div className="flex items-center gap-2">
                <Avatar className="size-8">
                  <AvatarImage src={item.avatar} alt={item.label} />
                  <AvatarFallback className="text-xs">
                    {item.first_name?.[0]}
                    {item.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium leading-none">
                    {item.label}
                  </span>
                  {item.designation && (
                    <span className="text-muted-foreground text-xs leading-none">
                      {item.designation}
                    </span>
                  )}
                </div>
              </div>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
