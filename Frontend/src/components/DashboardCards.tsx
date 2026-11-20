import { Box, Paper, Typography, alpha, useTheme } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InsightsIcon from "@mui/icons-material/Insights";

interface DashboardCardsProps {
  total: number;
  real: number;
  spoof: number;
  averageConfidence: number;
}

export default function DashboardCards({
  total,
  real,
  spoof,
  averageConfidence,
}: DashboardCardsProps) {
  const theme = useTheme();

  const cards = [
    {
      label: "Total Audios",
      value: total,
      icon: <GroupsIcon />,
      color: theme.palette.primary.main,
    },
    {
      label: "Real",
      value: real,
      icon: <CheckCircleIcon />,
      color: theme.palette.success.main,
    },
    {
      label: "Spoof",
      value: spoof,
      icon: <WarningAmberIcon />,
      color: theme.palette.error.main,
    },
    {
      label: "Avg Confidence",
      value: `${averageConfidence}%`,
      icon: <InsightsIcon />,
      color: theme.palette.info.main,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 2.5,
      }}
    >
      {cards.map((card) => (
        <Paper
          key={card.label}
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 4,
            border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
            background: `linear-gradient(180deg, #ffffff 0%, ${alpha(card.color, 0.04)} 100%)`,
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: 3,
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

            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: 13, color: "text.secondary", fontWeight: 700 }}>
                {card.label}
              </Typography>
              <Typography sx={{ fontSize: 26, fontWeight: 800, lineHeight: 1.1 }}>
                {card.value}
              </Typography>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}