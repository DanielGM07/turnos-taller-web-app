import { useMemo } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const formatDate = (iso) => {
  if (!iso) return "-";
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(d);
};

const formatTime = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return "";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default function AppointmentsList({ items = [] }) {
  const byDate = useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          new Date(a.date || a.start || a.when) -
          new Date(b.date || b.start || b.when),
      ),
    [items],
  );

  return (
    <List>
      {byDate.map((a) => {
        const dateStr = a.date || a.start || a.when;
        const title = a.title || a.reason || a.service_name || "Turno";
        const status = (a.status || a.state || "").toLowerCase();

        return (
          <ListItem
            key={a.id || `${dateStr}-${title}`}
            sx={{ borderRadius: 2, mb: 1 }}
          >
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText
              primary={`${formatDate(dateStr)} — ${formatTime(dateStr)}`}
              secondary={title}
            />
            {status && (
              <Chip
                size="small"
                label={status}
                color={
                  status.includes("confirm")
                    ? "success"
                    : status.includes("cancel")
                      ? "error"
                      : "warning"
                }
              />
            )}
          </ListItem>
        );
      })}
    </List>
  );
}
