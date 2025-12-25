import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../services/services";
import { toast } from "sonner";

interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (data: ChangePasswordData) => changePassword(data),
        onSuccess: () => {
            toast.success("Password changed successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to change password");
        },
    });
};
