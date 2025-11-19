import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Stack,
} from "@mui/material";

export default function MechanicInfoCard({ mechanic }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          {mechanic.first_name} {mechanic.last_name}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Email:</strong> {mechanic.email}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Estado:</strong> {mechanic.status}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Comisión:</strong> {mechanic.commission_percentage}%
            </Typography>
          </Grid>
        </Grid>

        <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap">
          {(mechanic.specialties || []).map((s) => (
            <Chip key={s} label={s} color="primary" variant="outlined" />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
