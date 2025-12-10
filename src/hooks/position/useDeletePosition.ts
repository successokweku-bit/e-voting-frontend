import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePosition } from "../../services/services";
import { toast } from "sonner";

export const useDeletePosition = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deletePosition(id),
        onSuccess: () => {
            toast.success("Position deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["positions"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to delete position");
        },
    });
};
