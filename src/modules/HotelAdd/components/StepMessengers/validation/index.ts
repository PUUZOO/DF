import * as Yup from "yup";

const Schema = Yup.object().shape({
  email: Yup.string().required("Обязательное поле"),
  phone: Yup.string().required("Обязательное поле"),
});

export default Schema;
