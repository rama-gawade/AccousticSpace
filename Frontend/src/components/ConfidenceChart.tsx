import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

import type { ChartItem } from "../types";


import type { ChartOptions } from "chart.js"; 


import {
  Paper,
  Typography,
  Box,
} from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Props {
  data: ChartItem[];
}

export default function ConfidenceChart({ data }: Props) {

  const chartData = {
    labels: data.map((item) => `#${item.id}`),

    datasets: [
      {
        label: "Confidence (%)",

        data: data.map((item) => item.confidence),

        borderColor: "#1976D2",

        backgroundColor: "rgba(25,118,210,0.18)",

        fill: true,

        tension: 0.45,

        borderWidth: 4,

        pointRadius: 5,

        pointHoverRadius: 8,

        pointBackgroundColor: "#1976D2",

        pointBorderColor: "#ffffff",

        pointBorderWidth: 3,

        pointHoverBackgroundColor: "#42A5F5",
      },
    ],
  };

  const options: ChartOptions<"line"> = {

    responsive: true,

    maintainAspectRatio: false,

    interaction: {
      mode: "index" as const,
      intersect: false,
    },

    plugins: {

      legend: {

        position: "top" as const,

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

        titleColor: "#fff",

        bodyColor: "#fff",

        padding: 12,

        cornerRadius: 10,

      },

    },

    scales: {

      y: {

        beginAtZero: true,

        max: 100,

        grid: {
          color: "#ECEFF1",
        },

        ticks: {
  callback: (value) => `${value}%`,
},
      },

      x: {

        grid: {
          display: false,
        },

      },

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
        📈 Confidence Trend
      </Typography>

      <Box
        sx={{
          height: 340,
        }}
      >
        <Line
          data={chartData}
          options={options}
        />
      </Box>

    </Paper>

  );
}