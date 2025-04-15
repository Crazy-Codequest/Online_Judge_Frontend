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
import { Box, Divider, Typography } from "@mui/material";

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
    <Box
      sx={{
        width: "100vw",
        position: "absolute",
        minHeight: "105vh",
        padding: "4rem",
        pt: 0,
        backgroundImage: `radial-gradient(
            closest-side at 50% 135%,
          #ffffff 50%,
          #eceff1 100%
        )`,
      }}
    >
      <Box sx={{ mr: 2, my: 2 }}>
        <CompetitionTimer competitionTimestamp={timestamp} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        {!desc ? (
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              backgroundColor: "#fff",
              borderRadius: 2,
              p: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <Typography
                variant="h2"
                sx={{ cursor: "pointer" }}
                onClick={() => setDesc(true)}
              >
                Description
              </Typography>
              <Typography
                variant="h2"
                sx={{ cursor: "pointer" }}
                onClick={() => setDesc(false)}
              >
                Submissions
              </Typography>
            </Box>
            <Divider sx={{mt: 1}} />
            <Box sx={{ pt: 2 }}>
              <Typography
                variant="h6"
                sx={{ cursor: "pointer", mb: 2 }}
                onClick={() => setDesc(false)}
              >
                Output
              </Typography>
              <Typography>{output}</Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <StatementPage
              description={problem.description}
              examples={problem.examples}
              statement={problem.statement}
              setDesc={setDesc}
              constraints={problem.constraints}
            />
          </Box>
        )}
        <Box sx={{ height: "90vh", width: { xs: "100%", md: "50%" } }}>
          <Compiler
            output={output}
            setOutput={setOutput}
            setLoading={setLoading}
            code={code}
            setCode={setCode}
            setDesc={setDesc}
            id={problem._id}
            c_id={params.c_id}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CompetitionProblem;
