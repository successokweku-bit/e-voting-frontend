import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPosition } from "../../services/services";
import { type Position } from "../../types/types";
import { toast } from "sonner";

export const useCreatePosition = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Omit<Position, "position_id">) => createPosition(data),
        onSuccess: () => {
            toast.success("Position created successfully");
            queryClient.invalidateQueries({ queryKey: ["positions"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to create position");
        },
    });
};
