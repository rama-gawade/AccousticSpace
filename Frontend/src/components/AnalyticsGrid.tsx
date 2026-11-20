import { Box, Paper, Typography, alpha, useTheme, LinearProgress } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import GroupsIcon from "@mui/icons-material/Groups";
import ShieldIcon from "@mui/icons-material/Shield";
import InsightsIcon from "@mui/icons-material/Insights";

interface AnalyticsGridProps {
  total: number;
  real: number;
  spoof: number;
  averageConfidence: number;
}

export default function AnalyticsGrid({
  total,
  real,
  spoof,
  averageConfidence,
}: AnalyticsGridProps) {
  const theme = useTheme();

  const realPct = total ? ((real / total) * 100).toFixed(1) : "0.0";
  const spoofPct = total ? ((spoof / total) * 100).toFixed(1) : "0.0";

  const cards = [
    {
      label: "Total Analysis",
      value: total,
      desc: "Audio files processed",
      color: theme.palette.primary.main,
      icon: <BarChartIcon sx={{ fontSize: 22 }} />,
    },
    {
      label: "Real Audio",
      value: real,
      desc: `${realPct}% of total`,
      color: theme.palette.success.main,
      icon: <ShieldIcon sx={{ fontSize: 22 }} />,
    },
    {
      label: "Spoof Audio",
      value: spoof,
      desc: `${spoofPct}% of total`,
      color: theme.palette.error.main,
      icon: <GroupsIcon sx={{ fontSize: 22 }} />,
    },
    {
      label: "Avg Confidence",
      value: `${averageConfidence.toFixed(2)}%`,
      desc: "Model accuracy",
      color: theme.palette.info.main,
      icon: <InsightsIcon sx={{ fontSize: 22 }} />,
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
        bgcolor: "#fff",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.4, mb: 3 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
          }}
        >
          <InsightsIcon sx={{ fontSize: 24 }} />
        </Box>

        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 800, lineHeight: 1.2 }}>
            AI Analytics Overview
          </Typography>
          <Typography sx={{ fontSize: 13.5, color: "text.secondary", mt: 0.3 }}>
            Real-time insights into your audio analysis performance
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {cards.map((card) => (
          <Paper
            key={card.label}
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              bgcolor: "#fafcff",
              border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: card.color,
              }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mt: 0.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: alpha(card.color, 0.12),
                  color: card.color,
                  flexShrink: 0,
                }}
              >
                {card.icon}
              </Box>

              <Box>
                <Typography sx={{ fontSize: 13, color: "text.secondary", fontWeight: 700 }}>
                  {card.label}
                </Typography>
                <Typography sx={{ fontSize: 28, fontWeight: 900, lineHeight: 1.1 }}>
                  {card.value}
                </Typography>
              </Box>
            </Box>

            <Typography sx={{ mt: 2, fontSize: 13.5, color: "text.secondary" }}>
              {card.desc}
            </Typography>

            {card.label === "Avg Confidence" && (
              <LinearProgress
                variant="determinate"
                value={averageConfidence}
                sx={{
                  mt: 2,
                  height: 8,
                  borderRadius: 999,
                  bgcolor: alpha(card.color, 0.12),
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 999,
                    background: `linear-gradient(90deg, ${theme.palette.info.main}, ${theme.palette.primary.main})`,
                  },
                }}
              />
            )}
          </Paper>
        ))}
      </Box>
    </Paper>
  );
}