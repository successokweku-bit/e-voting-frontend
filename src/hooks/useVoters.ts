import { useQuery } from "@tanstack/react-query";
import { getVoters } from "../services/services";
import { type User } from "../types/types";

export const useVoters = () => {
    return useQuery<User[]>({
        queryKey: ["voters"],
        queryFn: getVoters,
    });
};
