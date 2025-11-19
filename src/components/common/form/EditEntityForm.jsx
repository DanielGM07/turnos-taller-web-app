import GenericForm from "./GenericForm.jsx";
import PropTypes from "prop-types";

export default function EditEntityForm({
  fields,
  onSubmit,
  isSubmitting,
  onCancel,
  submitLabel = "Modificar",
  initialValues = {},
  disabled,
}) {
  return (
    <GenericForm
      fields={fields}
      onSubmit={onSubmit}
      defaultValues={initialValues}
      isSubmitting={isSubmitting}
      submitLabel={submitLabel}
      showCancel
      onCancel={onCancel}
      showSubmit={!disabled}
      actionsRight
    />
  );
}

EditEntityForm.propTypes = {
  fields: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  onCancel: PropTypes.func,
  submitLabel: PropTypes.string,
  initialValues: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};
