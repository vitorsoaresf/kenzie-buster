import * as yup from "yup";

const dvdsLsSchema = yup.object().shape({
  dvds: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      duration: yup.string().required(),
      quantity: yup.number().required(),
      price: yup.number().required(),
    })
  ),
});

const dvdSerializedCreateSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string().required(),
  duration: yup.string().required(),
  quantity: yup.number().required(),
  price: yup.number().required(),
});

export { dvdSerializedCreateSchema, dvdsLsSchema };
