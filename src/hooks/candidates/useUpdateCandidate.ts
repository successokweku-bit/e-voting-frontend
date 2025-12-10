import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCandidate } from "../../services/services";
import { type Candidate } from "../../types/types";
import { toast } from "sonner";

export const useUpdateCandidate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Candidate> }) =>
            updateCandidate(id, data),
        onSuccess: () => {
            toast.success("Candidate updated successfully");
            queryClient.invalidateQueries({ queryKey: ["candidates"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to update candidate");
        },
    });
};
