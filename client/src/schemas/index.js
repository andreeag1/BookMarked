import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
//min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit

export const basicSchema = yup.object().shape({
  firstName: yup.string().required("first name required"),
  lastName: yup.string().required("last name required"),
  email: yup.string().email("Please enter a valid email address").required(),
  username: yup.string().required("username required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("password required"),
});
