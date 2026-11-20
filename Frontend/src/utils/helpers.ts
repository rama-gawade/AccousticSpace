


export const formatConfidence = (value: number): string =>
  `${value.toFixed(2)}%`;

export const formatDate = (date: string): string =>
  new Date(date).toLocaleString();

export const getPredictionColor = (
  prediction: string
): "success" | "error" =>
  prediction.toLowerCase() === "real"
    ? "success"
    : "error";

export const getRiskColor = (
  risk: string
): "success" | "warning" | "error" => {
  switch (risk.toLowerCase()) {
  case "high":
    return "error";

  case "medium":
    return "warning";

  default:
    return "success";
}
};