import { Box, Paper, Typography, LinearProgress, Stack, Chip, alpha, useTheme } from "@mui/material";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

interface LoadingCardProps {
  loading: boolean;
  loadingStep: string;
  uploadProgress: number;
  isUploading: boolean;
}

export default function LoadingCard({
  loading,
  loadingStep,
  uploadProgress,
  isUploading,
}: LoadingCardProps) {
  const theme = useTheme();

  if (!loading && !isUploading) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 4,
        border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
        background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.04)} 0%, #ffffff 100%)`,
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
      }}
    >
      <Stack spacing={2.2}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha(theme.palette.primary.main, 0.12),
              color: theme.palette.primary.main,
              flexShrink: 0,
            }}
          >
            <AutoGraphIcon sx={{ fontSize: 24 }} />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 16, fontWeight: 800, lineHeight: 1.2 }}>
              AI Analysis in progress
            </Typography>
            <Typography sx={{ fontSize: 13.5, color: "text.secondary", mt: 0.5 }}>
              {loadingStep || "Preparing analysis..."}
            </Typography>
          </Box>

          <Chip
            label={`${Math.min(uploadProgress, 100)}%`}
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 700 }}
          />
        </Box>

        <Box>
          <LinearProgress
            variant="determinate"
            value={Math.min(uploadProgress, 100)}
            sx={{
              height: 10,
              borderRadius: 999,
              bgcolor: alpha(theme.palette.primary.main, 0.08),
              "& .MuiLinearProgress-bar": {
                borderRadius: 999,
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography sx={{ fontSize: 12.5, color: "text.secondary" }}>
              Uploading and analyzing your audio
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: "text.secondary" }}>
              Please wait
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
}