import { useState } from "react";
import type { HistoryItem } from "../types";

import {
  formatConfidence,
  formatDate,
  getPredictionColor,
  getRiskColor,
} from "../utils/helpers";

import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  Button,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Avatar,
  LinearProgress,
  Tooltip,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History";
import VerifiedIcon from "@mui/icons-material/Verified";
import BlockIcon from "@mui/icons-material/Block";

import { deleteHistory } from "../services/historyService";

interface HistoryTableProps {
  history: HistoryItem[];
  loadHistory: () => void;
  loadDashboard: () => void;
  loadChartData: () => void;
}

export default function HistoryTable({
  history,
  loadHistory,
  loadDashboard,
  loadChartData,
}: HistoryTableProps) {
  const historyArray = Array.isArray(history) ? history : [];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredHistory = historyArray.filter((item) => {
    const matchSearch = item.filename
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "All" ? true : item.prediction === filter;

    return matchSearch && matchFilter;
  });

  const exportCSV = () => {
    const headers = [
      "Filename",
      "Prediction",
      "Confidence",
      "Risk",
      "Date",
    ];

    const rows = filteredHistory.map((item) => [
      item.filename,
      item.prediction,
      item.confidence,
      item.risk,
      item.created_at,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "analysis_history.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const deleteAnalysis = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this analysis?"
    );

    if (!confirmDelete) return;

    try {
      await deleteHistory(id);
      loadHistory();
      loadDashboard();
      loadChartData();
    } catch (error) {
      console.error(error);
      alert("Failed to delete analysis.");
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 5,
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      {/* Premium Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#fff",
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <HistoryIcon sx={{ fontSize: 32 }} />
              Analysis History
            </Typography>

            <Typography
              sx={{
                opacity: 0.9,
                fontSize: 15,
              }}
            >
              Track and manage all your audio analysis records
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={exportCSV}
            sx={{
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              py: 1.5,
              bgcolor: "rgba(255,255,255,0.2)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.3)",
              },
            }}
          >
            Export CSV
          </Button>
        </Box>
      </Box>

      {/* Search & Filter */}
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "#fafafa",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <TextField
            placeholder="Search audio files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              flex: 1,
              minWidth: 250,
              bgcolor: "background.paper",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(_, value) => {
              if (value) setFilter(value);
            }}
            sx={{
              "& .MuiToggleButton-root": {
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
              },
            }}
          >
            <ToggleButton value="All">All</ToggleButton>
            <ToggleButton value="Real">
              <VerifiedIcon sx={{ mr: 0.5, fontSize: 18 }} />
              Real
            </ToggleButton>
            <ToggleButton value="Spoof">
              <BlockIcon sx={{ mr: 0.5, fontSize: 18 }} />
              Spoof
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: "#f8f9fa",
                "& th": {
                  fontWeight: 600,
                  fontSize: 13,
                  color: "text.secondary",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  py: 2,
                },
              }}
            >
              <TableCell>File Name</TableCell>
              <TableCell>Prediction</TableCell>
              <TableCell>Confidence</TableCell>
              <TableCell>Risk Level</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item) => (
                <TableRow
                  key={item.id}
                  hover
                  sx={{
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "#f5f7ff",
                      "& .MuiTableCell-root": {
                        color: "primary.main",
                      },
                    },
                  }}
                >
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: item.prediction === "Real" ? "#4caf50" : "#f44336",
                          width: 36,
                          height: 36,
                        }}
                      >
                        {item.prediction === "Real" ? (
                          <VerifiedIcon sx={{ fontSize: 20 }} />
                        ) : (
                          <BlockIcon sx={{ fontSize: 20 }} />
                        )}
                      </Avatar>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: 14,
                          }}
                        >
                          {item.filename}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          Audio Analysis
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={item.prediction}
                      color={getPredictionColor(item.prediction)}
                      sx={{
                        fontWeight: 600,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        minWidth: 150,
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={item.confidence}
                          sx={{
                            height: 6,
                            borderRadius: 1,
                            bgcolor: "rgba(0,0,0,0.1)",
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 1,
                              bgcolor:
                                item.confidence >= 80
                                  ? "#4caf50"
                                  : item.confidence >= 60
                                  ? "#ff9800"
                                  : "#f44336",
                            },
                          }}
                        />
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 14,
                          minWidth: 50,
                          textAlign: "right",
                        }}
                      >
                        {item.confidence.toFixed(1)}%
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={item.risk}
                      color={getRiskColor(item.risk)}
                      sx={{
                        fontWeight: 600,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        textTransform: "capitalize",
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "text.secondary",
                      }}
                    >
                      {formatDate(item.created_at)}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Tooltip title="Delete Analysis">
                      <IconButton
                        color="error"
                        onClick={() => deleteAnalysis(item.id)}
                        sx={{
                          "&:hover": {
                            bgcolor: "error.light",
                            color: "#fff",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{ py: 8 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <HistoryIcon
                      sx={{
                        fontSize: 64,
                        color: "text.secondary",
                        opacity: 0.3,
                      }}
                    />
                    <Typography
                      variant="h6"
                      color="text.secondary"
                    >
                      No Analysis History Found
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{ maxWidth: 400 }}
                    >
                      Upload an audio file to begin analysis and track your detection history.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}