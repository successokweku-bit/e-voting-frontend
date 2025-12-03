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
import { electionSchema } from "@/schemas/schemas";
import { useUpdateElection } from "@/hooks/useUpdateElection";
import { type Election } from "@/types/types";

interface EditElectionDialogProps {
    election: Election;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditElectionDialog({ election, open, onOpenChange }: EditElectionDialogProps) {
    const { mutate, isPending } = useUpdateElection();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Election</DialogTitle>
                    <DialogDescription>
                        Update the details of the election.
                    </DialogDescription>
                </DialogHeader>
                <Formik
                    initialValues={{
                        title: election.title,
                        startDate: election.startDate,
                        endDate: election.endDate,
                        status: election.status,
                    }}
                    validationSchema={electionSchema}
                    onSubmit={(values, { resetForm }) => {
                        mutate(
                            { id: election.id, data: values as any },
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
                                    <FieldLabel htmlFor="title">Title</FieldLabel>
                                    <Field name="title" as={Input} id="title" type="text" placeholder="2024 Presidential Election" />
                                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                                </UIField>
                                <UIField>
                                    <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
                                    <Field name="startDate" as={Input} id="startDate" type="date" />
                                    <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm" />
                                </UIField>
                                <UIField>
                                    <FieldLabel htmlFor="endDate">End Date</FieldLabel>
                                    <Field name="endDate" as={Input} id="endDate" type="date" />
                                    <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm" />
                                </UIField>
                                <UIField>
                                    <FieldLabel htmlFor="status">Status</FieldLabel>
                                    <Field
                                        name="status"
                                        as="select"
                                        id="status"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="Upcoming">Upcoming</option>
                                        <option value="Active">Active</option>
                                        <option value="Completed">Completed</option>
                                    </Field>
                                    <ErrorMessage name="status" component="div" className="text-red-500 text-sm" />
                                </UIField>
                            </FieldGroup>
                            <div className="flex justify-end mt-4">
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? "Updating..." : "Update Election"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
