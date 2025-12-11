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
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { candidateSchema } from "@/schemas/schemas";
import { useElections } from "@/hooks/election/useElections";
import { usePositions } from "@/hooks/position/usePositions";
import { useVoters } from "@/hooks/voter/useVoters";
import { useParties } from "@/hooks/party/useParties";
import { useCreateCandidate } from "@/hooks/candidates/useCreateCandidate";

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
      <DialogContent className="sm:max-w-2xl">
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
            bio: "",
            manifestos: [{ title: "", description: "" }],
            image: null as File | null,
          }}
          validationSchema={candidateSchema}
          onSubmit={(values, { resetForm }) => {
            const formData = new FormData();
            formData.append("user_id", values.user_id);
            formData.append("party_id", values.party_id);
            formData.append("election_id", values.election_id);
            formData.append("position_id", values.position_id);
            formData.append("bio", values.bio);
            formData.append("manifestos", JSON.stringify(values.manifestos));

            if (values.image) {
              formData.append("image", values.image);
            }

            mutate(formData, {
              onSuccess: () => {
                setOpen(false);
                resetForm();
              },
            });
          }}
        >
          {({ values, setFieldValue }) => {
            const filteredPositions = positions.filter(
              (position) =>
                position.election_id == Number(values.election_id)
            );

            return (
              <Form className="grid gap-4 py-4 overflow-y-auto  h-[calc(100vh-10rem)] px-1">
                <FieldGroup className="grid grid-cols-2 gap-4 ">
                  <div className="col-span-2 flex justify-center mb-4">
                    <div className="relative group cursor-pointer">
                      <div className={`w-32 h-32 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden ${values.image ? 'border-primary' : 'border-slate-300'}`}>
                        {values.image ? (
                          <img
                            src={URL.createObjectURL(values.image)}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-4">
                            <div className="text-slate-400 text-xs">Upload Photo</div>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={(event) => {
                            if (event.currentTarget.files && event.currentTarget.files[0]) {
                              setFieldValue("image", event.currentTarget.files[0]);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
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
                        <option key={voter.id} value={voter.id}>
                          {voter.full_name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="user_id" component="div" className="text-red-500 text-sm" />
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
                      disabled={!values.election_id}
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
                          {values.manifestos && values.manifestos.map((_, index) => (
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
