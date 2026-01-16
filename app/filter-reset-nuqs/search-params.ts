import dayjs from "dayjs";
import { useQueryStates } from "nuqs";
import { parseAsIsoDate, parseAsString } from "nuqs/server";

const sd = dayjs().subtract(30, "days").toDate();
const ed = dayjs().toDate();

export const _worklogSearchParams = {
  employeeUuid: parseAsString.withDefault(""),
  startDate: parseAsIsoDate.withDefault(sd),
  endDate: parseAsIsoDate.withDefault(ed),
};

export function useWorklogSearchParams() {
  const [worklogSearchParams, setWorklogSearchParams] =
    useQueryStates(_worklogSearchParams);

  //   const isWorklogFilterDirty =
  //     worklogSearchParams.employeeUuid !==
  //       _worklogSearchParams.employeeUuid.defaultValue ||
  //     !dayjs(worklogSearchParams.startDate).isSame(
  //       _worklogSearchParams.startDate.defaultValue,
  //     ) ||
  //     !dayjs(worklogSearchParams.endDate).isSame(
  //       _worklogSearchParams.endDate.defaultValue,
  //     );

  const isWorklogFilterDirty =
    worklogSearchParams.employeeUuid !== "" ||
    worklogSearchParams.startDate.getTime() !== sd.getTime() ||
    worklogSearchParams.endDate.getTime() !== ed.getTime();

  return {
    worklogSearchParams,
    setWorklogSearchParams,
    isWorklogFilterDirty,
  };
}
