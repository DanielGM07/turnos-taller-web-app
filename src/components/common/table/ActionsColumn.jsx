import PropTypes from "prop-types";
import EditAction from "./EditAction";
import DeleteAction from "./DeleteAction";

const ActionsColumn = ({
  row,
  onEdit,
  onDelete,
  editAriaLabel,
  deleteItemIdKey = "id",
  deleteItemNameKey = "name",
  deleteItemNameFn,
  editAriaLabelDefault = "Editar",
}) => {
  return (
    <>
      {onEdit && (
        <EditAction
          onClick={() => onEdit && onEdit(row)}
          ariaLabel={editAriaLabel || editAriaLabelDefault}
        />
      )}
      <DeleteAction
        onDelete={onDelete}
        itemId={row[deleteItemIdKey]}
        itemName={
          deleteItemNameFn ? deleteItemNameFn(row) : row[deleteItemNameKey]
        }
      />
    </>
  );
};

ActionsColumn.propTypes = {
  row: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  editAriaLabel: PropTypes.string,
  deleteItemIdKey: PropTypes.string,
  deleteItemNameKey: PropTypes.string,
  deleteItemNameFn: PropTypes.func,
  editAriaLabelDefault: PropTypes.string,
};

export default ActionsColumn;
