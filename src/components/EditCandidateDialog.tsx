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
import { candidateSchema } from "@/schemas/schemas";
import { useUpdateCandidate } from "@/hooks/useUpdateCandidate";
import { type Candidate } from "@/types/types";
import { useElections } from "@/hooks/useElections";
import { usePositions } from "@/hooks/usePositions";
import { useParties } from "@/hooks/useParties";

interface EditCandidateDialogProps {
    candidate: Candidate;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditCandidateDialog({ candidate, open, onOpenChange }: EditCandidateDialogProps) {
    const { mutate, isPending } = useUpdateCandidate();
    const { data: elections } = useElections();
    const { data: positions } = usePositions();
    const { data: parties } = useParties();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Candidate</DialogTitle>
                    <DialogDescription>
                        Update the details of the candidate.
                    </DialogDescription>
                </DialogHeader>
                <Formik
                    initialValues={{
                        user_id: candidate.user_id,
                        party_id: candidate.party_id,
                        position_id: candidate.position_id,
                        election_id: candidate.election_id,
                        name: candidate.name || "",
                    }}
                    validationSchema={candidateSchema}
                    onSubmit={(values, { resetForm }) => {
                        mutate(
                            { id: candidate.id, data: values },
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
                                    <FieldLabel htmlFor="name">Name</FieldLabel>
                                    <Field name="name" as={Input} id="name" type="text" placeholder="John Doe" disabled />
                                </UIField>
                                <UIField>
                                    <FieldLabel htmlFor="party_id">Party</FieldLabel>
                                    <Field
                                        name="party_id"
                                        as="select"
                                        id="party_id"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="">Select a party</option>
                                        {parties?.map((party) => (
                                            <option key={party.id} value={party.id}>
                                                {party.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="party_id" component="div" className="text-red-500 text-sm" />
                                </UIField>
                                <UIField>
                                    <FieldLabel htmlFor="position_id">Position</FieldLabel>
                                    <Field
                                        name="position_id"
                                        as="select"
                                        id="position_id"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="">Select a position</option>
                                        {positions?.map((position) => (
                                            <option key={position.id} value={position.id}>
                                                {position.title}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="position_id" component="div" className="text-red-500 text-sm" />
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
                                            <option key={election.id} value={election.id}>
                                                {election.title}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="election_id" component="div" className="text-red-500 text-sm" />
                                </UIField>
                            </FieldGroup>
                            <div className="flex justify-end mt-4">
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? "Updating..." : "Update Candidate"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
