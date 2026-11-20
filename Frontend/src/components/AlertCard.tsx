import {
  Alert,
  AlertTitle,
  Box,
  Fade,
} from "@mui/material";

interface Props {
  message: string;
}

export default function AlertCard({
  message,
}: Props) {

  if (!message) return null;

  const severity =
    message.includes("Successful")
      ? "success"
      : message.includes("Failed")
      ? "error"
      : "warning";

  const title =
    severity === "success"
      ? "Analysis Completed"
      : severity === "error"
      ? "Analysis Failed"
      : "Notice";

  return (
    <Fade
      in={Boolean(message)}
      timeout={700}
    >
      <Box
        sx={{
          mt: 4,
        }}
      >
        <Alert
          severity={severity}
          sx={{
            borderRadius: 3,
          }}
        >
          <AlertTitle>
            {title}
          </AlertTitle>

          {severity === "error" ? (
            <>
              {message}

              <ul
                style={{
                  marginTop: 8,
                  paddingLeft: 20,
                }}
              >
                <li>Backend server is running</li>
                <li>Audio file is valid</li>
                <li>Network connection</li>
                <li>Model is loaded correctly</li>
              </ul>
            </>
          ) : (
            message
          )}
        </Alert>
      </Box>
    </Fade>
  );
}