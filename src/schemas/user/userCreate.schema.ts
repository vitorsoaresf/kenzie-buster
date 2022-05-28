import * as yup from "yup";

const userCreateSchema = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  isAdmin: yup.boolean().default(false).optional(),
});

const userSerializedCreateSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  email: yup.string().email().required(),
  name: yup.string().required(),
  isAdmin: yup.boolean().required(),
});

export { userCreateSchema, userSerializedCreateSchema };
