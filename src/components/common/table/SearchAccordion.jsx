import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material";
import { ExpandMore, Search } from "@mui/icons-material";
import { useForm, FormProvider } from "react-hook-form";
import FormTextField from "../form/FormTextField";
import FormSelectField from "../form/FormSelectField";

const SearchAccordion = ({ fields, onSearch, onClear }) => {
  const methods = useForm({
    defaultValues: Object.fromEntries(
      fields.map((f) => [f.name, f.defaultValue ?? ""]),
    ),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const { handleSubmit, reset } = methods;

  const handleClear = () => {
    reset();
    onClear();
  };

  return (
    <FormProvider {...methods}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography fontWeight="bold" color="primary">
            Filtros de búsqueda
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box
            component="form"
            onSubmit={handleSubmit((data) => {
              // Normalización antigua + compatible
              const normalized = {
                ...data,
                dni: data.dni?.trim(),
                lastName: data.lastName?.trim(),
                email: data.email?.trim().toLowerCase(),
                dateOfBirth: data.dateOfBirth || "",
              };
              onSearch(normalized);
            })}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2} alignItems="flex-end">
              {fields.map((field) => (
                <Grid key={field.name} size={{ xs: 12, sm: 3 }}>
                  {field.type === "select" ? (
                    <FormSelectField
                      name={field.name}
                      label={field.label}
                      options={field.options || []}
                      defaultValue={field.defaultValue ?? ""}
                      rules={field.rules}
                    />
                  ) : (
                    <FormTextField
                      name={field.name}
                      label={field.label}
                      defaultValue={field.defaultValue ?? ""}
                      rules={field.rules}
                      type={field.inputType || "text"}
                      style={{ margin: 0 }}
                    />
                  )}
                </Grid>
              ))}

              <Grid
                size={{ xs: 12 }}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 1,
                }}
              >
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={handleClear}
                    sx={{ borderRadius: "20px" }}
                  >
                    Limpiar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Search />}
                    sx={{ borderRadius: "20px" }}
                  >
                    Buscar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
    </FormProvider>
  );
};

export default SearchAccordion;
