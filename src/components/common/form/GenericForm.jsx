// src/components/form/GenericForm.jsx

import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { FIELD_COMPONENTS } from "./GenericFormFieldRegistry.jsx";

const GenericForm = ({
  fields,
  onSubmit,
  form,
  defaultValues = {},
  resolver,
  mode = "onChange",
  layout = "grid", // "grid" o "column"
  submitLabel = "Guardar",
  cancelLabel = "Cancelar",
  onCancel,
  isSubmitting = false,
  showSubmit = true,
  showCancel = false,
  actionsRight = true,
  spacing = 3,
}) => {
  const internalForm = useForm({
    defaultValues,
    resolver,
    mode,
  });

  const formMethods = form || internalForm;
  const { handleSubmit } = formMethods;

  const renderField = (field) => {
    const {
      type,
      name,
      label,
      rules,
      options,
      md = 6,
      xs = 12,
      gridProps,
      ...rest
    } = field;

    const FieldComponent = FIELD_COMPONENTS[type];

    if (!FieldComponent) {
      console.warn(`Unknown field type "${type}" for field "${name}"`);
      return null;
    }

    const componentProps = { name, label, rules, ...rest };

    if (type === "select" || type === "radio") {
      componentProps.options = options || [];
    }

    const content = <FieldComponent {...componentProps} />;

    if (layout === "grid") {
      return (
        <Grid key={name} size={{ xs, md }} {...gridProps}>
          {content}
        </Grid>
      );
    }

    return (
      <Box key={name} sx={{ mb: 2 }}>
        {content}
      </Box>
    );
  };

  const actions = (
    <Box
      sx={{
        display: "flex",
        justifyContent: actionsRight ? "flex-end" : "flex-start",
        gap: 2,
        mt: 2,
      }}
    >
      {showCancel && onCancel && (
        <Button type="button" variant="outlined" onClick={onCancel}>
          {cancelLabel}
        </Button>
      )}

      {showSubmit && (
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : submitLabel}
        </Button>
      )}
    </Box>
  );

  return (
    <FormProvider {...formMethods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {layout === "grid" ? (
          <Grid container columnSpacing={spacing} rowSpacing={spacing}>
            {fields.map(renderField)}
          </Grid>
        ) : (
          <>{fields.map(renderField)}</>
        )}

        {actions}
      </Box>
    </FormProvider>
  );
};

GenericForm.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string,
      rules: PropTypes.object,
      options: PropTypes.array,
      md: PropTypes.number,
      xs: PropTypes.number,
      gridProps: PropTypes.object,
    }),
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.object,
  defaultValues: PropTypes.object,
  resolver: PropTypes.any,
  mode: PropTypes.string,
  layout: PropTypes.oneOf(["grid", "column"]),
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onCancel: PropTypes.func,
  isSubmitting: PropTypes.bool,
  showSubmit: PropTypes.bool,
  showCancel: PropTypes.bool,
  actionsRight: PropTypes.bool,
  spacing: PropTypes.number,
};

export default GenericForm;
