// src/components/common/RatingStars.jsx
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { Star, StarHalf, StarBorder } from "@mui/icons-material";

export default function RatingStars({ value, max = 10 }) {
  const safeValue =
    typeof value === "number" && !Number.isNaN(value) ? value : 0;

  const clamped = Math.min(Math.max(safeValue, 0), max); // 0..10
  const fullStars = Math.floor(clamped / 2); // 2 pts = 1 estrella llena
  const hasHalf = clamped % 2 === 1; // 1,3,5,7,9 → media
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} fontSize="small" />);
  }
  if (hasHalf) {
    stars.push(<StarHalf key="half" fontSize="small" />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<StarBorder key={`empty-${i}`} fontSize="small" />);
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
      <Box sx={{ display: "flex" }}>{stars}</Box>
      <Typography variant="body2" color="text.secondary">
        {clamped}/10
      </Typography>
    </Box>
  );
}

RatingStars.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
};
