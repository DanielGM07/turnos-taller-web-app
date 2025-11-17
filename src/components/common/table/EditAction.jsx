import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";

const EditAction = ({ onClick, ariaLabel = "Editar" }) => {
  return (
    <IconButton
      color="primary"
      size="small"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={ariaLabel}
    >
      <Edit />
    </IconButton>
  );
};

EditAction.propTypes = {
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
};

export default EditAction;
