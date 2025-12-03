import { useQuery } from "@tanstack/react-query";
import { getParties } from "../services/services";
import { type Party } from "../types/types";

export const useParties = () => {
    return useQuery<Party[]>({
        queryKey: ["parties"],
        queryFn: getParties,
    });
};
