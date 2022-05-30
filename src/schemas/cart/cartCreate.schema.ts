import * as yup from "yup";

const cartSchema = yup.object().shape({
  quantity: yup.number().required(),
});

export { cartSchema };
