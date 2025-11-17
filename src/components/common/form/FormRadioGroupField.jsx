import { Controller, useFormContext } from "react-hook-form";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

const FormRadioGroupField = ({
  name,
  options = [],
  row = true,
  defaultValue = "",
  rules = {},
  disabled = false,
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
        <RadioGroup {...field} row={row} {...props}>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              disabled={disabled}
              control={
                <Radio
                  disabled={disabled}
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
              label={option.label}
            />
          ))}
        </RadioGroup>
      )}
    />
  );
};

export default FormRadioGroupField;
