import { createStore } from "stan-js";

import dayjs from "dayjs";

const sd = dayjs().subtract(30, "days").toDate();
const ed = dayjs().toDate();

export const { useStore: useWorklogStore, reset: resetWorklogStore } = createStore({
  worklogFilter: {
    employee_uuid: "",
    startDate: sd,
    endDate: ed,
    isViewMine: "all",
  },

  get isWorklogFilterDirty() {
    return (
      this.worklogFilter.startDate !== sd ||
      this.worklogFilter.endDate !== ed ||
      this.worklogFilter.employee_uuid !== ""
    );
  },
});
