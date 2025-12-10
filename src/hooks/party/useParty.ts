import { useQuery } from "@tanstack/react-query";
import { getParty } from "@/services/partyService";
import type { Party } from "@/types/types";

export const useParty = (id: string | number, enabled: boolean = true) => {
    return useQuery<Party>({
        queryKey: ["party", id],
        queryFn: () => getParty(String(id)),
        enabled: !!id && enabled,
    });
};
