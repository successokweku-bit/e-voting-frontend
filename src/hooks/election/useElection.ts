import { useQuery } from "@tanstack/react-query";
import { getElection } from "../../services/services";
import { type Election } from "../../types/types";

export const useElection = (id: number, enabled: boolean = true) => {
    return useQuery<Election>({
        queryKey: ["election", id],
        queryFn: () => getElection(id),
        enabled: !!id && enabled,
    });
};
