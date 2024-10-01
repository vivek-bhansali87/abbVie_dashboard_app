import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  SelectChangeEvent,
  Typography,
  Snackbar,
  TextField,
} from "@mui/material";
import { useKPIs } from "@/app/api/kpiApi";

interface RequestModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (selectedKPIs: string[], reasonText: string | null) => void;
}

const RequestModal: React.FC<RequestModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [selectedKPIs, setSelectedKPIs] = useState<string[]>([]);
  const [reasontext, setReasonText] = useState<string | null>("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { data: kpis, isLoading, error } = useKPIs();

  const handleChange = (event: SelectChangeEvent<typeof selectedKPIs>) => {
    const {
      target: { value },
    } = event;
    setSelectedKPIs(typeof value === "string" ? value.split(",") : value);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReasonText(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(selectedKPIs, reasontext);
    setSnackbarOpen(true);
    setSelectedKPIs([]);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Request Access to KPIs</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="kpi-select-label">Select KPIs</InputLabel>
            <Select
              labelId="kpi-select-label"
              multiple
              value={selectedKPIs}
              onChange={handleChange}
              input={<OutlinedInput label="Select KPIs" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {kpis &&
                kpis.map((kpi) => (
                  <MenuItem key={kpi.id} value={kpi.name}>
                    <Checkbox checked={selectedKPIs.indexOf(kpi.name) > -1} />
                    <ListItemText primary={kpi.name} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <TextField
              id="standard-multiline-static"
              label="Reason for access"
              multiline
              rows={2}
              variant="outlined"
              onChange={handleTextChange}
              value={reasontext}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Request submitted successfully"
      />
    </>
  );
};

export default RequestModal;
