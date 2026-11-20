import { Button, Box, Paper, Typography, Chip, alpha, useTheme } from "@mui/material";
import MemoryIcon from "@mui/icons-material/Memory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import SpeedIcon from "@mui/icons-material/Speed";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";


interface HeroBannerProps {
  dashboard: {
    total: number;
    real: number;
    spoof: number;
    average_confidence: number;
  };
}


export default function HeroBanner({ dashboard }: HeroBannerProps) {
  const theme = useTheme();


  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: "#FFFFFF",
        border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
        p: { xs: 3, md: 4 },
        mb: 4,
        position: "relative",
        boxShadow: "0 8px 30px rgba(15, 23, 42, 0.06)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.04)} 0%, ${alpha(theme.palette.secondary.main, 0.03)} 100%)`,
          pointerEvents: "none",
        }}
      />


      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", lg: "center" },
          gap: 4,
        }}
      >
        <Box sx={{ flex: 1, maxWidth: 720 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 3,
                bgcolor: alpha(theme.palette.primary.main, 0.12),
                color: theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Typography component="div" sx={{ fontSize: 26, fontWeight: 800 }}>
                🎙
              </Typography>
            </Box>


            <Box>
              <Typography
                component="div"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: 28, md: 38 },
                  lineHeight: 1.1,
                  color: theme.palette.text.primary,
                }}
              >
                AcousticSpace
              </Typography>
              <Typography component="div" sx={{ color: "text.secondary", mt: 0.5 }}>
                AI-Powered Deepfake Audio Detection Platform
              </Typography>
            </Box>
          </Box>


          <Typography
            component="div"
            sx={{
              mt: 2,
              color: "text.secondary",
              fontSize: { xs: 14, md: 15 },
              lineHeight: 1.8,
              maxWidth: 680,
            }}
          >
            Detect manipulated audio using advanced acoustic feature extraction, machine learning, waveform visualization, confidence scoring, and analytics.
          </Typography>


          <Box sx={{ display: "flex", gap: 1.2, flexWrap: "wrap", mt: 3 }}>
            <Chip icon={<MemoryIcon />} label="Machine Learning" variant="outlined" />
            <Chip icon={<DashboardIcon />} label="Dashboard" variant="outlined" />
            <Chip icon={<GraphicEqIcon />} label="Audio Analytics" variant="outlined" />
            <Chip icon={<SpeedIcon />} label="Fast Analysis" variant="outlined" />
          </Box>


          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
            <Button variant="contained" startIcon={<TrendingUpIcon />} sx={{ px: 3.5, py: 1.2 }}>
              Start Analyzing
            </Button>
            <Typography component="div" sx={{ fontSize: 13, color: "text.secondary" }}>
              No signup required
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}