import * as Yup from "yup";

const Schema = Yup.object().shape({
  'first_name': Yup.string().required("Обязательное поле"),
  'last_name': Yup.string().required("Обязательное поле"),
  'email': Yup.string().email("Введите пожалуйста email").required("Обязательное поле"),
  'phone': Yup.string().required("Обязательное поле"),
});

export default Schema;
