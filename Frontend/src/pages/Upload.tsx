import { useEffect, useState } from "react";
import { Box, Paper, Button, Container } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import HeroBanner from "../components/HeroBanner";
import UploadCard from "../components/UploadCard";
import SelectedFileCard from "../components/SelectedFileCard";
import AudioWaveform from "../components/AudioWaveform";
import StatisticsCard from "../components/StatisticsCard";
import LoadingCard from "../components/LoadingCard";
import AlertCard from "../components/AlertCard";
import PredictionCard from "../components/PredictionCard";
import AnalyticsGrid from "../components/AnalyticsGrid";
import PredictionChart from "../components/PredictionChart";
import RecentActivity from "../components/RecentActivity";
import HistoryTable from "../components/HistoryTable";
import ConfidenceChart from "../components/ConfidenceChart";

import api from "../services/api";
import { uploadAudio as uploadAudioService } from "../services/uploadService";
import { getDashboard } from "../services/dashboardService";
import { getHistory } from "../services/historyService";

import type { DashboardData, HistoryItem, ChartItem } from "../types";

function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [fileFormat, setFileFormat] = useState("");

  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [recommendation, setRecommendation] = useState("");
  const [risk, setRisk] = useState("");
  const [message, setMessage] = useState("");

  const [duration, setDuration] = useState("");
  const [sampleRate, setSampleRate] = useState("");
  const [analysisTime, setAnalysisTime] = useState("");
  const [rmsEnergy, setRmsEnergy] = useState("");
  const [zeroCrossingRate, setZeroCrossingRate] = useState("");
  const [spectralCentroid, setSpectralCentroid] = useState("");
  const [spectralBandwidth, setSpectralBandwidth] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const [dashboard, setDashboard] = useState<DashboardData>({
    total: 0,
    real: 0,
    spoof: 0,
    average_confidence: 0,
  });

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [chartData, setChartData] = useState<ChartItem[]>([]);

  const formatFileType = (name: string) => {
    const ext = name.split(".").pop()?.toUpperCase();
    return ext || "-";
  };

  const resetAnalysis = () => {
    setPrediction("");
    setConfidence(0);
    setRecommendation("");
    setRisk("");
    setDuration("");
    setSampleRate("");
    setAnalysisTime("");
    setRmsEnergy("");
    setZeroCrossingRate("");
    setSpectralCentroid("");
    setSpectralBandwidth("");
    setMessage("");
  };

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  const loadHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (error) {
      console.error("History Error:", error);
    }
  };

  const loadChartData = async () => {
    try {
      const response = await api.get("/charts/confidence");
      setChartData(response.data);
    } catch (error) {
      console.error("Chart Error:", error);
    }
  };

  useEffect(() => {
    loadDashboard();
    loadHistory();
    loadChartData();
  }, []);

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const removeFile = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    if (file) {
      const audio = document.querySelector("audio");
      if (audio) {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      }
    }
    setFile(null);
    setAudioUrl("");
    setFileFormat("");
    resetAnalysis();
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please choose an audio file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setMessage("");
      setLoading(true);
      setIsUploading(true);
      setUploadProgress(0);
      setLoadingStep("Uploading Audio...");

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 90) setUploadProgress(progress);
      }, 200);

      const result = await uploadAudioService(formData);

      clearInterval(interval);
      setUploadProgress(100);

      setPrediction(result.prediction);
      setConfidence(result.confidence);
      setRecommendation(result.recommendation);
      setRisk(result.risk);

      setDuration(result.duration);
      setSampleRate(result.sample_rate);
      setAnalysisTime(result.analysis_time);

      setRmsEnergy(result.rms_energy);
      setZeroCrossingRate(result.zero_crossing_rate);
      setSpectralCentroid(result.spectral_centroid);
      setSpectralBandwidth(result.spectral_bandwidth);

      setLoadingStep("Extracting Audio Features...");
      await new Promise((resolve) => setTimeout(resolve, 600));

      setLoadingStep("Computing Audio Statistics...");
      await new Promise((resolve) => setTimeout(resolve, 600));

      setLoadingStep("Running AI Model...");
      await new Promise((resolve) => setTimeout(resolve, 600));

      setLoadingStep("Generating Report...");
      await new Promise((resolve) => setTimeout(resolve, 600));

      setLoading(false);
      setIsUploading(false);
      setMessage("Successful");

      loadDashboard();
      loadHistory();
      loadChartData();
    } catch (error) {
      console.error(error);
      setLoading(false);
      setIsUploading(false);
      setMessage("Failed");
    }
  };

  const downloadReport = async () => {
    try {
      const response = await api.get("/upload/report", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = "AcousticSpace_Report.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
      alert("Unable to download report.");
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      setAudioUrl(URL.createObjectURL(selectedFile));
      setFileFormat(formatFileType(selectedFile.name));
      resetAnalysis();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setAudioUrl(URL.createObjectURL(selectedFile));
    setFileFormat(formatFileType(selectedFile.name));
    resetAnalysis();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#eef5ff 0%,#f8fbff 100%)",
        py: 5,
        px: 2,
      }}
    >
      <Container maxWidth={false} disableGutters>
        <Paper
          elevation={12}
          sx={{
            maxWidth: 1350,
            mx: "auto",
            p: { xs: 2.5, md: 4 },
            borderRadius: 5,
            bgcolor: "#fff",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <HeroBanner dashboard={dashboard} />
          </Box>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: "100%" }}>
              <UploadCard
                dragActive={dragActive}
                handleDrag={handleDrag}
                handleDrop={handleDrop}
                onFileSelect={handleFileSelect}
              />
            </Box>

            {file && (
              <Box sx={{ mt: 2, width: "100%", maxWidth: "100%" }}>
                <SelectedFileCard file={file} removeFile={removeFile} />
              </Box>
            )}
          </Box>

          {audioUrl && (
            <Box sx={{ mt: 4 }}>
              <AudioWaveform audioUrl={audioUrl} />
            </Box>
          )}

          {(duration || sampleRate) && (
            <Box sx={{ mt: 4 }}>
              <StatisticsCard
                duration={duration}
                sampleRate={sampleRate}
                fileFormat={fileFormat}
              />
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<CloudUploadIcon />}
              onClick={handleUpload}
              disabled={!file || loading}
              sx={{
                px: 7,
                py: 1.8,
                borderRadius: 4,
                fontWeight: "bold",
                fontSize: 17,
                textTransform: "none",
              }}
            >
              {loading ? "Analyzing..." : "Analyze Audio"}
            </Button>
          </Box>

          <LoadingCard
            loading={loading}
            loadingStep={loadingStep}
            uploadProgress={uploadProgress}
            isUploading={isUploading}
          />

          <AlertCard message={message} />

          {prediction && (
            <PredictionCard
              prediction={prediction}
              confidence={confidence}
              risk={risk}
              recommendation={recommendation}
              downloadReport={downloadReport}
            />
          )}

          <Paper
            elevation={6}
            sx={{
              mt: 6,
              p: 4,
              borderRadius: 5,
              bgcolor: "#fafcff",
            }}
          >
      

            <Box sx={{ mt: 5 }}>
              <AnalyticsGrid
                total={dashboard.total}
                real={dashboard.real}
                spoof={dashboard.spoof}
                averageConfidence={dashboard.average_confidence}
              />
            </Box>

            <Box sx={{ mt: 5 }}>
              <RecentActivity history={history} />
            </Box>

            <Box
              sx={{
                mt: 5,
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                gap: 3,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <PredictionChart real={dashboard.real} spoof={dashboard.spoof} />
              </Box>

              <Box sx={{ flex: 1 }}>
                {chartData.length > 0 && <ConfidenceChart data={chartData} />}
              </Box>
            </Box>
          </Paper>

          <Paper
            elevation={6}
            sx={{
              mt: 6,
              p: 4,
              borderRadius: 5,
            }}
          >
            <HistoryTable
              history={history}
              loadHistory={loadHistory}
              loadDashboard={loadDashboard}
              loadChartData={loadChartData}
            />
          </Paper>
        </Paper>
      </Container>
    </Box>
  );
}

export default Upload;