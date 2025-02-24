import { Box } from "@mui/material";
import { HospitalEntry } from "../../../types";
import { LocalHospital } from "@mui/icons-material";

interface PropType {
  entry: HospitalEntry;
}
const HospitalEntryDetails = ({ entry }: PropType) => {
  return (
    <Box>
      <div>
        {entry.date}{" "}
        <span>
          <LocalHospital sx={{ marginLeft: 1 }} />
        </span>
      </div>
      <div>
        <em>{entry.description}</em>
      </div>
      <div>Discharge:</div>
      <div>&nbsp;&nbsp;&nbsp;Date: {entry.discharge.date}</div>
      <div>&nbsp;&nbsp;&nbsp;Criteria: {entry.discharge.criteria}</div>
    </Box>
  );
};

export default HospitalEntryDetails;
