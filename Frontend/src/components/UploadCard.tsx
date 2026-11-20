import { Paper, Typography, Button, Box, alpha, useTheme } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

interface UploadCardProps {
  dragActive: boolean;
  handleDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadCard({
  dragActive,
  handleDrag,
  handleDrop,
  onFileSelect,
}: UploadCardProps) {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: "#FFFFFF",
        border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
        boxShadow: "0 8px 30px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Box
        sx={{
          p: { xs: 2.5, md: 3 },
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 2.5,
              bgcolor: alpha(theme.palette.primary.main, 0.12),
              color: theme.palette.primary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 24 }} />
          </Box>

          <Box>
            <Typography component="div" sx={{ fontWeight: 800, fontSize: 20, lineHeight: 1.1 }}>
              Upload Audio
            </Typography>
            <Typography component="div" sx={{ fontSize: 13, color: "text.secondary", mt: 0.3 }}>
              AI-Powered Deepfake Detection
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
          <Box sx={{ px: 1.25, py: 0.5, borderRadius: 999, bgcolor: alpha(theme.palette.primary.main, 0.06), border: `1px solid ${alpha(theme.palette.divider, 0.8)}`, display: "flex", alignItems: "center", gap: 0.6 }}>
            <MusicNoteIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
            <Typography component="span" sx={{ fontSize: 11, fontWeight: 600, color: "text.secondary" }}>
              WAV, MP3, FLAC, OGG
            </Typography>
          </Box>

          <Box sx={{ px: 1.25, py: 0.5, borderRadius: 999, bgcolor: alpha(theme.palette.secondary.main, 0.06), border: `1px solid ${alpha(theme.palette.divider, 0.8)}`, display: "flex", alignItems: "center", gap: 0.6 }}>
            <AutoAwesomeIcon sx={{ fontSize: 14, color: theme.palette.secondary.main }} />
            <Typography component="span" sx={{ fontSize: 11, fontWeight: 600, color: "text.secondary" }}>
              Instant Analysis
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        sx={{
          p: { xs: 3, md: 4 },
          m: 3,
          mt: 2,
          borderRadius: 3,
          textAlign: "center",
          bgcolor: dragActive ? alpha(theme.palette.primary.main, 0.04) : "#FAFBFC",
          border: dragActive
            ? `2px dashed ${theme.palette.primary.main}`
            : `2px dashed ${alpha(theme.palette.divider, 0.9)}`,
          transition: "0.2s ease",
          cursor: "pointer",
        }}
      >
        <Box sx={{ width: 72, height: 72, borderRadius: 3, mx: "auto", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: dragActive ? alpha(theme.palette.primary.main, 0.12) : "#FFFFFF", border: `1px solid ${alpha(theme.palette.divider, 0.8)}`, mb: 2 }}>
          <CloudUploadIcon sx={{ fontSize: 34, color: dragActive ? theme.palette.primary.main : theme.palette.text.secondary }} />
        </Box>

        <Typography component="div" sx={{ fontWeight: 700, color: "text.primary" }}>
          {dragActive ? "Drop Your Audio File Here" : "Drag & Drop Audio Here"}
        </Typography>

        <Typography component="div" sx={{ fontSize: 13, color: "text.secondary", mt: 0.5, mb: 2 }}>
          or click below to browse files
        </Typography>

        <Box sx={{ display: "inline-block", position: "relative" }}>
          <Button
            variant="contained"
            onClick={() => {
              const fileInput = document.getElementById("audio-file-input");
              if (fileInput) fileInput.click();
            }}
            startIcon={<CloudUploadIcon />}
            sx={{ px: 4, py: 1.15 }}
          >
            Choose Audio File
          </Button>

          <input
            id="audio-file-input"
            type="file"
            accept=".wav,.mp3,.flac,.ogg"
            onChange={onFileSelect}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              cursor: "pointer",
            }}
          />
        </Box>

        <Typography component="div" sx={{ mt: 1.5, fontSize: 11.5, color: "text.secondary" }}>
          Supports: WAV, MP3, FLAC, OGG
        </Typography>
      </Box>
    </Paper>
  );
}