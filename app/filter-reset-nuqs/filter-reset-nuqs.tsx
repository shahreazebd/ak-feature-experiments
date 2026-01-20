"use client";

import dayjs from "dayjs";
import { useWorklogSearchParams } from "./search-params";

export function FilterResetNuqs() {
  const { worklogSearchParams, setWorklogSearchParams, isWorklogFilterDirty } =
    useWorklogSearchParams();

  return (
    <div>
      <div>
        {isWorklogFilterDirty && (
          <button type="button" onClick={() => setWorklogSearchParams(null)}>
            Reset
          </button>
        )}
      </div>

      <div>
        <pre>{JSON.stringify(worklogSearchParams, null, 2)}</pre>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() =>
            setWorklogSearchParams((prev) => ({ ...prev, employeeUuid: "123" }))
          }
        >
          update employee uuid
        </button>
        <button
          type="button"
          onClick={() =>
            setWorklogSearchParams((prev) => ({
              ...prev,
              startDate: dayjs().add(1, "day").toDate(),
            }))
          }
        >
          update startDate
        </button>
        <button
          type="button"
          onClick={() =>
            setWorklogSearchParams((prev) => ({
              ...prev,
              endDate: dayjs().add(5, "day").toDate(),
            }))
          }
        >
          update endDate
        </button>
      </div>
    </div>
  );
}
