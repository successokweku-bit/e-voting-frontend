import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const registerSchema = Yup.object().shape({
  nin: Yup.string()
    .required("NIN is required")
    .matches(/^\d{11}$/, "NIN must be exactly 11 digits"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  full_name: Yup.string().required("Full name is required"),
  state_of_residence: Yup.string().required("State of residence is required"),
  date_of_birth: Yup.string()
    .required("Date of birth is required")
    .matches(/^\d{4}\/\d{2}\/\d{2}$/, "Date of birth must be in format yyyy/mm/dd")
    .test("age", "You must be at least 18 years old", function (value) {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18;
    }),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const updateUserSchema = Yup.object().shape({
  nin: Yup.string()
    .required("NIN is required")
    .matches(/^\d{11}$/, "NIN must be exactly 11 digits"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  full_name: Yup.string().required("Full name is required"),
  state_of_residence: Yup.string().required("State of residence is required"),
  date_of_birth: Yup.string()
    .required("Date of birth is required")
    .matches(/^\d{4}\/\d{2}\/\d{2}$/, "Date of birth must be in format yyyy/mm/dd"),
  // is_active: Yup.boolean(),
  // is_verified: Yup.boolean(),
});

export const partySchema = Yup.object().shape({
  name: Yup.string().required("Party name is required"),
  acronym: Yup.string().required("Acronym is required"),
  founded_date: Yup.string().required("Founded date is required"),
  description: Yup.string()
    .max(150, "Description must be at most 150 characters")
    .required("Description is required"),
});

export const candidateSchema = Yup.object().shape({
  user_id: Yup.string().required("User is required"),
  party_id: Yup.string().required("Party is required"),
  position_id: Yup.string().required("Position is required"),
  election_id: Yup.string().required("Election is required"),
  bio: Yup.string().optional(),
  manifestos: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    })
  ).optional(),
  image: Yup.mixed().nullable().optional(),
});

export const electionSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().optional().nullable(),
  election_type: Yup.string().required("Election type is required"),
  state: Yup.string().optional().nullable(),
  is_active: Yup.boolean().optional(),
  start_date: Yup.string().optional().nullable(),
  end_date: Yup.string().optional().nullable(),
});

export const positionSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  election_id: Yup.string().required("Election ID is required"),
});

export const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});
