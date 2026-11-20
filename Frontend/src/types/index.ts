export interface HistoryItem {
  id: number;
  filename: string;
  prediction: string;
  confidence: number;
  risk: string;
  created_at: string;
}

export interface DashboardData {
  total: number;
  real: number;
  spoof: number;
  average_confidence: number;
}

export interface ChartData {
  labels: string[];
  values: number[];
}

export interface UploadResponse {
  prediction: string;
  confidence: number;
  risk: string;
  filename: string;
}

export interface DashboardCardProps {
  total: number;
  real: number;
  spoof: number;
  averageConfidence: number;
}

// Add this:
export interface ChartItem {
  id: number | string;
  confidence: number;
}