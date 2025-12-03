import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Field as UIField,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { updateUserSchema } from "@/schemas/schemas";
import { useUpdateVoter } from "@/hooks/useUpdateVoter";
import { useStates } from "@/hooks/useStates";
import { type User } from "@/types/types";

interface EditVoterDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditVoterDialog({ user, open, onOpenChange }: EditVoterDialogProps) {
  const { mutate, isPending } = useUpdateVoter();
  const { data: states } = useStates();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Voter</DialogTitle>
          <DialogDescription>
            Update the voter's details.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{
            user_id: user.id,
            nin: user.nin || "",
            email: user.email || "",
            full_name: user.full_name || "",
            state_of_residence: user.state_of_residence || "",
            date_of_birth: user.date_of_birth ? user.date_of_birth.replace(/-/g, '/') : "",
            is_active: user.is_active || false,
            is_verified: user.is_verified || false,
          }}
          validationSchema={updateUserSchema}
          onSubmit={(values, { resetForm }) => {
            const submissionValues = {
              ...values,
              date_of_birth: values.date_of_birth.replace(/\//g, '-')
            };
            mutate(
              { id: String(user.id), data: submissionValues },
              {
                onSuccess: () => {
                  onOpenChange(false);
                  resetForm();
                },
              }
            );
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
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Field name="is_active" type="checkbox" id="is_active" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    <label htmlFor="is_active" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Is Active</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Field name="is_verified" type="checkbox" id="is_verified" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    <label htmlFor="is_verified" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Is Verified</label>
                  </div>
                </div>
              </FieldGroup>
              <div className="flex justify-end mt-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Updating..." : "Update Voter"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
