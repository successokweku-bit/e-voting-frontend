import { QueryClient, useMutation } from "@tanstack/react-query";
import { registerService } from "../../services/services";
import type { RegisterCredentials } from "../../types/types";
import { toast } from "sonner";

export const useRegisterVoter = () => {
    const queryClient = new QueryClient();
    return useMutation({
        mutationFn: (credentials: RegisterCredentials) => registerService(credentials),
        onSuccess: () => {
            toast.success("Voter registered successfully");
            queryClient.invalidateQueries({ queryKey: ["voters"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to register voter");
        },
    });
};
