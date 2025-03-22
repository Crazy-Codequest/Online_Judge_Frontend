import { Box, Typography } from '@mui/material';
import React from 'react'
import ProfessionalButton from '../../components/Button/ProfessionalButton';
import { Link } from 'react-router-dom';

const DailyChallenge = ({ dailyProblem, sx }) => {
return (
    dailyProblem &&
    <Box sx={sx} bgcolor="action.hover" p={3} borderRadius={3}>
    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        {dailyProblem.statement}
        <Box
        component="span"
        color="text.secondary"
        ml={2}
        fontSize="0.875rem"
        >
        {dailyProblem.id}
        </Box>
    </Typography>
    <Typography variant="body2" color="text.secondary" paragraph>
        {dailyProblem.description}
    </Typography>
    <Box display="flex" justifyContent="space-between" mt={3}>
        <Box>
        <Typography variant="caption" color="text.disabled">
            Difficulty:
        </Typography>
        <Typography
            variant="body2"
            color={
            dailyProblem.difficulty === "Easy"
                ? "success.main"
                : dailyProblem.difficulty === "Medium"
                ? "warning.main"
                : "error.main"
            }
            fontWeight="600"
        >
            {dailyProblem.difficulty}
        </Typography>
        </Box>
        <Link to={`/statement/${dailyProblem._id}`}>
        <ProfessionalButton variant="contained">
            Solve Challenge
        </ProfessionalButton>
        </Link>
    </Box>
    </Box>
);
};

export default DailyChallenge