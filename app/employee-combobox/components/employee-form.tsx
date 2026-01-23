"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod/v3";

import { Button } from "@/components/ui/button";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { EmployeeCombobox } from "./employee-combobox";

const formSchema = z.object({
  employee: z
    .string()
    .min(1, "Please select an employee.")
    .refine((val) => val !== "auto", {
      message:
        "Auto-detection is not allowed. Please select a specific employee.",
    }),
});

export function EmployeeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <form id="form-rhf-select" onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="employee"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field orientation="responsive" data-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor="form-rhf-select-language">
                Employee
              </FieldLabel>
              <FieldDescription>
                For best results, select the employee.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>
            <EmployeeCombobox
              value={field.value}
              onValueChange={(employee) => {
                field.onChange(employee?.value);
              }}
            />
          </Field>
        )}
      />

      <Field orientation="horizontal" className="mt-4">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>

        <Button
          variant="secondary"
          type="submit"
          form="form-rhf-select"
          onClick={() => console.log(form.getValues())}
        >
          Save
        </Button>
      </Field>
    </form>
  );
}
