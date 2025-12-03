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
import { registerSchema } from "@/schemas/schemas";
import { useNavigate } from "react-router-dom";
import { useRegisterVoter } from "@/hooks/useRegisterVoter";

import { useStates } from "@/hooks/useStates";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();

  const { mutate, isPending } = useRegisterVoter();
  const { data: states } = useStates();

  const handleSubmit = (values: any) => {
    const submissionValues = {
      ...values,
      date_of_birth: values.date_of_birth.replace(/\//g, '-')
    };
    mutate(submissionValues, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Formik
        initialValues={{
          nin: "",
          email: "",
          full_name: "",
          state_of_residence: "",
          date_of_birth: "",
          password: "",
        }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <FieldGroup>
              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Fill in the form below to create your account
                </p>
              </div>
              <UIField>
                <FieldLabel htmlFor="full_name">Full Name</FieldLabel>
                <Field name="full_name" as={Input} id="full_name" type="text" placeholder="John Doe" />
                <ErrorMessage name="full_name" component="div" className="text-red-500 text-sm" />
              </UIField>
              <UIField>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Field name="email" as={Input} id="email" type="email" placeholder="m@example.com" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </UIField>
              <UIField>
                <FieldLabel htmlFor="nin">NIN</FieldLabel>
                <Field name="nin" as={Input} id="nin" type="text" placeholder="NIN Number" />
                <ErrorMessage name="nin" component="div" className="text-red-500 text-sm" />
              </UIField>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <UIField>
                  <FieldLabel htmlFor="state_of_residence">State of Residence</FieldLabel>
                  <Field
                    name="state_of_residence"
                    as="select"
                    id="state_of_residence"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select state</option>
                    {states?.map((state) => (
                      <option key={state.code} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="state_of_residence" component="div" className="text-red-500 text-sm" />
                </UIField>
                <UIField>
                  <FieldLabel htmlFor="date_of_birth">Date of Birth</FieldLabel>
                  <Field name="date_of_birth" as={Input} id="date_of_birth" type="text" placeholder="yyyy/mm/dd" />
                  <ErrorMessage name="date_of_birth" component="div" className="text-red-500 text-sm" />
                </UIField>
              </div>
              <UIField  >
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Field name="password" as={Input} id="password" type="password" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </UIField>
              <UIField>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Creating Account..." : "Create Account"}
                </Button>
              </UIField>
              <FieldSeparator>Or continue with</FieldSeparator>
              <UIField>

                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </UIField>
            </FieldGroup>
          </Form>
        )}
      </Formik>
    </div>
  )
}
