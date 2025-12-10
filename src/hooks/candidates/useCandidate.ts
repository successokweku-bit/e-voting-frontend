import { useQuery } from "@tanstack/react-query";
import { getCandidate } from "../../services/services";
import { type Candidate } from "../../types/types";

export const useCandidate = (id: number, enabled: boolean = true) => {
    return useQuery<Candidate>({
        queryKey: ["candidate", id],
        queryFn: () => getCandidate(id),
        enabled: !!id && enabled,
    });
};
