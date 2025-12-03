import { useQuery } from "@tanstack/react-query";
import { getElections } from "../services/services";
import { type Election } from "../types/types";

export const useElections = () => {
    return useQuery<Election[]>({
        queryKey: ["elections"],
        queryFn: getElections,
    });
};
