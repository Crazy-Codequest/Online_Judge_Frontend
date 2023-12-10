import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Loader/Loader";
import { urlConstants } from "../../../apis";
import { getConfig } from "../../../utils/getConfig";

const Problem = () => {
  const params = useParams();
  const [problem, setProblem] = useState({});
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(true);
  const [desc, setDesc] = useState(true);
  const [code, setCode] = useState("");

  const getData = async () => {
    try {
      const { data } = await axios.post(
        urlConstants.getProblem,
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
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="edit-problem-page">
      <div className="flex page">
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
      </div>
    </div>
  );
};

export default Problem;
