import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVoter } from "../services/services";
import { type RegisterCredentials } from "../types/types";
import { toast } from "sonner";

export const useUpdateVoter = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<RegisterCredentials> }) =>
            updateVoter(id, data),
        onSuccess: () => {
            toast.success("Voter updated successfully");
            queryClient.invalidateQueries({ queryKey: ["voters"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to update voter");
        },
    });
};
