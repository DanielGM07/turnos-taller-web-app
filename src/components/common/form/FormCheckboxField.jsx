import { Controller, useFormContext } from "react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";

const FormCheckboxField = ({
  name,
  label,
  defaultValue = false,
  rules = {},
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              checked={field.value}
              {...props}
              //   sx={{
              //     color: "#888a8eeb",
              //     "&.Mui-checked": {
              //       color: "#455061ff",
              //     },
              //   }}
              sx={(theme) => ({
                color: theme.palette.text.secondary,
                "&.Mui-checked": {
                  color: theme.palette.primary.main,
                },
              })}
            />
          }
          label={label}
        />
      )}
    />
  );
};

export default FormCheckboxField;
