import React from "react";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const CompetitionTerms = ({ onAccept }) => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Competition Terms & Conditions
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Once started, the competition cannot be reverted." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="The competition will last for 3 hours in total." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="You will be allowed to solve 3 questions." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Allowed languages: Python, JavaScript, C++." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="You can view the leaderboard and your submissions during the competition." />
          </ListItem>
        </List>
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button variant="contained" color="primary" onClick={onAccept}>
            Start Competition
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CompetitionTerms;
