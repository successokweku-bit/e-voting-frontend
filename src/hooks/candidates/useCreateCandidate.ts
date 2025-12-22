import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCandidate } from "../../services/services";
import { toast } from "sonner";
import type { Candidate } from "../../types/types";

export const useCreateCandidate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<Candidate>) => createCandidate(data),
        onSuccess: () => {
            toast.success("Candidate created successfully");
            queryClient.invalidateQueries({ queryKey: ["candidates"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to create candidate");
        },
    });
};
