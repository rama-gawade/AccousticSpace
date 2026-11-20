import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import {
  Paper,
  Typography,
  Box,
} from "@mui/material";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface Props {
  real: number;
  spoof: number;
}

export default function PredictionChart({
  real,
  spoof,
}: Props) {

  const total = real + spoof;

  const data = {
    labels: [
      "Real Audio",
      "Spoof Audio",
    ],

    datasets: [
      {
        data: [
          real,
          spoof,
        ],

        backgroundColor: [
          "#4CAF50",
          "#EF5350",
        ],

        hoverBackgroundColor: [
          "#66BB6A",
          "#E53935",
        ],

        borderWidth: 0,
        borderRadius: 8,
        spacing: 5,
      },
    ],
  };

  const options = {

    responsive: true,

    cutout: "72%",

    plugins: {

      legend: {

        position: "bottom" as const,

        labels: {

          usePointStyle: true,

          pointStyle: "circle",

          padding: 20,

          font: {
            size: 14,
            weight: "bold" as const,
          },

        },

      },

      tooltip: {

        backgroundColor: "#263238",

        padding: 12,

        cornerRadius: 8,

      },

    },

    animation: {

      animateRotate: true,

      animateScale: true,

    },

  };

  return (

    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 5,
        border: "1px solid #ECEFF1",
        background:
          "linear-gradient(180deg,#ffffff,#f8fbff)",
        boxShadow:
          "0 15px 35px rgba(0,0,0,.08)",
      }}
    >

      <Typography
        variant="h5"
        align="center"
        sx={{
          fontWeight: "bold",
          mb: 4,
        }}
      >
        📊 Prediction Distribution
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: 300,
          height: 300,
          margin: "0 auto",
        }}
      >

        <Doughnut
          data={data}
          options={options}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >

          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
            }}
          >
            {total}
          </Typography>

          <Typography
            color="text.secondary"
          >
            Total Files
          </Typography>

        </Box>

      </Box>

    </Paper>

  );
}