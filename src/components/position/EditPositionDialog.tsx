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
import { positionSchema } from "@/schemas/schemas";
import { useUpdatePosition } from "@/hooks/position/useUpdatePosition";
import { type Position } from "@/types/types";
import { useElections } from "@/hooks/election/useElections";

interface EditPositionDialogProps {
    position: Position;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditPositionDialog({ position, open, onOpenChange }: EditPositionDialogProps) {
    const { mutate, isPending } = useUpdatePosition();
    const { data: elections } = useElections();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Position</DialogTitle>
                    <DialogDescription>
                        Update the details of the position.
                    </DialogDescription>
                </DialogHeader>
                <Formik
                    enableReinitialize
                    initialValues={{
                        title: position.title || "",
                        description: position.description || "",
                        election_id: String(position.election_id || ""),
                    }}
                    validationSchema={positionSchema}
                    onSubmit={(values, { resetForm }) => {
                        mutate(
                            {
                                id: position.position_id.toString(),
                                data: {
                                    ...values,
                                    election_id: Number(values.election_id)
                                }
                            },
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
                                    <Field name="title" as={Input} id="title" type="text" placeholder="Student Body President" />
                                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                                </UIField>
                                <UIField>
                                    <FieldLabel htmlFor="description">Description</FieldLabel>
                                    <Field name="description" as={Input} id="description" type="text" placeholder="Lead the student government" />
                                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                                </UIField>
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
                                            <option key={election.election_id} value={election.election_id}>
                                                {election.title}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="election_id" component="div" className="text-red-500 text-sm" />
                                </UIField>
                            </FieldGroup>
                            <div className="flex justify-end mt-4">
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? "Updating..." : "Update Position"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
