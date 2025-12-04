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
import {
  Field as UIField,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { candidateSchema } from "@/schemas/schemas";
import { useCreateCandidate } from "@/hooks/useCreateCandidate";
import { useElections } from "@/hooks/useElections";
import { usePositions } from "@/hooks/usePositions";
import { useVoters } from "@/hooks/useVoters";
import { useParties } from "@/hooks/useParties";

export function CreateCandidateDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateCandidate();
  const { data: elections = [] } = useElections();
  const { data: positions = [] } = usePositions();
  const { data: voters = [] } = useVoters();
  const { data: parties = [] } = useParties();

  // const upcomingElections = elections?.filter((e) => e.status === "Upcoming") || [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Candidate</DialogTitle>
          <DialogDescription>
            Enter the details of the new candidate.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{
            user_id: "",
            party_id: "",
            election_id: "",
            position_id: "",
          }}
          validationSchema={candidateSchema}
          onSubmit={(values, { resetForm }) => {
            mutate(
              values,
              {
                onSuccess: () => {
                  setOpen(false);
                  resetForm();
                },
              }
            );
          }}
        >
          {({ values, setFieldValue }) => {
            const filteredPositions = positions.filter(
              (position) => position.election_id === values.election_id
            );

            return (
              <Form className="grid gap-4 py-4">
                <FieldGroup>
                  <UIField>
                    <FieldLabel htmlFor="user_id">Candidate Name</FieldLabel>
                    <Field
                      name="user_id"
                      as="select"
                      id="user_id"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a voter</option>
                      {voters.map((voter) => (
                        <option key={voter.id} value={voter.full_name}>
                          {voter.full_name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
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
                      {parties.map((party) => (
                        <option key={party.id} value={party.name}>
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
                        setFieldValue("position", "");
                      }}
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
                  <UIField>
                    <FieldLabel htmlFor="position_id">Position</FieldLabel>
                    <Field
                      name="position_id"
                      as="select"
                      id="position_id"
                      disabled={!values.election_id}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a position</option>
                      {filteredPositions?.map((position) => (
                        <option key={position.id} value={position.title}>
                          {position.title}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="position_id" component="div" className="text-red-500 text-sm" />
                  </UIField>
                </FieldGroup>
                <div className="flex justify-end mt-4">
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Creating..." : "Create Candidate"}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
