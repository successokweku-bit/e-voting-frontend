import { useQuery } from "@tanstack/react-query";
import { getCandidates } from "../services/services";
import { type Candidate } from "../types/types";

export const useCandidates = () => {
    return useQuery<Candidate[]>({
        queryKey: ["candidates"],
        queryFn: getCandidates,
    });
};
