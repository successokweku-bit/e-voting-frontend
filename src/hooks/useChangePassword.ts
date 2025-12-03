import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../services/services";
import { toast } from "sonner";

export const useChangePassword = () => {
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) =>
            changePassword(id, data),
        onSuccess: () => {
            toast.success("Password changed successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to change password");
        },
    });
};
