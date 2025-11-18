import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  TablePagination,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import SearchAccordion from "./SearchAccordion";
import styles from "./GenericTable.module.css";
import { formatDate } from "../../../utils/formatDate.utils";
import { isDateValue } from "../../../utils/isDateValue.utils";

const GenericTable = ({
  title,
  subtitle,
  columns,
  data,
  isLoading,
  isError,
  error,
  searchFields,
  onSearch,
  onClear,
  inputType,
  pagination,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25],
  addButton,
  onRowClick,
  hideHeader,
}) => {
  if (isLoading) return <CircularProgress aria-label="Loading data..." />;
  if (isError) return <Alert severity="error">Error: {error?.message}</Alert>;
  const showHeader =
    !hideHeader && (Boolean(title) || Boolean(subtitle) || Boolean(addButton));
  return (
    <Paper>
      {showHeader && (
        <Toolbar className={styles.toolbar}>
          <div>
            {title && (
              <Typography variant="h6" fontWeight="bold">
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </div>
          {addButton && (
            <Button
              variant="contained"
              startIcon={<Add />}
              className={styles.addButton}
              onClick={addButton.onClick}
            >
              {addButton.label}
            </Button>
          )}
        </Toolbar>
      )}
      {searchFields && (
        <SearchAccordion
          fields={searchFields}
          onSearch={onSearch}
          onClear={onClear}
          inputType={inputType}
        />
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align}
                  sx={{ fontWeight: 700 }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                hover
                onClick={
                  onRowClick
                    ? (e) => {
                        if (
                          e.target.closest(
                            "button, [role=button], .MuiButtonBase-root",
                          )
                        )
                          return;
                        onRowClick(row);
                      }
                    : undefined
                }
                sx={onRowClick ? { cursor: "pointer" } : undefined}
              >
                {columns.map((col) => (
                  <TableCell key={`${row.id}-${col.id}`} align={col.align}>
                    {col.render
                      ? col.render(row)
                      : isDateValue(row[col.id])
                        ? formatDate(row[col.id])
                        : row[col.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <TablePagination
          component="div"
          count={pagination.count}
          page={pagination.page}
          onPageChange={onPageChange}
          rowsPerPage={pagination.rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          labelRowsPerPage="Filas por página"
          rowsPerPageOptions={rowsPerPageOptions}
        />
      )}
    </Paper>
  );
};

GenericTable.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.string,
      render: PropTypes.func,
    }),
  ).isRequired,
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  error: PropTypes.object,
  searchFields: PropTypes.array,
  onSearch: PropTypes.func,
  onClear: PropTypes.func,
  pagination: PropTypes.shape({
    count: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  }),
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  addButton: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
  onRowClick: PropTypes.func,
};
export default GenericTable;
