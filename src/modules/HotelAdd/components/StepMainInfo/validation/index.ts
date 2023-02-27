import * as Yup from "yup";

const Schema = Yup.object().shape({
  name: Yup.string().required("Обязательное поле"),
  description: Yup.string().required("Обязательное поле"),
});

export default Schema;
