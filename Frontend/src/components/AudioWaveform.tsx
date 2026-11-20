import { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";

import {
  Paper,
  Box,
  Typography,
  Button,
  Slider,
  Chip,
} from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";

interface Props {
  audioUrl: string;
}

export default function AudioWaveform({
  audioUrl,
}: Props) {
  const waveformRef = useRef<HTMLDivElement | null>(null);

  const waveSurfer = useRef<WaveSurfer | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(80);

  useEffect(() => {
    if (!waveformRef.current) return;

    waveSurfer.current?.destroy();

    waveSurfer.current = WaveSurfer.create({
      container: waveformRef.current,

      waveColor: "#90CAF9",

      progressColor: "#1976D2",

      cursorColor: "#FFFFFF",

      barWidth: 4,

      barGap: 2,

      barRadius: 6,

      height: 140,

      normalize: true,
    });

    waveSurfer.current.load(audioUrl);

    waveSurfer.current.on("ready", () => {
      setDuration(waveSurfer.current?.getDuration() || 0);
    });

    waveSurfer.current.on("timeupdate", () => {
      setCurrentTime(
        waveSurfer.current?.getCurrentTime() || 0
      );
    });

    waveSurfer.current.on("finish", () => {
      setIsPlaying(false);
    });

    return () => {
      waveSurfer.current?.destroy();
    };
  }, [audioUrl]);

  const playPause = () => {
    waveSurfer.current?.playPause();
    setIsPlaying(!isPlaying);
  };

  const stop = () => {
    waveSurfer.current?.stop();
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const restart = () => {
    waveSurfer.current?.stop();
    waveSurfer.current?.play();
    setIsPlaying(true);
  };

  const changeVolume = (
    _: Event,
    value: number | number[]
  ) => {
    const v = value as number;

    setVolume(v);

    waveSurfer.current?.setVolume(v / 100);
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);

    const sec = Math.floor(time % 60);

    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <Paper
      elevation={8}
      sx={{
        mt: 5,
        borderRadius: 5,
        overflow: "hidden",
      }}
    >
      {/* Header */}

      <Box
        sx={{
          background:
            "linear-gradient(135deg,#1976D2,#42A5F5)",
          color: "#fff",
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
          }}
        >
          🎧 Audio Preview
        </Typography>

        <Chip
          icon={<GraphicEqIcon />}
          label={
            isPlaying ? "Playing" : "Ready"
          }
          color={
            isPlaying
              ? "warning"
              : "success"
          }
        />
      </Box>

      <Box sx={{ p: 4 }}>
        {/* Waveform */}

        <Paper
          elevation={0}
          sx={{
            bgcolor: "#F5F8FC",
            borderRadius: 4,
            p: 2,
          }}
        >
          <div ref={waveformRef} />
        </Paper>

        {/* Timer */}

        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              {formatTime(currentTime)}
            </Typography>

            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              {formatTime(duration)}
            </Typography>
        </Box>

        {/* Controls */}

        <Box
          sx={{
            mt: 4,
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={
              isPlaying ? (
                <PauseIcon />
              ) : (
                <PlayArrowIcon />
              )
            }
            onClick={playPause}
            sx={{
              borderRadius: 3,
              textTransform: "none",
            }}
          >
            {isPlaying
              ? "Pause"
              : "Play"}
          </Button>

          <Button
            variant="outlined"
            color="error"
            size="large"
            startIcon={<StopIcon />}
            onClick={stop}
            sx={{
              borderRadius: 3,
              textTransform: "none",
            }}
          >
            Stop
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<RestartAltIcon />}
            onClick={restart}
            sx={{
              borderRadius: 3,
              textTransform: "none",
            }}
          >
            Restart
          </Button>
        </Box>

        {/* Volume */}

        <Box
          sx={{
            mt: 5,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <VolumeUpIcon
            color="primary"
          />

          <Slider
            value={volume}
            min={0}
            max={100}
            onChange={changeVolume}
          />

          <Typography
            sx={{
              minWidth: 40,
            }}
          >
            {volume}%
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}