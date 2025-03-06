import React, { useEffect } from 'react'
import useProblem from '../../hooks/use-problem.hook';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import DailyChallenge from './DailyChallenge';
import { Box } from '@mui/material';

const Problem = () => {
  const { getSearchedProblems, searchedProblems } = useProblem();
  const {search} = useSelector((state) => state.data);
  const [searchParams] = useSearchParams();
  const term = searchParams.get("terms");

  
  useEffect(() => {
    if(term){
      getSearchedProblems(term);
    }
  }, [term])

  return (
    <Box sx={{ px: 4 }}>
      {searchedProblems &&
        searchedProblems.map((problem) => (
          <DailyChallenge sx={{mb: 2, width: {xs: "100%", md: "60%", lg: "50%"}, mx: "auto"}} key={problem._id} dailyProblem={problem} />
        ))}
    </Box>
  );
}

export default Problem