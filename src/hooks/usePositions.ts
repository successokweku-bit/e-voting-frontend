import { useQuery } from "@tanstack/react-query";
import { getPositions } from "../services/services";
import { type Position } from "../types/types";

export const usePositions = () => {
    return useQuery<Position[]>({
        queryKey: ["positions"],
        queryFn: getPositions,
    });
};
