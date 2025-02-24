import { Box } from "@mui/material";
import { OccupationalHealthcareEntry } from "../../../types";
import { Work } from "@mui/icons-material";

interface PropType {
  entry: OccupationalHealthcareEntry;
}
const OccupationalHealthcareEntryDetails = ({ entry }: PropType) => {
  return (
    <Box>
      <div>
        {entry.date}
        <Work sx={{ marginLeft: 1, marginRight: 1 }} />
        {entry.employerName}
      </div>
      <div>
        <em>{entry.description}</em>
      </div>
      <div>diagnose by {entry.specialist}</div>
    </Box>
  );
};

export default OccupationalHealthcareEntryDetails;
