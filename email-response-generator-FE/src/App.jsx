import "./App.css";
import React, { useState } from "react";
import axios from "axios";

import {
  Container,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [loading, setLoading] = useState(false);
  const [GeneratedReply, setGeneratedReply] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/email/generate",
        {
          emailContent,
          tone,
        }
      );
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Email Reply Generator
      </Typography>
      <Box sx={{ mx: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Enter the email you want to reply to"
          value={emailContent || ""}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone || ""}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Professional">Professional</MenuItem>
            <MenuItem value="Casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
          </Select>
        </FormControl>

        <Button
          sx={{ mb: 2 }}
          variant="contained"
          onClick={handleSubmit}
          disabled={!emailContent || loading}
        >
          {loading ? <CircularProgress size={24} /> : "Generate Reply"}
        </Button>
      </Box>

      <Box sx={{ mx: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          value={GeneratedReply || ""}
          inputProps={{ readOnly: true }}
          sx={{ mb: 2 }}
        />

        <Button
          variant="outlined"
          onClick={() => navigator.clipboard.writeText(GeneratedReply)}
        >
          Copy to Clipboard
        </Button>
      </Box>
    </Container>
  );
}

export default App;
