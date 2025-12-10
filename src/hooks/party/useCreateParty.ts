import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createParty } from "../../services/services";
import { type Party } from "../../types/types";
import { toast } from "sonner";

export const useCreateParty = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Omit<Party, "id" | "created_at" | "logo_url">) => createParty(data),
        onSuccess: () => {
            toast.success("Party created successfully");
            queryClient.invalidateQueries({ queryKey: ["parties"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to create party");
        },
    });
};
