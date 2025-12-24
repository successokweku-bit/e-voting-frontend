import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { UserNav } from "@/components/UserNav";
import {
  Field as UIField,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { changePasswordSchema } from "@/schemas/schemas";
import { useChangePassword } from "@/hooks/useChangePassword";
import {
  ArrowLeft,
  User,
  Mail,
  CreditCard,
  MapPin,
  Calendar,
  Shield,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";
import { useState } from "react";

export default function VoterProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mutate, isPending } = useChangePassword();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <Spinner className="size-10 text-[#134E4A]" />
      </div>
    );
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#134E4A] text-white py-8 px-4 md:px-10">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-between items-start mb-6">
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/10 pl-0 -ml-3"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <UserNav />
          </div>

          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || 'User')}&background=ffffff&color=134E4A&bold=true&size=80`}
                alt={user.full_name}
                className="h-20 w-20 rounded-full"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{user.full_name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={`${user.is_active ? 'bg-emerald-500' : 'bg-red-500'} text-white border-0`}>
                  {user.is_active ? 'Active Voter' : 'Inactive'}
                </Badge>
                <span className="text-white/60 text-sm capitalize">{user.role?.replace('_', ' ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl py-8 px-4 md:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information Card */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-[#134E4A]/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-[#134E4A]" />
                </div>
                <div>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                  <CardDescription>Your registered details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <User className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Full Name</p>
                  <p className="font-semibold text-slate-800">{user.full_name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Mail className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Email Address</p>
                  <p className="font-semibold text-slate-800">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <CreditCard className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">NIN (National ID)</p>
                  <p className="font-semibold text-slate-800 font-mono">{user.nin || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <MapPin className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">State of Residence</p>
                  <p className="font-semibold text-slate-800">{user.state_of_residence || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Calendar className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Date of Birth</p>
                  <p className="font-semibold text-slate-800">{formatDate(user.date_of_birth ?? undefined)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Shield className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Account Status</p>
                  <Badge className={`${user.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'} font-medium`}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Change Password Card */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-[#134E4A]/10 flex items-center justify-center">
                  <Lock className="h-4 w-4 text-[#134E4A]" />
                </div>
                <div>
                  <CardTitle className="text-lg">Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
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
                  <Form className="space-y-4">
                    <FieldGroup>
                      <UIField>
                        <FieldLabel htmlFor="currentPassword">Current Password</FieldLabel>
                        <div className="relative">
                          <Field
                            name="currentPassword"
                            as={Input}
                            id="currentPassword"
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Enter current password"
                            className="pr-10"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <ErrorMessage
                          name="currentPassword"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </UIField>

                      <UIField>
                        <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                        <div className="relative">
                          <Field
                            name="newPassword"
                            as={Input}
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            className="pr-10"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <ErrorMessage
                          name="newPassword"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </UIField>

                      <UIField>
                        <FieldLabel htmlFor="confirmPassword">Confirm New Password</FieldLabel>
                        <div className="relative">
                          <Field
                            name="confirmPassword"
                            as={Input}
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            className="pr-10"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </UIField>
                    </FieldGroup>

                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-[#134E4A] hover:bg-[#134E4A]/90"
                    >
                      {isPending ? "Updating..." : "Update Password"}
                    </Button>
                  </Form>
                )}
              </Formik>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>Password Requirements:</strong>
                </p>
                <ul className="text-sm text-amber-700 mt-2 space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• Contains uppercase and lowercase letters</li>
                  <li>• Contains at least one number</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-linear-to-r from-slate-100 to-slate-50 rounded-xl flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-[#134E4A]/10 flex items-center justify-center shrink-0">
            <Shield className="h-5 w-5 text-[#134E4A]" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">Your Data is Secure</p>
            <p className="text-xs text-muted-foreground">
              Your personal information is encrypted and protected. If you need to update your details, please contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
