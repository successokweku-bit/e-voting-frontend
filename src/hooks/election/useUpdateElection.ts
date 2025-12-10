import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateElection } from "../../services/services";
import { type Election } from "../../types/types";
import { toast } from "sonner";

export const useUpdateElection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Election> }) =>
            updateElection(id, data),
        onSuccess: () => {
            toast.success("Election updated successfully");
            queryClient.invalidateQueries({ queryKey: ["elections"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to update election");
        },
    });
};
