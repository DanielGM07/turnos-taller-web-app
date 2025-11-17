import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";

export default function VehiclesList({ items = [] }) {
  return (
    <List>
      {items.map((v) => (
        <ListItem key={v.id || v.plate} sx={{ borderRadius: 2, mb: 1 }}>
          <ListItemIcon>
            <DirectionsCarFilledIcon />
          </ListItemIcon>
          <ListItemText
            primary={`${v.brand || v.make || "Vehículo"} ${v.model || ""} ${
              v.year || ""
            }`.trim()}
            secondary={`Patente: ${
              v.plate || v.license_plate || "-"
            }${v.color ? ` • Color: ${v.color}` : ""}`}
          />
        </ListItem>
      ))}
    </List>
  );
}
