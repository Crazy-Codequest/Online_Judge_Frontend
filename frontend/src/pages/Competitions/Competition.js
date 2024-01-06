import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loader/Loader";
import axios from "axios";
import getFormattedDateTime from "../../utils/time";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { urlConstants } from "../../apis";
import { getConfig } from "../../utils/getConfig";
import CompetitionTimer from "./timer";
import { setTimestamp } from "../../features/auth/dataSlice";

const Competition = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [problems, setProblems] = useState({});
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.auth);
  const { timestamp } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const getProblems = async () => {
    try {
      const { data } = await axios.post(
        urlConstants.getCompetition,
        {
          id: params.id,
        },
        getConfig()
      );
      setProblems(data.fetchedCompetition.problems);
      const timestamp = data.fetchedCompetition.users.filter(
        (compuser) => compuser.userId === user._id
      )[0].timestamp;
      dispatch(setTimestamp(timestamp));
    } catch (e) {
      if (
        e.response.data.error === "This competition is not currently active"
      ) {
        toast.error("Competition is currently inactive.");
      } else {
        toast.error("Sorry couldn't fetch the competition");
      }
      navigate("/competitions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProblems();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="competition-page">
      <CompetitionTimer competitionTimestamp={timestamp} />
      <div className="table">
        {problems.map((problem) => (
          <div key={problem._id} className="compeitition-card">
            <div className="card-content">
              <img
                className="card-img"
                src="https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png"
              />
              <div className="flex-end">
                <h3
                  className="pointer"
                  onClick={() =>
                    navigate(`/competition/statement/${problem._id}`)
                  }
                >
                  {problem.statement}
                </h3>
                <p className="grey">{problem.difficulty}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Competition;
