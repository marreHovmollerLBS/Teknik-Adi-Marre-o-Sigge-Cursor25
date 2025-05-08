import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  Tab,
  Tabs,
  Box,
  Container,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function App() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hälsa App
          </Typography>
          <TextField
            size="small"
            placeholder="Sök..."
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'transparent',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>
      </AppBar>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleTabChange} centered>
          <Tab label="Hem" />
          <Tab label="Aktiviteter" />
          <Tab label="Statistik" />
          <Tab label="Inställningar" />
        </Tabs>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Välkommen till Hälsa App
          </Typography>
          <Typography variant="body1">
            Detta är en prototyp av en hälsa-applikation. Här kan du utforska olika funktioner genom att klicka på flikarna ovan.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
