import { Box, Paper, Typography, alpha, useTheme, Divider } from "@mui/material";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";

interface StatisticsCardProps {
  duration: string;
  sampleRate: string;
  fileFormat: string;
}

export default function StatisticsCard({
  duration,
  sampleRate,
  fileFormat,
}: StatisticsCardProps) {
  const theme = useTheme();

  const stats = [
    { label: "Duration", value: duration },
    { label: "Sample Rate", value: sampleRate },
    { label: "File Format", value: fileFormat },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        p: 3,
        borderRadius: 4,
        bgcolor: "#FFFFFF",
        border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
        boxShadow: "0 8px 30px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.4, mb: 2.5 }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <GraphicEqIcon sx={{ fontSize: 22 }} />
        </Box>

        <Typography component="div" sx={{ fontSize: 18, fontWeight: 800 }}>
          Audio Statistics
        </Typography>
      </Box>

      <Divider sx={{ mb: 2.5 }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        {stats.map((item) => (
          <Box
            key={item.label}
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: "#FAFBFC",
              border: `1px solid ${alpha(theme.palette.divider, 0.85)}`,
              minHeight: 88,
            }}
          >
            <Typography
              component="div"
              sx={{
                fontSize: 12.5,
                color: "text.secondary",
                fontWeight: 700,
                mb: 1,
              }}
            >
              {item.label}
            </Typography>

            <Typography
              component="div"
              sx={{
                fontSize: 20,
                fontWeight: 800,
                color: theme.palette.text.primary,
              }}
            >
              {item.value || "-"}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}