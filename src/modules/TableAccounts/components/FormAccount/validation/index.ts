import * as Yup from "yup";

const Schema = Yup.object().shape({
  name: Yup.string(),
  description: Yup.string(),
  contact_name: Yup.string().required("Обязательное поле"),
  contact_phone: Yup.string().required("Обязательное поле"),
});

export default Schema;
