import * as yup from "yup";

const userCreateSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  isAdmin: yup.boolean().default(false).optional(),
});

export { userCreateSchema };
