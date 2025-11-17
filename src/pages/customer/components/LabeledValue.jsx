import { Box, Typography, Stack, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // opcional: manejar error
  }
};

export default function LabeledValue({ label, value, icon, copyable }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" color="gray">
        {label}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        {icon}
        <Typography variant="h6" sx={{ wordBreak: "break-word" }}>
          {value ?? "-"}
        </Typography>
        {copyable && value ? (
          <Tooltip title="Copiar">
            <IconButton
              size="small"
              onClick={() => copy(value)}
              aria-label={`Copiar ${label}`}
            >
              <ContentCopyIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        ) : null}
      </Stack>
    </Box>
  );
}
