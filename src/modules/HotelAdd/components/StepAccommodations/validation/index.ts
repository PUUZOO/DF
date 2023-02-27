import * as Yup from "yup";

const Schema = Yup.object().shape({
  check_in: Yup.date().required("Обязательное поле"),
  check_out: Yup.date().required("Обязательное поле"),
  children_allowed: Yup.bool().required("Обязательное поле"),
  home_pet_allowed: Yup.bool().required("Обязательное поле"),
  cash_payment: Yup.bool().required("Обязательное поле"),
  card_payment: Yup.bool().required("Обязательное поле"),
});

export default Schema;
