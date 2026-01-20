"use client";

import { Suspense } from "react";
import { FilterResetNuqs } from "./filter-reset-nuqs";

export default function FilterResetStanJsPage() {
  return (
    <div className="min-h-screen flex flex-col gap-2 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Suspense fallback={<div>Loading...</div>}>
        <FilterResetNuqs />
      </Suspense>
    </div>
  );
}
