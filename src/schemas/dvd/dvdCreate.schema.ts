import * as yup from "yup";

const dvdCreateSchema = yup.object().shape({
  name: yup.string().required(),
  duration: yup.string().required(),
  quantity: yup.number().required(),
  price : yup.number().required(),
});

const dvdSerializedCreateSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string().required(),
  duration: yup.string().required(),
  quantity: yup.number().required(),
  price : yup.number().required(),
});

export { dvdCreateSchema, dvdSerializedCreateSchema };
