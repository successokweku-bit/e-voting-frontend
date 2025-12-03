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
import { partySchema } from "@/schemas/schemas";
import { useUpdateParty } from "@/hooks/useUpdateParty";
import { type Party } from "@/types/types";

interface EditPartyDialogProps {
    party: Party;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditPartyDialog({ party, open, onOpenChange }: EditPartyDialogProps) {
    const { mutate, isPending } = useUpdateParty();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Political Party</DialogTitle>
                    <DialogDescription>
                        Update the details of the political party.
                    </DialogDescription>
                </DialogHeader>
                <Formik
                    initialValues={{
                        name: party.name,
                        acronym: party.acronym,
                        founded_date: party.founded_date,
                        description: party.description,
                    }}
                    validationSchema={partySchema}
                    onSubmit={(values, { resetForm }) => {
                        mutate(
                            { id: party.id, data: values },
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
                                    <Field name="founded_date" as={Input} id="founded_date" type="date" />
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
                                    {isPending ? "Updating..." : "Update Party"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
