import {
  Stack,
  Button,
  TextField,
  Typography,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormLabel,
  OutlinedInput,
  Input,
} from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { NewEntry, EntryType, NewBaseEntry } from "../../types";
import axios from "axios";
import diagnosisService from "../../services/diagnoses";

interface PropType {
  addEntry: (entryObj: NewEntry, id: string) => Promise<void>;
  patientId: string;
}

interface ValidationError {
  error: {
    code: string;
    message: string;
    validation: string;
    path: string[];
  }[];
}

const HealthCheckEntryForm = ({ addEntry, patientId }: PropType) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [type, setType] = useState(EntryType.HealthCheck);
  const [employerName, setEmployerName] = useState("");
  const [sickLeave, setSickLeave] = useState({ startDate: "", endDate: "" });
  const [discharge, setDischarge] = useState({ date: "", criteria: "" });
  const [diagnosisCodeList, setDiagnosisCodeList] = useState<string[]>([]);

  useEffect(() => {
    const fetchDiagnosisCodes = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnosisCodeList(diagnoses.map((d) => d.code));
    };
    fetchDiagnosisCodes();
  }, []);

  const getNewEntry = (): NewEntry => {
    const baseEntryDetails: NewBaseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes,
    };

    let entryDetails: NewEntry;

    switch (type) {
      case EntryType.HealthCheck:
        entryDetails = {
          ...baseEntryDetails,
          type: EntryType.HealthCheck,
          healthCheckRating,
        };
        break;
      case EntryType.Hospital:
        entryDetails = {
          ...baseEntryDetails,
          type: EntryType.Hospital,
          discharge,
        };
        break;
      case EntryType.OccupationalHealthcare:
        entryDetails = {
          ...baseEntryDetails,
          type: EntryType.OccupationalHealthcare,
          employerName,
          sickLeave,
        };
        break;
    }
    return entryDetails;
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const entryDetails = getNewEntry();

    console.log(entryDetails);
    try {
      await addEntry(entryDetails, patientId);
    } catch (error: unknown) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        if (error.response) {
          setErrorMessage(
            error.response.data.error
              .map((e) => `Invalid ${e.path[0]}`)
              .join(". ") + "."
          );
        } else {
          setErrorMessage(error.message);
        }
      } else {
        console.log(error);
      }
    }
  };

  const formReset = () => {
    setDescription("");
    setSpecialist("");
    setHealthCheckRating(0);
    setDiagnosisCodes([]);
    setErrorMessage("");
    setEmployerName("");
    setSickLeave({ startDate: "", endDate: "" });
    setDischarge({ date: "", criteria: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Stack
        padding={1}
        paddingTop={4}
        border="dashed 0.5px"
        marginTop={1}
        marginBottom={1}
        spacing={1}
      >
        <Typography variant="h6">New HealthCheck Entry</Typography>
        <InputLabel id="entry-type-label">Entry Type</InputLabel>
        <Select
          labelId="entry-type-label"
          value={type}
          onChange={({ target }) => {
            formReset();
            setType(target.value as EntryType);
          }}
        >
          {Object.values(EntryType).map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
        <div>
          <TextField
            fullWidth
            variant="standard"
            label="Description"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>
        <div>
          {/* <DatePicker
              label="Date"
              format="YYYY-MM-DD"
              onChange={(date) => setDate(date?.toISOString().split("T")[0])}
            /> */}
          <InputLabel id="date-label">Date</InputLabel>
          <Input
            type="date"
            id="date-label"
            fullWidth
            onChange={({ target }) => setDate(target.value)}
          />
          {/* fullWidth
            variant="standard"
            label="Date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          /> */}
        </div>
        <div>
          <TextField
            fullWidth
            variant="standard"
            label="Specialist"
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
        </div>
        {type === EntryType.HealthCheck && (
          <div>
            <TextField
              fullWidth
              variant="standard"
              label="Healthcheck rating"
              type="number"
              value={healthCheckRating}
              onChange={({ target }) =>
                setHealthCheckRating(Number(target.value))
              }
            />
          </div>
        )}
        {type === EntryType.OccupationalHealthcare && (
          <div>
            <div>
              <TextField
                fullWidth
                variant="standard"
                label="Employer Name"
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
            </div>
            <FormLabel sx={{ paddingTop: 1, paddingBottom: 1 }}>
              Sick Leave
            </FormLabel>
            <div>
              <FormControl sx={{ width: "90%" }}>
                {/* <TextField
                sx={{ ml: 2 }}
                variant="standard"
                label="start"
                value={sickLeave.startDate}
                onChange={({ target }) =>
                  setSickLeave({ ...sickLeave, startDate: target.value })
                }
              /> */}
                <FormLabel id="sick-leave-start-date">start</FormLabel>
                <Input
                  id="sick-leave-start-date"
                  sx={{ ml: 2 }}
                  type="date"
                  value={sickLeave.startDate}
                  onChange={({ target }) =>
                    setSickLeave({ ...sickLeave, startDate: target.value })
                  }
                />
              </FormControl>
            </div>
            {/* <TextField
                sx={{ ml: 2 }}
                variant="standard"
                label="end"
                value={sickLeave.endDate}
                onChange={({ target }) =>
                  setSickLeave({ ...sickLeave, endDate: target.value })
                }
              /> */}
            <div>
              <FormControl sx={{ width: "90%" }}>
                <FormLabel id="sick-leave-end-date">end</FormLabel>
                <Input
                  id="sick-leave-end-date"
                  sx={{ ml: 2 }}
                  type="date"
                  value={sickLeave.endDate}
                  onChange={({ target }) =>
                    setSickLeave({ ...sickLeave, endDate: target.value })
                  }
                />
              </FormControl>
            </div>
          </div>
        )}

        {type === EntryType.Hospital && (
          <div>
            <FormControl sx={{ width: "90%" }}>
              <FormLabel sx={{ paddingTop: 1, paddingBottom: 1 }}>
                Discharge
              </FormLabel>
              {/* <TextField
                sx={{ ml: 2 }}
                variant="standard"
                label="date"
                value={discharge.date}
                onChange={({ target }) =>
                  setDischarge({ ...discharge, date: target.value })
                }
              /> */}
              {/* <InputLabel id="date-label">Date</InputLabel> */}
              <Input
                sx={{ ml: 2 }}
                type="date"
                value={discharge.date}
                onChange={({ target }) =>
                  setDischarge({ ...discharge, date: target.value })
                }
              />
              <TextField
                fullWidth
                sx={{ ml: 2 }}
                variant="standard"
                label="criteria"
                value={discharge.criteria}
                onChange={({ target }) =>
                  setDischarge({ ...discharge, criteria: target.value })
                }
              />
            </FormControl>
          </div>
        )}
        <div>
          <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            multiple
            fullWidth
            value={diagnosisCodes}
            input={<OutlinedInput label="Diagnosis Codes" />}
            onChange={({ target }) =>
              setDiagnosisCodes(
                typeof target.value === "string"
                  ? target.value.split(",")
                  : target.value
              )
            }
            // input={<OutlinedInput label="Name" />}
            // MenuProps={MenuProps}
          >
            {diagnosisCodeList.map((code) => (
              <MenuItem
                key={code}
                value={code}
                // style={getStyles(name, personName, theme)}
              >
                {code}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Stack direction="row" justifyContent="space-between">
          <Button variant="contained" color="error" onClick={formReset}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Add
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default HealthCheckEntryForm;
