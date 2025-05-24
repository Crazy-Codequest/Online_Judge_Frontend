import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, IconButton, Typography, Tabs, Tab, Tooltip } from '@mui/material';
import { Code, Settings, Moon, Sun } from '@mui/icons-material';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeEditor = ({ code, onCodeChange, language = 'javascript' }) => {
  const [value, setValue] = useState(code || '');
  const [theme, setTheme] = useState('dark');
  const editorRef = useRef(null);

  useEffect(() => {
    setValue(code);
  }, [code]);

  const handleCodeChange = (e) => {
    setValue(e.target.value);
    if (onCodeChange) {
      onCodeChange(e.target.value);
    }
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Code Editor</Typography>
        <Box>
          <IconButton onClick={handleThemeToggle}>
            {theme === 'dark' ? <Sun /> : <Moon />}
          </IconButton>
          <Tooltip title="Settings">
            <IconButton>
              <Settings />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ position: 'relative' }}>
        <textarea
          ref={editorRef}
          value={value}
          onChange={handleCodeChange}
          style={{
            width: '100%',
            height: '400px',
            padding: '16px',
            fontSize: '14px',
            fontFamily: 'Consolas, Monaco, 'Courier New', monospace',
            background: theme === 'dark' ? '#1e1e1e' : '#ffffff',
            color: theme === 'dark' ? '#d4d4d4' : '#333333',
            border: 'none',
            borderRadius: '4px',
            outline: 'none',
            resize: 'none',
          }}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Tabs value={language} onChange={(e, newValue) => {
          // Handle language change
        }}>
          <Tab label="JavaScript" value="javascript" />
          <Tab label="Python" value="python" />
          <Tab label="Java" value="java" />
          <Tab label="C++" value="cpp" />
        </Tabs>
      </Box>
    </Paper>
  );
};

export default CodeEditor;
