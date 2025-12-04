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
import { useCreatePosition } from "@/hooks/useCreatePosition";
import { positionSchema } from "@/schemas/schemas";


import { useElections } from "@/hooks/useElections";

export function CreatePositionDialog({ children, electionId }: { children: React.ReactNode; electionId?: string }) {
    const [open, setOpen] = useState(false);
    const { mutate, isPending } = useCreatePosition();
    const { data: elections } = useElections();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Create Position</DialogTitle>
                    <DialogDescription>
                        Enter the details of the new position.
                    </DialogDescription>
                </DialogHeader>
                <Formik
                    initialValues={{
                        title: "",
                        description: "",
                        election_id: electionId ? String(electionId) : "",
                    }}
                    validationSchema={positionSchema}
                    onSubmit={(values, { resetForm }) => {
                        mutate(values, {
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
                                    <FieldLabel htmlFor="title">Title</FieldLabel>
                                    <Field name="title" as={Input} id="title" type="text" placeholder="Student Body President" />
                                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                                </UIField>
                                <UIField>
                                    <FieldLabel htmlFor="description">Description</FieldLabel>
                                    <Field name="description" as={Input} id="description" type="text" placeholder="Lead the student government" />
                                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                                </UIField>
                                {!electionId && (
                                    <UIField>
                                        <FieldLabel htmlFor="election_id">Election</FieldLabel>
                                        <Field
                                            name="election_id"
                                            as="select"
                                            id="election_id"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="">Select an election</option>
                                            {elections?.map((election) => (
                                                <option key={election.id} value={election.id}>
                                                    {election.title}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="election_id" component="div" className="text-red-500 text-sm" />
                                    </UIField>
                                )}
                            </FieldGroup>
                            <div className="flex justify-end mt-4">
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? "Creating..." : "Create Position"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
