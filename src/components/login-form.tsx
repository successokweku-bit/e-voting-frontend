import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field as UIField,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "@/schemas/schemas";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLogin } from "@/hooks/useLogin";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/dashboard";

  const { mutate, isPending } = useLogin();

  const handleSubmit = (values: any) => {
    mutate(values, {
      onSuccess: (response) => {
 

        const data = response.data;
        const accessToken = data.access_token;
        const user = data.user;

        if (!accessToken) {
          toast.error("Login failed: No access token received.");
          return;
        }

        login(accessToken, user);
        toast.success("Login successful!");

        navigate(from === location.pathname ? "/dashboard" : from, { replace: true });
      },
      onError: (error) => {
        console.error("Login error:", error);
        toast.error(error.message || "Invalid credentials");
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <FieldGroup>
              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your email below to login to your account
                </p>
              </div>
              <UIField>
                <FieldLabel htmlFor="username">Email</FieldLabel>
                <Field name="username" as={Input} id="username" type="text" placeholder="m@example.com" />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
              </UIField>
              <UIField>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Field name="password" as={Input} id="password" type="password" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </UIField>
              <UIField>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Logging in..." : "Login"}
                </Button>
              </UIField>
              <FieldSeparator>Or continue with</FieldSeparator>
              <UIField>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <a href="/register" className="underline underline-offset-4">
                    Sign up
                  </a>
                </FieldDescription>
              </UIField>
            </FieldGroup>
          </Form>
        )}
      </Formik>
    </div>
  )
}
