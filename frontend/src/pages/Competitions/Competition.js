import React, { useEffect, useState } from "react";
import "./Competition.css";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loader/Loader";
import axios from "axios";
import getFormattedDateTime from "../../utils/time";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Competition = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [problems, setProblems] = useState({});
  const [loading, setLoading] = useState(true);

  const getCompetitions = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/competition",
        {
          id: params.id,
        }
      );
      setProblems(data.problems);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCompetitions();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="competition-page">
      <div className="table"></div>
    </div>
  );
};

export default Competition;
