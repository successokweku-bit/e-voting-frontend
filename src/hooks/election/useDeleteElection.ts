import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteElection } from "../../services/services";
import { toast } from "sonner";

export const useDeleteElection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteElection(id),
        onSuccess: () => {
            toast.success("Election deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["elections"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to delete election");
        },
    });
};
