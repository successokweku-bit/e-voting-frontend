import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createElection } from "../../services/services";
import { type Election } from "../../types/types";
import { toast } from "sonner";

export const useCreateElection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Omit<Election, "election_id" | "created_at" | "position_count">) => createElection(data),
        onSuccess: () => {
            toast.success("Election created successfully");
            queryClient.invalidateQueries({ queryKey: ["elections"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to create election");
        },
    });
};
