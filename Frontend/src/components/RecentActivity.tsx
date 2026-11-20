import { Box, Paper, Typography, Divider, alpha, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

type HistoryItem = {
  id?: number | string;
  filename?: string;
  file_name?: string;
  prediction?: string;
  confidence?: number;
  created_at?: string;
  timestamp?: string;
};

interface RecentActivityProps {
  history: HistoryItem[];
}

export default function RecentActivity({ history }: RecentActivityProps) {
  const theme = useTheme();
  const items = history?.slice(0, 5) || [];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        bgcolor: "#FFFFFF",
        border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2.5 }}>
        <Box>
          <Typography component="div" sx={{ fontSize: 18, fontWeight: 800, color: theme.palette.text.primary }}>
            Recent Activity
          </Typography>
          <Typography component="div" sx={{ fontSize: 13, color: "text.secondary", mt: 0.3 }}>
            Latest analysis updates in your dashboard
          </Typography>
        </Box>

        <Box
          sx={{
            px: 1.2,
            py: 0.5,
            borderRadius: 999,
            fontSize: 11.5,
            fontWeight: 700,
            bgcolor: alpha(theme.palette.primary.main, 0.08),
            color: theme.palette.primary.main,
          }}
        >
          {items.length} items
        </Box>
      </Box>

      <Divider sx={{ mb: 1.5 }} />

      {items.length === 0 ? (
        <Box sx={{ py: 4, textAlign: "center" }}>
          <Typography component="div" sx={{ color: "text.secondary", fontSize: 14 }}>
            No recent activity yet.
          </Typography>
        </Box>
      ) : (
        <Box>
          {items.map((item, index) => {
            const name = item.filename || item.file_name || "Unknown file";
            const prediction = (item.prediction || "Pending").toString();
            const confidence =
              typeof item.confidence === "number"
                ? `${item.confidence.toFixed(1)}%`
                : "-";
            const time = item.created_at || item.timestamp || "";

            const isReal = prediction.toLowerCase().includes("real");
            const statusColor = isReal
              ? theme.palette.success.main
              : theme.palette.warning.main;
            const statusBg = isReal
              ? alpha(theme.palette.success.main, 0.1)
              : alpha(theme.palette.warning.main, 0.1);

            return (
              <Box key={item.id ?? index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    py: 1.7,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0, flex: 1 }}>
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        bgcolor: alpha(theme.palette.primary.main, 0.06),
                        border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
                      }}
                    >
                      <ArticleOutlinedIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
                    </Box>

                    <Box sx={{ minWidth: 0, flex: 1, textAlign: "left" }}>
                      <Typography
                        component="div"
                        sx={{
                          fontWeight: 700,
                          fontSize: 14.5,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          color: theme.palette.text.primary,
                        }}
                      >
                        {name}
                      </Typography>

                      <Typography
                        component="div"
                        sx={{
                          fontSize: 12,
                          color: "text.secondary",
                          mt: 0.35,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {time ? `Analyzed on ${time}` : "Recently analyzed"}
                      </Typography>

                      <Typography
                        component="div"
                        sx={{
                          fontSize: 12,
                          color: "text.secondary",
                          mt: 0.2,
                        }}
                      >
                        Confidence {confidence}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        px: 1.2,
                        py: 0.45,
                        borderRadius: 999,
                        fontSize: 11.5,
                        fontWeight: 700,
                        bgcolor: statusBg,
                        color: statusColor,
                      }}
                    >
                      {isReal ? (
                        <CheckCircleIcon sx={{ fontSize: 14 }} />
                      ) : (
                        <AccessTimeIcon sx={{ fontSize: 14 }} />
                      )}
                      {prediction}
                    </Box>
                  </Box>
                </Box>

                {index < items.length - 1 && <Divider />}
              </Box>
            );
          })}
        </Box>
      )}
    </Paper>
  );
}