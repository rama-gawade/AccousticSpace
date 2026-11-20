



import {
  Box,
  Paper,
  Typography,
} from "@mui/material";

export default function AnalyticsOverview() {
  return (
    <Paper
      elevation={6}
      sx={{
        mt: 5,
        p: 4,
        borderRadius: 4,
        background:
          "linear-gradient(to right,#f8fbff,#ffffff)",
      }}
    >
      <Typography
  variant="h4"
  sx={{
    fontWeight: "bold",
    mb: 2,
  }}
>
  📈 AI Analytics Overview
</Typography>

      <Typography
        color="text.secondary"
      >
        Explore prediction trends, confidence distribution,
        spoof detection statistics, and AI insights generated
        from uploaded audio files.
      </Typography>
    </Paper>
  );
}