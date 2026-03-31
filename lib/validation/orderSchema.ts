import * as yup from "yup";

export const orderSchema = yup.object({
  name: yup.string().required("Name is required"),

  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  phone: yup
    .string()
    .min(5, "Phone too short")
    .required("Phone is required"),

  address: yup.string().required("Address is required"),
});