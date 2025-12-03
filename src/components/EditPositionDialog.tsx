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
import { useUpdatePosition } from "@/hooks/useUpdatePosition";
import { type Position } from "@/types/types";

interface EditPositionDialogProps {
    position: Position;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditPositionDialog({ position, open, onOpenChange }: EditPositionDialogProps) {
    const { mutate, isPending } = useUpdatePosition();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Position</DialogTitle>
                    <DialogDescription>
                        Update the details of the position.
                    </DialogDescription>
                </DialogHeader>
                <Formik
                    initialValues={{
                        title: position.title,
                        description: position.description,
                        election_id: position.election_id,
                    }}
                    validationSchema={positionSchema}
                    onSubmit={(values, { resetForm }) => {
                        mutate(
                            { id: position.id, data: values },
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
                                    <FieldLabel htmlFor="election_id">Election ID</FieldLabel>
                                    <Field name="election_id" as={Input} id="election_id" type="number" />
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
