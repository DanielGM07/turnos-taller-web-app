// src/components/common/form/fields/FormTextField.jsx
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

const FormTextField = ({
  name,
  label,
  defaultValue,
  rules = {},
  inputProps,
  helperLines = 0,
  // 🔹 NUEVO: podés forzar que el label siempre esté arriba
  shrinkLabel = false,
  ...props
}) => {
  const { control } = useFormContext();

  const helperLineHeightEm = 1.66;
  const minHelperHeightEm = helperLines * helperLineHeightEm;

  // 🔹 tipos que normalmente necesitan el label "encogido"
  const autoShrinkTypes = ["date", "time", "datetime-local", "month", "week"];
  const shouldShrink = shrinkLabel || autoShrinkTypes.includes(props.type);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          label={label}
          fullWidth
          margin="normal"
          error={!!error}
          helperText={error ? error.message : ""}
          slotProps={{
            formHelperText: {
              sx: {
                minHeight: `${minHelperHeightEm}em`,
                whiteSpace: "normal",
                overflowWrap: "anywhere",
                lineHeight: helperLineHeightEm,
              },
            },
            // 🔹 acá se fuerza el label arriba cuando corresponde
            inputLabel: shouldShrink ? { shrink: true } : undefined,
          }}
        />
      )}
    />
  );
};

FormTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.any,
  rules: PropTypes.object,
  helperLines: PropTypes.number,
  shrinkLabel: PropTypes.bool,
};

export default FormTextField;
