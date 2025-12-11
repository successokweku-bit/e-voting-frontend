import { useQuery } from "@tanstack/react-query";
import { getCandidates, getDashCandidates } from "../../services/services";
import { type Candidate, type VoterCandidate } from "../../types/types";

export const useCandidates = () => {
    return useQuery<Candidate[]>({
        queryKey: ["candidates"],
        queryFn: getCandidates,
    });
};
export const useDashCandidates = (electionId: number, positionId: number) => {
    return useQuery<VoterCandidate[]>({
        queryKey: ["candidates", electionId, positionId],
        queryFn: () => getDashCandidates(electionId, positionId),
    });
};
