import * as Yup from "yup";

const Schema = Yup.object().shape({
  address: Yup.string().required("Обязательное поле"),
});

export default Schema;
