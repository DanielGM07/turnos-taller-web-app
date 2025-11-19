import { Card, CardContent, Typography, Chip, Stack } from "@mui/material";

export default function MechanicSpecialties({ mechanic }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Especialidades
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          {(mechanic.specialties || []).map((sp) => (
            <Chip key={sp} label={sp} color="primary" variant="outlined" />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
