import React from 'react';
import { Box, CircularProgress, Typography, Paper, LinearProgress } from '@mui/material';
import { CheckCircle, Error, Warning, Info } from '@mui/icons-material';

const statusColors = {
  'Accepted': 'success.main',
  'Wrong Answer': 'error.main',
  'Runtime Error': 'error.main',
  'Time Limit Exceeded': 'warning.main',
  'Memory Limit Exceeded': 'warning.main',
  'Compiling': 'info.main',
  'Running': 'info.main',
};

const statusIcons = {
  'Accepted': CheckCircle,
  'Wrong Answer': Error,
  'Runtime Error': Error,
  'Time Limit Exceeded': Warning,
  'Memory Limit Exceeded': Warning,
  'Compiling': Info,
  'Running': Info,
};

const SubmissionStatus = ({ status, time = 0, memory = 0, loading = false }) => {
  const Icon = statusIcons[status] || Info;
  const color = statusColors[status] || 'info.main';

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Icon sx={{ color, fontSize: '2rem' }} />
        <Typography variant="h6" sx={{ color }}>
          {status}
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Processing...
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1">Time: {time}ms</Typography>
            <Typography variant="body1">Memory: {memory}KB</Typography>
          </Box>
          <LinearProgress variant="determinate" value={time} />
        </Box>
      )}
    </Paper>
  );
};

export default SubmissionStatus;
