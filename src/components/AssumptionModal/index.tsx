import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface AssumptionsModalProps {
  open: boolean;
  onClose: () => void;
}

const assumptions = [
  {
    title: "Assumptions",
    description: "Feature level missing requirements and assumptions",
    missing: [
      "User Authentication and Authorization details are missing. I have assumed that it is not required to be implemented",
      "API contracts are missing. Different API's like to fetch all KPI's, featured and trending KPI's, user's KPI are not defined. \n I have assumed that a basic version or stub to be implementated for the demo.",
      "Search related information is not clear. The models shared have some information but what are the search parameters and how will the search UI look like is not shared. \n I have just matched the search bar as per the library layout.",
      "KPI asset modal UI is not clear. The Modal shared in teh image has Layout as heading but the content is of KPI. That too is not clear as few details are missing. \n I have assumed it to be KPI asset modal and implemnted it as such.",
      "Details foro Featured and Trending KPI cards interaction is missing. I have assumed them to be static",
      "Layout UI and requirements are missing or not clear. I have not implemented it. (Added placeholder message) as it requires lot of geussing on each every feature of the layout",
      "Storyboard UI and requirements are missing. I have not implemented it.",
      "Error handling details are missing. added only basic level of error handling",
    ],
  },
  {
    title: "User story 1",
    description:
      "As a user: when deciding what KPI's to track, I need to see all of the KPI's for my area and what charting I can use so that I can build my layout",
    missing: [
      "The KPI model shared does not have defined area or something so that it can be related to a user. Relationship between the KPI and user is not defined.",
      "Charting information is missing. No information on the data that will be stored in the KPI. Need to define the types of charts",
      "In what ways a KPI can be added to the layout is not defined.",
      "No information on how the layout page will look like. Nothing to go on for this page.",
      "Information regarding how to customise the layout is not shared.",
    ],
  },
  {
    title: "User story 2",
    description:
      "As a user: when I want to do a deep dive into my KPI data I need to select visuals that best communicate the insights so I can quickly capture and annotate insights to share",
    missing: [
      "Which tab/page is this feature part of? Will be in Layout or storyboard?",
      'A detailed view or "deep dive" mode for individual KPIs is missing. What are the different visuals that needs to be added?',
      "Details to work on  annotation feature to add notes or highlights to the visuals",
      "When user says capture the data then what exactly is the requirement?",
      "How to share the nnotated insights? (e.g., export, email, or internal messaging)",
    ],
  },
  {
    title: "User story 3",
    description:
      "As a user: when I don't have access to something I want to request access and give my reason why so I can add to my layouts",
    missing: [
      "UI for the request form is missing. Only the location of the request button is shared",
    ],
  },
];

const AssumptionsModal: React.FC<AssumptionsModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Assumptions and Missing Components
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {assumptions.map((assumption, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{assumption.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>{assumption.description}</Typography>
              <Typography variant="subtitle1">Details:</Typography>
              <List>
                {assumption.missing.map((item, itemIndex) => (
                  <ListItem key={itemIndex}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default AssumptionsModal;
