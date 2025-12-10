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
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { candidateSchema } from "@/schemas/schemas";
import { useUpdateCandidate } from "@/hooks/candidates/useUpdateCandidate";
import { useCandidate } from "@/hooks/candidates/useCandidate";
import { type Candidate } from "@/types/types";
import { useElections } from "@/hooks/election/useElections";
import { usePositions } from "@/hooks/position/usePositions";
import { useParties } from "@/hooks/party/useParties";

interface EditCandidateDialogProps {
    candidate: Candidate;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditCandidateDialog({ candidate: initialCandidate, open, onOpenChange }: EditCandidateDialogProps) {
    const { mutate, isPending } = useUpdateCandidate();
    const { data: fetchedCandidate, isLoading: isLoadingCandidate } = useCandidate(initialCandidate.candidate_id, open);
    const { data: elections } = useElections();
    const { data: positions = [] } = usePositions();
    const { data: parties } = useParties();

    // Use fetched data if available, otherwise fallback to initial prop (though initial might be partial)
    const candidateData = fetchedCandidate || initialCandidate;

    // Handle inconsistent backend naming (manifesto vs manifestos)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const manifestos = (candidateData as any).manifestos || candidateData.manifestos || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const candidateDataAny = candidateData as any;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Candidate</DialogTitle>
                    <DialogDescription>
                        Update the details of the candidate.
                    </DialogDescription>
                </DialogHeader>
                {isLoadingCandidate ? (
                    <div className="py-4 text-center">Loading candidate details...</div>
                ) : (
                    <Formik
                        enableReinitialize
                        initialValues={{
                            user_id: candidateData.user_id,
                            party_id: String(candidateData.party_id || ""),
                            position_id: String(candidateData.position_id || candidateDataAny.position?.position_id || ""),
                            election_id: String(candidateData.election_id || candidateData.election?.election_id || ""),
                            name: candidateData.user_name || "",
                            bio: candidateData.bio || "",
                            manifestos: manifestos || [{ title: "", description: "" }],
                        }}
                        validationSchema={candidateSchema}
                        onSubmit={(values, { resetForm }) => {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            const { name, ...rest } = values;
                            const submissionData = {
                                ...rest,
                                party_id: Number(values.party_id),
                                election_id: Number(values.election_id),
                                position_id: Number(values.position_id),
                            };
                            mutate(
                                { id: candidateData.candidate_id, data: submissionData },
                                {
                                    onSuccess: () => {
                                        onOpenChange(false);
                                        resetForm();
                                    },
                                }
                            );
                        }}
                    >
                        {({ values, setFieldValue }) => {
                            const filteredPositions = positions.filter(
                                (position) =>
                                    position.election_id == Number(values.election_id)
                            );
                            return (
                                <Form className="grid gap-4 py-4 overflow-y-auto h-[calc(100vh-10rem)] px-1">
                                    <FieldGroup className="grid grid-cols-2 gap-4">
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
                                            <FieldLabel htmlFor="election_id">Election</FieldLabel>
                                            <Field
                                                name="election_id"
                                                as="select"
                                                id="election_id"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                    setFieldValue("election_id", e.target.value);
                                                    setFieldValue("position_id", "");
                                                }}
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
                                        <UIField>
                                            <FieldLabel htmlFor="position_id">Position</FieldLabel>
                                            <Field
                                                name="position_id"
                                                as="select"
                                                id="position_id"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <option value="">Select a position</option>
                                                {filteredPositions?.map((position) => (
                                                    <option key={position.position_id} value={position.position_id}>
                                                        {position.title}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="position_id" component="div" className="text-red-500 text-sm" />
                                        </UIField>
                                        <UIField className="col-span-2">
                                            <FieldLabel htmlFor="bio">Bio</FieldLabel>
                                            <Field
                                                name="bio"
                                                id="bio"
                                                as="textarea"
                                                placeholder="Candidate biography..."
                                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            />
                                            <ErrorMessage name="bio" component="div" className="text-red-500 text-sm" />
                                        </UIField>
                                        <div className="space-y-2 col-span-2">
                                            <FieldLabel>Manifesto Points</FieldLabel>
                                            <FieldArray name="manifestos">
                                                {({ push, remove }) => (
                                                    <div className="space-y-4">
                                                        {values.manifestos && values.manifestos.map((_: any, index: number) => (
                                                            <div key={index} className="flex gap-2 items-start p-4 border rounded-lg bg-slate-50 relative group">
                                                                <div className="flex-1 space-y-3">
                                                                    <div>
                                                                        <FieldLabel className="text-xs text-muted-foreground mb-1">Title</FieldLabel>
                                                                        <Field
                                                                            name={`manifestos.${index}.title`}
                                                                            placeholder="e.g. Education Reform"
                                                                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                                                        />
                                                                        <ErrorMessage name={`manifestos.${index}.title`} component="div" className="text-red-500 text-xs mt-1" />
                                                                    </div>
                                                                    <div>
                                                                        <FieldLabel className="text-xs text-muted-foreground mb-1">Description</FieldLabel>
                                                                        <Field
                                                                            name={`manifestos.${index}.description`}
                                                                            as="textarea"
                                                                            rows={2}
                                                                            placeholder="Explain your policy..."
                                                                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                                                        />
                                                                        <ErrorMessage name={`manifestos.${index}.description`} component="div" className="text-red-500 text-xs mt-1" />
                                                                    </div>
                                                                </div>

                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive absolute top-2 right-2"
                                                                    onClick={() => remove(index)}
                                                                    disabled={values.manifestos && values.manifestos.length === 1 && index === 0}
                                                                >
                                                                    <span className="sr-only">Remove</span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                                </Button>
                                                            </div>
                                                        ))}
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            className="mt-2 w-full border-dashed border-2 hover:border-solid hover:bg-slate-50"
                                                            onClick={() => push({ title: "", description: "" })}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                                            Add Manifesto Point
                                                        </Button>
                                                    </div>
                                                )}
                                            </FieldArray>
                                            <ErrorMessage
                                                name="manifestos"
                                                render={(msg) => (typeof msg === "string" ? <div className="text-red-500 text-sm">{msg}</div> : null)}
                                            />
                                        </div>
                                    </FieldGroup>
                                    <div className="flex justify-end mt-4">
                                        <Button type="submit" disabled={isPending}>
                                            {isPending ? "Updating..." : "Update Candidate"}
                                        </Button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                )}
            </DialogContent>
        </Dialog>
    );
}
