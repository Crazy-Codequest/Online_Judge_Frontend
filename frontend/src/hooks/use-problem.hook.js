import axios from 'axios';
import React, { useState } from 'react'
import { urlConstants } from '../apis';
import { getConfig } from '../utils/getConfig';

const useProblem = () => {
    const [searchedProblems, setSearchedproblems] = useState([]);

    const getSearchedProblems = async (search) => {
        try {
        const { data } = await axios.get(
            `${urlConstants.getSearchedProblems}/${search}`,
            getConfig()
        );
        setSearchedproblems(data.problems);
        } catch (e) {
        console.error(e);
        }
    };

  return {
    getSearchedProblems,
    searchedProblems
  }
}

export default useProblem