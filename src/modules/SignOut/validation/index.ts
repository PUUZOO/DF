import * as Yup from "yup";

const Schema = Yup.object().shape({
  email: Yup.string().email("Введите пожалуйста email").required("Обязательное поле"),
  password: Yup.string().required("Обязательное поле"),
});

export default Schema;
