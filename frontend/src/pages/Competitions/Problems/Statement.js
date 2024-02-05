import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StatementPage from "../../StatementPage/StatementPage";
import Loading from "../../Loader/Loader";
import { urlConstants } from "../../../apis";
import { getConfig } from "../../../utils/getConfig";
import Compiler from "../../StatementPage/Compiler";
import { useSelector } from "react-redux";
import { setTimestamp } from "../../../features/auth/dataSlice";
import CompetitionTimer from "../timer";

const CompetitionProblem = () => {
  const params = useParams();
  const [problem, setProblem] = useState({});
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(true);
  const [desc, setDesc] = useState(true);
  const [code, setCode] = useState("");

  const { timestamp } = useSelector((state) => state.data);
  const { user } = useSelector((state) => state.auth);

  const getTimestamp = async () => {
    try {
      const timestamp = await axios.post(
        urlConstants.getTimestamp,
        {
          id: "6562325b5905a5ec08fabd37",
          userId: user._id,
        },
        getConfig()
      );
      setTimestamp(timestamp);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const { data } = await axios.post(
        urlConstants.getCompetitionProblem,
        {
          id: params.id,
        },
        getConfig()
      );
      setProblem(data.customprob);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    if (!timestamp) getTimestamp();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="competition-problem-page">
      <p className="mr-2 mb-1">
        <CompetitionTimer competitionTimestamp={timestamp} />
      </p>
      <div className="flex">
        {!desc ? (
          <div className="left-page">
            <div className="left-header">
              <h4 onClick={() => setDesc(true)}>Description</h4>
              <h4 onClick={() => setDesc(false)}>Submissions</h4>
            </div>
            <div className="problem--statement">
              <div className="problem-title mb-2">Output</div>
              <span>{output}</span>
            </div>{" "}
          </div>
        ) : (
          <StatementPage
            description={problem.description}
            examples={problem.examples}
            statement={problem.statement}
            setDesc={setDesc}
            constraints={problem.constraints}
          />
        )}
        <div className="right-page">
          <Compiler
            output={output}
            setOutput={setOutput}
            setLoading={setLoading}
            code={code}
            setCode={setCode}
            setDesc={setDesc}
            id={problem._id}
            c_id="6562325b5905a5ec08fabd37"
          />
        </div>
        <div className="compiler-submit"></div>
      </div>
    </div>
  );
};

export default CompetitionProblem;
