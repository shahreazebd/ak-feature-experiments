import { queryOptions, useQuery } from "@tanstack/react-query";
import { http } from "@/lib/xior";

export function getEmployeeList() {
  return http.request({
    method: "GET",
    url: "hr/api/v1/employee/",
    params: {
      ordering: "-created_at",
      simplify: "true",
      company_uuid: "0148ad01-c138-42f5-9609-01d3989e92f1",
    },
  });
}

export function getEmployeeListQueryOptions() {
  return queryOptions({
    queryKey: ["employee-list"],
    queryFn: getEmployeeList,
  });
}

export function useEmployeeListQuery() {
  return useQuery(getEmployeeListQueryOptions());
}
