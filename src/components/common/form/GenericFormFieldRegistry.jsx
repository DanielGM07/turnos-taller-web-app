// src/components/form/GenericFormFieldRegistry.jsx

import FormTextField from "./FormTextField.jsx";
import FormSelectField from "./FormSelectField.jsx";
import FormCheckboxField from "./FormCheckboxField.jsx";
import FormRadioGroupField from "./FormRadioGroupField.jsx";

// Podés extenderlo agregando nuevos tipos cuando quieras
export const FIELD_COMPONENTS = {
  text: FormTextField,
  email: (props) => <FormTextField {...props} type="email" />,
  password: (props) => <FormTextField {...props} type="password" />,
  number: (props) => <FormTextField {...props} type="number" />,
  date: (props) => <FormTextField {...props} type="date" />,
  time: (props) => <FormTextField {...props} type="time" />,

  // 👇 NUEVO TIPO PARA FECHA + HORA
  datetime: (props) => <FormTextField {...props} type="datetime-local" />,

  select: FormSelectField,
  checkbox: FormCheckboxField,
  radio: FormRadioGroupField,
};
