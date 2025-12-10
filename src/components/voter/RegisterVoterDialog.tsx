import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Field as UIField,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerSchema } from "@/schemas/schemas";
import { useRegisterVoter } from "@/hooks/voter/useRegisterVoter";
import { useStates } from "@/hooks/useStates";

export function RegisterVoterDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useRegisterVoter();
  const { data: states } = useStates();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register Voter</DialogTitle>
          <DialogDescription>
            Enter the voter's details to register them in the system.
          </DialogDescription>
        </DialogHeader>
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
          onSubmit={(values, { resetForm }) => {
            const submissionValues = {
              ...values,
              date_of_birth: values.date_of_birth.replace(/\//g, '-')
            };
            mutate(submissionValues, {
              onSuccess: () => {
                setOpen(false);
                resetForm();
              },
            });
          }}
        >
          {() => (
            <Form className="grid gap-4 py-4">
              <FieldGroup>
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
                <UIField>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Field name="password" as={Input} id="password" type="password" />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </UIField>
              </FieldGroup>
              <div className="flex justify-end mt-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Registering..." : "Register Voter"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
