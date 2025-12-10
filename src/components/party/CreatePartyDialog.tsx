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
import { partySchema } from "@/schemas/schemas";
import { useCreateParty } from "@/hooks/party/useCreateParty";

export function CreatePartyDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateParty();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Political Party</DialogTitle>
          <DialogDescription>
            Enter the details of the new political party.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{
            name: "",
            acronym: "",
            founded_date: "",
            description: "",
          }}
          validationSchema={partySchema}
          onSubmit={(values, { resetForm }) => {
            const submissionValues = {
              ...values,
              founded_date: values.founded_date.replace(/\//g, '-')
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
                  <FieldLabel htmlFor="name">Party Name</FieldLabel>
                  <Field name="name" as={Input} id="name" type="text" placeholder="Democratic Party" />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </UIField>
                <UIField>
                  <FieldLabel htmlFor="acronym">Acronym</FieldLabel>
                  <Field name="acronym" as={Input} id="acronym" type="text" placeholder="DEM" />
                  <ErrorMessage name="acronym" component="div" className="text-red-500 text-sm" />
                </UIField>
                <UIField>
                  <FieldLabel htmlFor="founded_date">Founded Date</FieldLabel>
                  <Field name="founded_date" as={Input} id="founded_date" type="text" placeholder="yyyy/mm/dd" />
                  <ErrorMessage name="founded_date" component="div" className="text-red-500 text-sm" />
                </UIField>
                <UIField>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Field name="description" as={Input} id="description" type="text" placeholder="Short description (max 150 chars)" />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                </UIField>
              </FieldGroup>
              <div className="flex justify-end mt-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Creating..." : "Create Party"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog >
  );
}
