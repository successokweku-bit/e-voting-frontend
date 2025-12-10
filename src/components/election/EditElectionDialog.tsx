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
import { useUpdateElection } from "@/hooks/election/useUpdateElection";
import { type Election } from "@/types/types";
import { useStates } from "@/hooks/useStates";

const ELECTION_TYPES = [
    "Presidential",
    "Gubernatorial",
    "Senatorial",
    "House of Representatives",
    "Local Government",
];

interface EditElectionDialogProps {
    election: Election;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditElectionDialog({ election, open, onOpenChange }: EditElectionDialogProps) {
    const { mutate, isPending } = useUpdateElection();
    const { data: states = [] } = useStates();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Election</DialogTitle>
                    <DialogDescription>
                        Update the details of the election.
                    </DialogDescription>
                </DialogHeader>
                <Formik
                    enableReinitialize
                    initialValues={{
                        title: election.title || "",
                        description: election.description || "",
                        election_type: election.election_type || "",
                        state: election.state || "",
                        is_active: election.is_active ?? false,
                        start_date: election.start_date ? election.start_date.split("T")[0] : "",
                        end_date: election.end_date ? election.end_date.split("T")[0] : "",
                    }}
                    validationSchema={electionSchema}
                    onSubmit={(values, { resetForm }) => {
                        mutate(
                            { id: election.election_id.toString(), data: values },
                            {
                                onSuccess: () => {
                                    onOpenChange(false);
                                    resetForm();
                                },
                            }
                        );
                    }}
                >
                    {({ values, setFieldValue }) => (
                        <Form className="grid gap-4 py-4">
                            <FieldGroup className="grid grid-cols-2 gap-4">
                                <UIField className="col-span-2">
                                    <FieldLabel htmlFor="title">Title *</FieldLabel>
                                    <Field name="title" as={Input} id="title" type="text" placeholder="2024 Presidential Election" />
                                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                                </UIField>
                                <UIField className="col-span-2">
                                    <FieldLabel htmlFor="description">Description</FieldLabel>
                                    <Field
                                        name="description"
                                        as="textarea"
                                        id="description"
                                        placeholder="Election description..."
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    />
                                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                                </UIField>
                                <UIField>
                                    <FieldLabel htmlFor="election_type">Election Type *</FieldLabel>
                                    <Field
                                        name="election_type"
                                        as="select"
                                        id="election_type"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    >
                                        <option value="">Select type</option>
                                        {ELECTION_TYPES.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="election_type" component="div" className="text-red-500 text-sm" />
                                </UIField>
                                <UIField>
                                    <FieldLabel htmlFor="state">State</FieldLabel>
                                    <Field
                                        name="state"
                                        as="select"
                                        id="state"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    >
                                        <option value="">Select a state (optional)</option>
                                        {states.map((s) => (
                                            <option key={s.code} value={s.name}>{s.name}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="state" component="div" className="text-red-500 text-sm" />
                                </UIField>
                                <UIField>
                                    <FieldLabel htmlFor="start_date">Start Date</FieldLabel>
                                    <Field name="start_date" as={Input} id="start_date" type="date" />
                                    <ErrorMessage name="start_date" component="div" className="text-red-500 text-sm" />
                                </UIField>
                                <UIField>
                                    <FieldLabel htmlFor="end_date">End Date</FieldLabel>
                                    <Field name="end_date" as={Input} id="end_date" type="date" />
                                    <ErrorMessage name="end_date" component="div" className="text-red-500 text-sm" />
                                </UIField>
                                <UIField>
                                    <FieldLabel htmlFor="is_active">Status</FieldLabel>
                                    <Field
                                        name="is_active"
                                        as="select"
                                        id="is_active"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                            setFieldValue("is_active", e.target.value === "true");
                                        }}
                                        value={values.is_active ? "true" : "false"}
                                    >
                                        <option value="false">Inactive</option>
                                        <option value="true">Active</option>
                                    </Field>
                                    <ErrorMessage name="is_active" component="div" className="text-red-500 text-sm" />
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

