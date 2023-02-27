import * as Yup from "yup";

const Schema = Yup.object().shape({
  country: Yup.string().required("Уточните страну."),
  city: Yup.string().required("Уточните город."),
  street: Yup.string().required("Введите более точный адрес улицы."),
  building: Yup.string().required("Введите более точный адрес для здания."),
});

export default Schema;
