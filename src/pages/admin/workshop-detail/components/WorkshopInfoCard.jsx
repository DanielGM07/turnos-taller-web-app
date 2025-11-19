import { Card, CardContent, Typography, Grid } from "@mui/material";

export default function WorkshopInfoCard({ workshop }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          {workshop.name}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Dirección:</strong> {workshop.address}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography>
              <strong>Abre:</strong> {workshop.opens_at}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography>
              <strong>Cierra:</strong> {workshop.closes_at}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
