import axios from "axios";
import { getConfig } from "../../../utils/getConfig";
import { urlConstants } from "../../../apis";

const useProblemsApi = () => {
  const fetchProblems = async () => {
    const { data } = await axios.get(urlConstants.getProblems, getConfig());
    return data;
  };

  const fetchTopicCounts = async () => {
    const { data } = await axios.get(urlConstants.getTopicCounts, getConfig());
    return data;
  };

  const fetchMyLists = async (userId) => {
    const { data } = await axios.get(`${urlConstants.getLists}?user_id=${userId}`, getConfig());
    return data;
  };

  return { fetchProblems, fetchTopicCounts, fetchMyLists };
};

export default useProblemsApi;
