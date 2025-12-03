import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateParty } from "../services/services";
import { type Party } from "../types/types";
import { toast } from "sonner";

export const useUpdateParty = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: Partial<Party> }) =>
            updateParty(String(id), data),
        onSuccess: () => {
            toast.success("Party updated successfully");
            queryClient.invalidateQueries({ queryKey: ["parties"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to update party");
        },
    });
};
