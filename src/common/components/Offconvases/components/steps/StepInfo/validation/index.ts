import * as Yup from "yup";

const Schema = Yup.object().shape({
  'first_name': Yup.string().required("Обязательное поле"),
  'last_name': Yup.string().required("Обязательное поле"),
  'phone': Yup.string().required("Обязательное поле").matches(/(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g, 'Введите 10-значный номер')
});

export default Schema;
