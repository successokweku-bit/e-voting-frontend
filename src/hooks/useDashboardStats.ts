import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../services/services";
import { type DashboardStats } from "../types/types";

export const useDashboardStats = () => {
  return useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
  });
};
