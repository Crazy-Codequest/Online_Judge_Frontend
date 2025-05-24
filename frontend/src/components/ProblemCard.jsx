import React from 'react';
import { Card, CardContent, CardHeader, Typography, Box, Chip, IconButton } from '@mui/material';
import { Star, Comment, Timer, Memory } from '@mui/icons-material';

const ProblemCard = ({ problem, onDiscuss }) => {
  const difficultyColors = {
    easy: 'success.main',
    medium: 'warning.main',
    hard: 'error.main',
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        title={<Typography variant="h6">{problem.title}</Typography>}
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={problem.difficulty}
              color={problem.difficulty}
              size="small"
              sx={{
                color: difficultyColors[problem.difficulty],
                borderColor: difficultyColors[problem.difficulty],
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Timer sx={{ fontSize: '1rem' }} />
              <Typography variant="body2">{problem.timeLimit}s</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Memory sx={{ fontSize: '1rem' }} />
              <Typography variant="body2">{problem.memoryLimit}MB</Typography>
            </Box>
          </Box>
        }
      />

      <CardContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {problem.description}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Star sx={{ fontSize: '1rem' }} />
              <Typography variant="body2">{problem.difficulty}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Comment sx={{ fontSize: '1rem' }} />
              <Typography variant="body2">{problem.comments} comments</Typography>
            </Box>
          </Box>
          <IconButton onClick={onDiscuss}>
            <Comment sx={{ fontSize: '1.5rem' }} />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProblemCard;
