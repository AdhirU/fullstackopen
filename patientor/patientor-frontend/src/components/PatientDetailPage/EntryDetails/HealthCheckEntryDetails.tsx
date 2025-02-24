import { Box } from "@mui/material";
import { HealthCheckEntry, HealthCheckRating } from "../../../types";
import { Favorite, MedicalServices } from "@mui/icons-material";
import { assertNever } from "../../../utils";

interface PropType {
  entry: HealthCheckEntry;
}
const HealthCheckEntryDetails = ({ entry }: PropType) => {
  let heartColor;
  switch (entry.healthCheckRating) {
    case HealthCheckRating.Healthy:
      heartColor = "green";
      break;
    case HealthCheckRating.LowRisk:
      heartColor = "yellow";
      break;
    case HealthCheckRating.HighRisk:
      heartColor = "orange";
      break;
    case HealthCheckRating.CriticalRisk:
      heartColor = "red";
      break;
    default:
      assertNever(entry.healthCheckRating);
  }
  return (
    <Box>
      <div>
        {entry.date}
        <span>
          <MedicalServices sx={{ marginLeft: 1 }} />
        </span>
      </div>
      <div>
        <em>{entry.description}</em>
      </div>
      <div>
        <Favorite sx={{ color: heartColor }} />
      </div>
      <div>diagnose by {entry.specialist}</div>
    </Box>
  );
};

export default HealthCheckEntryDetails;
