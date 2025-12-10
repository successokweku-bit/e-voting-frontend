import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVoter } from "../../services/services";
import { toast } from "sonner";

export const useDeleteVoter = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteVoter(id),
        onSuccess: () => {
            toast.success("Voter deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["voters"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to delete voter");
        },
    });
};
