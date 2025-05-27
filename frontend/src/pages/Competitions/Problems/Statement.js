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
import { Box, Divider, Skeleton, Typography, useTheme } from "@mui/material";

const darkBg = "#181c24";

const CompetitionProblem = () => {
  const params = useParams();
  const [problem, setProblem] = useState({});
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(true);
  const [desc, setDesc] = useState(true);
  const [code, setCode] = useState("");
  const theme = useTheme();

  const { timestamp } = useSelector((state) => state.data);
  const { user } = useSelector((state) => state.auth);

  const getTimestamp = async () => {
    try {
      const timestamp = await axios.post(
        urlConstants.getTimestamp,
        {
          id: "680e852aeb911a0106b3410b",
          userId: user?.id,
        },
        getConfig()
      );
      setTimestamp(timestamp);
    } catch (e) {
      console.error(e);
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
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    if (!timestamp) getTimestamp();
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        p: { xs: 1, md: 4 },
        pt: 0,
        pb: 10,
        bgcolor: theme.palette.background.main,
      }}
    >
      <Box sx={{ mr: 2, my: 2 }}>
        <CompetitionTimer competitionTimestamp={timestamp} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            height: "90vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <StatementPage
            description={problem.description}
            examples={problem.examples}
            statement={problem.statement}
            setDesc={setDesc}
            constraints={problem.constraints}
            loading={loading}
            darkMode
          />
        </Box>
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
            darkMode
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CompetitionProblem;
