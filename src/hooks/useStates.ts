import { useQuery } from "@tanstack/react-query";
import { getStates } from "../services/services";
import type { State } from "../types/types";

export const useStates = () => {
  return useQuery<State[]>({
    queryKey: ["states"],
    queryFn: getStates,
  });
};
