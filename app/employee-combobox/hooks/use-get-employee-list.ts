import { queryOptions, useQuery } from "@tanstack/react-query";
import { http } from "@/lib/xior";

export type EmployeeListResponse = {
  success: boolean;
  total: number;
  current_page: number;
  last_page: number;
  limit: number;
  has_next: boolean;
  has_previous: boolean;
  results: EmployeeResult[];
};

export type EmployeeResult = {
  uuid: string;
  first_name: string;
  last_name: string;
  avatar: string;
  designation: null | string;
};

export function getEmployeeList() {
  return http
    .request<EmployeeListResponse>({
      method: "GET",
      url: "/hr/api/v1/employee/",
      params: {
        ordering: "-created_at",
        simplify: "true",
        company_uuid: "0148ad01-c138-42f5-9609-01d3989e92f1",
        limit: 10_000,
      },
    })
    .then((res) => res.data);
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
