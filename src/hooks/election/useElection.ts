import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getDashActiveElections, getDashElection, getDashPastElections, getDashUpcomingElections, getElection, voteSecure, getMyVote, getElectionTracking, getElectionResults } from "../../services/services";
import { type Election, type ElectionDetails, type PublicElection } from "../../types/types";

export const useElection = (id: number, enabled: boolean = true) => {
    return useQuery<Election>({
        queryKey: ["election", id],
        queryFn: () => getElection(id),
        enabled: !!id && enabled,
    });
};

export const useDashElection = (id: number, enabled: boolean = true) => {
    return useQuery<ElectionDetails>({
        queryKey: ["dash-election", id],
        queryFn: () => getDashElection(id),
        enabled: !!id && enabled,
    });
};


export const useDashActiveElections = () => {
    return useQuery<PublicElection[]>({
        queryKey: ["dash-active-elections"],
        queryFn: () => getDashActiveElections(),
    });
};

export const useDashPastElections = () => {
    return useQuery<PublicElection[]>({
        queryKey: ["dash-past-elections"],
        queryFn: () => getDashPastElections(),
    });
};

export const useDashUpcomingElections = () => {
    return useQuery<PublicElection[]>({
        queryKey: ["dash-upcoming-elections"],
        queryFn: () => getDashUpcomingElections(),
    });
};

export const useVote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ electionId, positionId, candidateId }: { electionId: number; positionId: number; candidateId: number }) =>
            voteSecure(electionId, positionId, candidateId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dash-election"] });
        },
    });
};




export const useMyVotes = () => {
    return useQuery({
        queryKey: ["my-votes"],
        queryFn: () => getMyVote(),
        retry: false,
    });
};

export const useElectionTracking = (id: number, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["election-tracking", id],
        queryFn: () => getElectionTracking(id),
        enabled: !!id && enabled,
        refetchInterval: 30000, // Refetch every 30 seconds for live updates
    });
};

export const useElectionResults = (id: number, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["election-results", id],
        queryFn: () => getElectionResults(id),
        enabled: !!id && enabled,
    });
};
