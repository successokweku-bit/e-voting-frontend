import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCandidate } from "../../services/services";
import { toast } from "sonner";

export const useCreateCandidate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: FormData) => createCandidate(data),
        onSuccess: () => {
            toast.success("Candidate created successfully");
            queryClient.invalidateQueries({ queryKey: ["candidates"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to create candidate");
        },
    });
};
