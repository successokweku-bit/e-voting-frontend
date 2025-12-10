import { getParties } from "@/services/partyService";
import type { Party } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
 

export const useParties = () => {
    return useQuery<Party[]>({
        queryKey: ["parties"],
        queryFn: getParties,
    });
};
