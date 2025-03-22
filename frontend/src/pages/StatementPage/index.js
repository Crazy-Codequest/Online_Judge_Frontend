import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Compiler from "./Compiler";
import StatementPage from "./StatementPage";
import Loading from "../Loader/Loader";
import { urlConstants } from "../../apis";
import { getConfig } from "../../utils/getConfig";
import { Box, Typography } from "@mui/material";
import { useIsTab } from "../../hooks/use-is-tab";

const Statement = () => {
  const params = useParams();
  const [problem, setProblem] = useState({});
  const [output, setOutput] = useState("");
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
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        backgroundImage:
          "radial-gradient(closest-side at 50% 135%, #ffffff 50%, #eceff1 100%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "100%",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          ...(isMobile && { alignItems: "center" }),
        }}
      > {
            loading ? <Box
            sx={{
              borderRadius: "10px",
              width: "50vw",
              mr: 2,
              height: "90vh",
              backgroundColor: "#fff",
              px: 2,
              py: 4
            }}
          ><Typography variant="h6">Loading...</Typography>
          </Box>:
        !desc ? (
          <Box
            sx={{
              borderRadius: "10px",
              width: "50vw",
              mr: 2,
              height: "90vh",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                display: "flex",
                p: 2,
                gap: 2,
              }}
            >
              <Typography
                sx={{ cursor: "pointer" }}
                variant="h2"
                onClick={() => setDesc(true)}
              >
                Description
              </Typography>
              <Typography
                sx={{ cursor: "pointer" }}
                variant="h2"
                onClick={() => setDesc(false)}
              >
                Submissions
              </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography>Output</Typography>
              <Typography mt={2}>{output}</Typography>
            </Box>{" "}
          </Box>
        ) : (
          <Box sx={{ borderRadius: "10px", width: { xs: "90vw", md: "50vw" } }}>
            {
            loading ? <Typography>Loading...</Typography> :
              <StatementPage
                description={problem.description}
                examples={problem.examples}
                statement={problem.statement}
                setDesc={setDesc}
                constraints={problem.constraints}
            /> 
            }
          </Box>
        )}
        <Box sx={{ borderRadius: "10px", width: { xs: "90vw", md: "50vw" } }}>
          <Compiler
            output={output}
            setOutput={setOutput}
            setLoading={setLoading}
            code={code}
            setCode={setCode}
            setDesc={setDesc}
            id={problem._id}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Statement;
