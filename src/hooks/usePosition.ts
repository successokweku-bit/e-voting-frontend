import { useQuery } from "@tanstack/react-query";
import { getPosition } from "../services/services";
import { type Position } from "../types/types";

export const usePosition = (id: string, enabled: boolean = true) => {
    return useQuery<Position>({
        queryKey: ["position", id],
        queryFn: () => getPosition(id),
        enabled: !!id && enabled,
    });
};
