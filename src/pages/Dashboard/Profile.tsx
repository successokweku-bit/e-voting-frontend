import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field as UIField,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { changePasswordSchema } from "@/schemas/schemas";
import { useChangePassword } from "@/hooks/useChangePassword";

export default function Profile() {
  const { user } = useAuth();
  const { mutate, isPending } = useChangePassword();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto md:px-10 py-10 max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Profile</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <h2 className="text-xl font-semibold mb-4">User Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Full Name</label>
            <p className="text-lg">{user.full_name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p className="text-lg">{user.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">NIN</label>
            <p className="text-lg">{user.nin}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">State of Residence</label>
            <p className="text-lg">{user.state_of_residence}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Date of Birth</label>
            <p className="text-lg">{user.date_of_birth ? user.date_of_birth.replace(/-/g, '/') : "N/A"}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Status</label>
            <p className="text-lg">{user.is_active ? "Active" : "Inactive"}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={changePasswordSchema}
          onSubmit={(values, { resetForm }) => {
            mutate(
              { id: String(user.id), data: values },
              {
                onSuccess: () => {
                  resetForm();
                },
              }
            );
          }}
        >
          {() => (
            <Form className="grid gap-4">
              <FieldGroup>
                <UIField>
                  <FieldLabel htmlFor="currentPassword">Current Password</FieldLabel>
                  <Field
                    name="currentPassword"
                    as={Input}
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                  />
                  <ErrorMessage
                    name="currentPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </UIField>
                <UIField>
                  <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                  <Field
                    name="newPassword"
                    as={Input}
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </UIField>
                <UIField>
                  <FieldLabel htmlFor="confirmPassword">Confirm New Password</FieldLabel>
                  <Field
                    name="confirmPassword"
                    as={Input}
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </UIField>
              </FieldGroup>
              <div className="flex justify-end mt-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
