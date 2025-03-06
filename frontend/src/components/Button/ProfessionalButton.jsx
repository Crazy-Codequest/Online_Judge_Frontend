import { Button, styled } from "@mui/material";

const ProfessionalButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: "8px",
  textTransform: "none",
  transition: "all 0.3s ease",
  fontWeight: 600,
  letterSpacing: "0.5px",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[3],
  },
}));

export default ProfessionalButton;