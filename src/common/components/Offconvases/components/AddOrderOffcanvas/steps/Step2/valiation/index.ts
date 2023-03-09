import * as Yup from "yup";

const Schema = Yup.object().shape({
  'old_password': Yup.string().required("Обязательное поле"),
  'new_password': Yup.string().required("Обязательное поле"),
});

export default Schema;
