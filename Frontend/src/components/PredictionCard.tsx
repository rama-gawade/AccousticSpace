import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  alpha,
  useTheme,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import VerifiedIcon from "@mui/icons-material/Verified";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AutorenewIcon from "@mui/icons-material/Autorenew";

interface PredictionCardProps {
  prediction: string;
  confidence: number;
  risk: string;
  recommendation: string;
  downloadReport: () => void;
}

export default function PredictionCard({
  prediction,
  confidence,
  risk,
  recommendation,
  downloadReport,
}: PredictionCardProps) {
  const theme = useTheme();

  const isReal = prediction.toLowerCase().includes("real");
  const statusColor = isReal ? theme.palette.success.main : theme.palette.error.main;
  const statusBg = isReal
    ? alpha(theme.palette.success.main, 0.08)
    : alpha(theme.palette.error.main, 0.08);

  const statusIcon = isReal ? (
    <VerifiedIcon sx={{ fontSize: 18 }} />
  ) : (
    <WarningAmberIcon sx={{ fontSize: 18 }} />
  );

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        mt: 4,
        p: 3,
        borderRadius: 4,
        bgcolor: "#FFFFFF",
        border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
        boxShadow: "0 8px 30px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
          mb: 2.5,
        }}
      >
        <Box>
          <Typography component="div" sx={{ fontSize: 18, fontWeight: 800 }}>
            AI Analysis Result
          </Typography>
          <Typography component="div" sx={{ fontSize: 13, color: "text.secondary", mt: 0.25 }}>
            Final classification and recommendation summary
          </Typography>
        </Box>

        <Box
          sx={{
            px: 1.3,
            py: 0.55,
            borderRadius: 999,
            bgcolor: statusBg,
            color: statusColor,
            fontSize: 11.5,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: 0.7,
          }}
        >
          {statusIcon}
          {prediction}
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
          gap: 2.5,
        }}
      >
        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            bgcolor: "#FAFBFC",
            border: `1px solid ${alpha(theme.palette.divider, 0.85)}`,
          }}
        >
          <Typography component="div" sx={{ fontSize: 12.5, color: "text.secondary", fontWeight: 700 }}>
            Confidence Score
          </Typography>
          <Typography
            component="div"
            sx={{
              mt: 0.8,
              fontSize: 34,
              fontWeight: 900,
              lineHeight: 1,
              color: statusColor,
            }}
          >
            {confidence.toFixed(1)}%
          </Typography>

          <Box
            sx={{
              mt: 2,
              p: 2,
              borderRadius: 3,
              bgcolor: alpha(theme.palette.primary.main, 0.04),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
            }}
          >
            <Typography component="div" sx={{ fontSize: 12.5, color: "text.secondary", fontWeight: 700, mb: 0.6 }}>
              Risk Level
            </Typography>
            <Typography component="div" sx={{ fontSize: 15.5, fontWeight: 700, color: theme.palette.text.primary }}>
              {risk || "-"}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            bgcolor: "#FAFBFC",
            border: `1px solid ${alpha(theme.palette.divider, 0.85)}`,
          }}
        >
          <Typography component="div" sx={{ fontSize: 12.5, color: "text.secondary", fontWeight: 700 }}>
            Recommendation
          </Typography>

          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2, mt: 1.2 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.warning.main, 0.1),
                color: theme.palette.warning.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <AutorenewIcon sx={{ fontSize: 20 }} />
            </Box>

            <Typography
              component="div"
              sx={{
                fontSize: 14.5,
                lineHeight: 1.8,
                color: theme.palette.text.primary,
              }}
            >
              {recommendation || "-"}
            </Typography>
          </Box>

          <Box sx={{ mt: 2.2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={downloadReport}
              sx={{
                px: 2.5,
                py: 1.05,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Download Report
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}