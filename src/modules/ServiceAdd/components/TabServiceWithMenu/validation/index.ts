import * as Yup from "yup";

const Schema = Yup.object().shape({
  custom_name: Yup.string().required("Обязательное поле"),
  price: Yup.string().test('price-check', 'Обязательное поле', (value, context) =>{ 
    // * if not fix price return true (valid)
    if (!context.parent?.fixPrice) {
      return true
    }
    
    return !!value
  }),
});

export default Schema;
