import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Compiler from "./Compiler";
import StatementPage from "./StatementPage";
import Loading from "../Loader/Loader";
import { urlConstants } from "../../apis";
import { getConfig } from "../../utils/getConfig";
import { Box, Typography, Container } from "@mui/material";
import { useIsTab } from "../../hooks/use-is-tab";

const Statement = () => {
  const params = useParams();
  const [problem, setProblem] = useState({});
  const [output, setOutput] = useState("");
  const [outputVisible, setOutputVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [desc, setDesc] = useState(true);
  const [code, setCode] = useState("");
  const isMobile = useIsTab();

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
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSetOutput = (val) => {
    setOutput(val);
    setOutputVisible(true);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        bgcolor: "background.default",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          height: "100vh",
          py: 4,
          px: { xs: 2, md: 4 },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            overflow: "hidden",
          }}
        >
          {loading ? (
            <Box
              sx={{
                borderRadius: 2,
                width: { xs: "100%", md: "50%" },
                height: "90vh",
                bgcolor: "background.paper",
                px: 2,
                py: 4,
              }}
            >
              <Typography variant="h6">Loading...</Typography>
            </Box>
          ) : !desc ? (
            <Box
              sx={{
                borderRadius: 2,
                width: { xs: "100%", md: "50%" },
                height: "90vh",
                bgcolor: "background.paper",
                overflow: "auto",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  p: 2,
                  gap: 2,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography
                  sx={{ cursor: "pointer" }}
                  variant="h5"
                  onClick={() => setDesc(true)}
                >
                  Description
                </Typography>
                <Typography
                  sx={{ cursor: "pointer" }}
                  variant="h5"
                  onClick={() => setDesc(false)}
                >
                  Submissions
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Typography>Output</Typography>
                <Typography mt={2}>{output}</Typography>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                borderRadius: 2,
                width: { xs: "100%", md: "50%" },
                height: "90vh",
                overflow: "hidden",
              }}
            >
              {loading ? (
                <Typography>Loading...</Typography>
              ) : (
                <StatementPage
                  description={problem.description}
                  examples={problem.examples}
                  statement={problem.statement}
                  setDesc={setDesc}
                  constraints={problem.constraints}
                  output={output}
                  outputVisible={outputVisible}
                />
              )}
            </Box>
          )}
          <Box
            sx={{
              borderRadius: 2,
              width: { xs: "100%", md: "50%" },
              height: "90vh",
              overflow: "hidden",
            }}
          >
            <Compiler
              output={output}
              setOutput={handleSetOutput}
              setLoading={setLoading}
              code={code}
              setCode={setCode}
              setDesc={setDesc}
              id={problem._id}
              c_id={params.c_id}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Statement;
