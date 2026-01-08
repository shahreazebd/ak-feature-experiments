"use client";

import { useWorklogStore, resetWorklogStore } from "@/stores/store";

export function Home() {
  const { worklogFilter, setWorklogFilter, isWorklogFilterDirty } = useWorklogStore();

  return (
    <div className="min-h-screen flex flex-col gap-2 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>
        {isWorklogFilterDirty && (
          <button type="button" onClick={() => resetWorklogStore()}>
            Reset
          </button>
        )}
      </div>

      <div>
        <pre>{JSON.stringify(worklogFilter, null, 2)}</pre>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setWorklogFilter((prev) => ({ ...prev, employee_uuid: "123" }))}
        >
          update employee uuid
        </button>
        <button
          type="button"
          onClick={() => setWorklogFilter((prev) => ({ ...prev, startDate: new Date() }))}
        >
          update startDate
        </button>
        <button
          type="button"
          onClick={() => setWorklogFilter((prev) => ({ ...prev, endDate: new Date() }))}
        >
          update endDate
        </button>
      </div>
    </div>
  );
}
