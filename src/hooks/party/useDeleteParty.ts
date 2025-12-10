import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteParty } from "../../services/services";
import { toast } from "sonner";

export const useDeleteParty = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteParty(id),
        onSuccess: () => {
            toast.success("Party deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["parties"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to delete party");
        },
    });
};
