import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCandidate } from "../../services/services";
import { toast } from "sonner";

export const useDeleteCandidate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteCandidate(id),
        onSuccess: () => {
            toast.success("Candidate deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["candidates"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to delete candidate");
        },
    });
};
