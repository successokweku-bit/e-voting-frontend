import { useQuery } from "@tanstack/react-query";
import { getVoter } from "../services/services";
import { type User } from "../types/types";

export const useVoter = (id: string, enabled: boolean = true) => {
    return useQuery<User>({
        queryKey: ["voter", id],
        queryFn: () => getVoter(id),
        enabled: !!id && enabled,
    });
};
