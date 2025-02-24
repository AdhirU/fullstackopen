import { Box, Typography } from "@mui/material";
import { Gender, NewEntry, Patient } from "../../types";
import { Female, Male, Transgender } from "@mui/icons-material";
import EntryDetails from "./EntryDetails";
import HealthCheckEntryForm from "./HealthCheckEntryForm";

interface PropType {
  patient: Patient | undefined | null;
  addEntry: (entryObj: NewEntry, id: string) => Promise<void>;
}

const PatientDetailPage = ({ patient, addEntry }: PropType) => {
  if (!patient) {
    return null;
  }

  let genderIcon;
  switch (patient.gender) {
    case Gender.Male:
      genderIcon = <Male />;
      break;
    case Gender.Female:
      genderIcon = <Female />;
      break;
    default:
      genderIcon = <Transgender />;
  }

  return (
    <div>
      <Typography variant="h4" marginTop="0.5em" marginBottom="0.5em">
        {patient.name} {genderIcon}
      </Typography>
      {patient.ssn ? <Box>ssn: {patient.ssn}</Box> : null}
      <Box>occupation: {patient.occupation}</Box>
      <HealthCheckEntryForm addEntry={addEntry} patientId={patient.id} />
      <Typography variant="h6" marginTop="0.5em" marginBottom="0.5em">
        entries
      </Typography>
      {patient.entries.map((e, idx) => (
        <Box
          border="solid black 1px"
          borderRadius={4}
          padding={1}
          marginBottom={1}
          key={idx}
        >
          <EntryDetails entry={e} />
        </Box>
      ))}
    </div>
  );
};

export default PatientDetailPage;
