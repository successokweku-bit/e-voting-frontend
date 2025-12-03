import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/services";
import type { LoginCredentials } from "../types/types";
import { toast } from "sonner";

export const useLogin = () => {
    return useMutation({
        mutationFn: (credentials: LoginCredentials) => loginService(credentials),
        onSuccess: () => {
            toast.success("Login successful!");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Login failed");
        },
    });
};
