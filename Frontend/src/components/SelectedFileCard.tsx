import { Box, Paper, Typography, IconButton, alpha, useTheme } from "@mui/material";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface SelectedFileCardProps {
  file: File;
  removeFile: () => void;
}

export default function SelectedFileCard({ file, removeFile }: SelectedFileCardProps) {
  const theme = useTheme();

  const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
  const fileType = file.type || "Unknown type";
  const fileExt = file.name.includes(".") ? file.name.split(".").pop()?.toUpperCase() : "FILE";

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 4,
        bgcolor: "#FFFFFF",
        border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
        boxShadow: "0 8px 30px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 0, flex: 1 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2.5,
              bgcolor: alpha(theme.palette.primary.main, 0.12),
              color: theme.palette.primary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <AudioFileIcon sx={{ fontSize: 26 }} />
          </Box>

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              <Typography component="div" sx={{ fontWeight: 700, fontSize: 15.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: { xs: "100%", md: 420 } }}>
                {file.name}
              </Typography>

              <Box sx={{ px: 1, py: 0.35, borderRadius: 999, bgcolor: alpha(theme.palette.success.main, 0.08), color: theme.palette.success.main, display: "flex", alignItems: "center", gap: 0.5 }}>
                <CheckCircleIcon sx={{ fontSize: 14 }} />
                <Typography component="span" sx={{ fontSize: 11, fontWeight: 700 }}>
                  Ready
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 0.8, display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center" }}>
              <Typography component="div" sx={{ fontSize: 12, px: 1, py: 0.4, borderRadius: 999, bgcolor: alpha(theme.palette.primary.main, 0.08), color: theme.palette.primary.main, fontWeight: 600 }}>
                {fileType}
              </Typography>

              <Typography component="div" sx={{ fontSize: 12, px: 1, py: 0.4, borderRadius: 999, bgcolor: alpha(theme.palette.info.main, 0.08), color: theme.palette.info.main, fontWeight: 600 }}>
                {fileSizeMB} MB
              </Typography>

              <Typography component="div" sx={{ fontSize: 12, px: 1, py: 0.4, borderRadius: 999, bgcolor: alpha(theme.palette.secondary.main, 0.08), color: theme.palette.secondary.main, fontWeight: 600 }}>
                {fileExt}
              </Typography>
            </Box>
          </Box>
        </Box>

        <IconButton
          onClick={removeFile}
          size="small"
          sx={{
            width: 40,
            height: 40,
            bgcolor: alpha(theme.palette.error.main, 0.08),
          }}
        >
          <DeleteIcon sx={{ color: theme.palette.error.main }} />
        </IconButton>
      </Box>
    </Paper>
  );
}