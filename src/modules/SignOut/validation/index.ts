import * as Yup from "yup";

const Schema = Yup.object().shape({
  password: Yup.string().required("Обязательное поле"),
});

export default Schema;
