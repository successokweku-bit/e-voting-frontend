import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePosition } from "../services/services";
import { type Position } from "../types/types";
import { toast } from "sonner";

export const useUpdatePosition = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Position> }) =>
            updatePosition(id, data),
        onSuccess: () => {
            toast.success("Position updated successfully");
            queryClient.invalidateQueries({ queryKey: ["positions"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to update position");
        },
    });
};
