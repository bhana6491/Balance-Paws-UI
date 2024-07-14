import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MenuItem from "@mui/material/MenuItem";
const species = [
  {
    value: "Dog",
    label: "Dog",
  },
  {
    value: "Cat",
    label: "Cat",
  },
];

const dogBreeds = [
  {
    label: "German Shepherd",
    value: "german_shepherd",
  },
];

const catBreeds = [
  {
    label: "Tabby",
    value: "tabby",
  },
];

const activityLevel = [
  {
    label: "Low",
    value: "low",
  },
  {
    label: "Moderate",
    value: "moderate",
  },
  {
    label: "High",
    value: "high",
  },
  {
    label: "Performance",
    value: "performance",
  },
];

const lifestage = [
  {
    label: "Reproduction",
    value: "reproduction",
  },
  {
    label: "Growth",
    value: "growth",
  },
  {
    label: "Adult",
    value: "adult",
  },
  {
    label: "Senior",
    value: "senior",
  },
];

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedSpecies, setSelectedSpecies] = React.useState("");
  const handleSpeciesChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedSpecies(event.target.value as string);
  };

  const [formOutput, setFormOutput] = React.useState({});

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson)
    setFormOutput(formJson);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button
        className="text-6xl py-28 px-20 mt-10 text-earth-green font-poppins"
        color="inherit"
        variant="outlined"
        sx={{ borderStyle: "dashed", color: "black", borderColor: "black" }}
        onClick={handleClickOpen}
      >
        <AddBoxIcon sx={{ display: "flex-col", fontSize: "5rem" }} />
        <Typography variant="h5" component="div" className="mt-2">
          Create Recipe
        </Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: "beige",
            boxShadow: "none",
          },
          component: "form",
          onSubmit: handleFormSubmit,
        }}
      >
        <DialogTitle className="text-black font-poppins">
          Pet Information
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="text-black font-poppins">
            Before you can create a recipe, please enter information about your
            pet to help craft recipes according to their needs.
          </DialogContentText>
          <div>
            <TextField
              className="mt-5"
              id="species"
              name="species"
              select
              label="Species"
              value={selectedSpecies}
              onChange={handleSpeciesChange}
              sx={{ width: "50%" }}
            >
              {species.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              className="mt-5"
              id="breed"
              name="breed"
              select
              label="Breed"
              defaultValue=""
              sx={{ width: "50%" }}
            >
              {selectedSpecies === "Dog"
                ? dogBreeds.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                : catBreeds.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
            </TextField>
          </div>
          <div>
            <TextField
              className="mt-5"
              id="activity_level"
              name="activity_level"
              select
              defaultValue=""
              label="Activity Level"
              sx={{ width: "50%" }}
            >
              {activityLevel.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              className="mt-5"
              id="lifestage"
              name="lifestage"
              select
              defaultValue=""
              label="Life Stage"
              sx={{ width: "50%" }}
            >
              {lifestage.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            className="text-earth-green font-poppins"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button className="text-earth-green font-poppins" type="submit">
            Start
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
