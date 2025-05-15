import React, { useState, useEffect } from 'react';
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating,
  TextareaAutosize,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import ChatIcon from '@mui/icons-material/Chat';

interface Settings {
  language: string;
  fontSize: number;
  colorPalette: string;
  customColors: {
    primary: string;
    background: string;
    paper: string;
    text: string;
  };
}

interface ColorPalette {
  primary: string;
  background: string;
  paper: string;
  text: string;
}

const colorPalettes: Record<string, ColorPalette> = {
  default: {
    primary: '#1976d2',
    background: '#ffffff',
    paper: '#ffffff',
    text: '#000000',
  },
  nature: {
    primary: '#2e7d32',
    background: '#f1f8e9',
    paper: '#ffffff',
    text: '#1b5e20',
  },
  ocean: {
    primary: '#0288d1',
    background: '#e1f5fe',
    paper: '#ffffff',
    text: '#01579b',
  },
  sunset: {
    primary: '#ff7043',
    background: '#fff3e0',
    paper: '#ffffff',
    text: '#e65100',
  },
  lavender: {
    primary: '#7b1fa2',
    background: '#f3e5f5',
    paper: '#ffffff',
    text: '#4a148c',
  },
  midnight: {
    primary: '#9c27b0',
    background: '#121212',
    paper: '#1e1e1e',
    text: '#ffffff',
  },
  forest: {
    primary: '#4caf50',
    background: '#1a1a1a',
    paper: '#2d2d2d',
    text: '#e0e0e0',
  },
  deepOcean: {
    primary: '#00bcd4',
    background: '#0a1929',
    paper: '#132f4c',
    text: '#ffffff',
  },
  custom: {
    primary: '#1976d2',
    background: '#ffffff',
    paper: '#ffffff',
    text: '#000000',
  },
};

interface DiaryEntry {
  date: string;
  mood: number;
  notes: string;
}

// Add ChatBot component
const ChatBot = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: 'Hej! Hur kan jag hjälpa dig idag?', isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputMessage, isUser: true }]);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();
      
      // Add bot response
      setMessages(prev => [...prev, { text: data.reply, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { text: 'Sorry, something went wrong. Please try again.', isUser: false }]);
    }

    setInputMessage('');
  };

  return (
    <Box sx={{ height: '80vh', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          flex: 1, 
          p: 2, 
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              alignSelf: msg.isUser ? 'flex-end' : 'flex-start',
              backgroundColor: msg.isUser ? 'primary.main' : 'grey.100',
              color: msg.isUser ? 'white' : 'text.primary',
              p: 1,
              px: 2,
              borderRadius: 2,
              maxWidth: '70%'
            }}
          >
            <Typography>{msg.text}</Typography>
          </Box>
        ))}
      </Paper>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Skriv ditt meddelande här..."
          variant="outlined"
        />
        <Button 
          variant="contained" 
          onClick={sendMessage}
          disabled={!inputMessage.trim()}
        >
          Skicka
        </Button>
      </Box>
    </Box>
  );
};

function App() {
  const [currentTab, setCurrentTab] = useState(0);
  const [settings, setSettings] = useState<Settings>({
    language: 'sv',
    fontSize: 16,
    colorPalette: 'default',
    customColors: colorPalettes.custom,
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [currentMood, setCurrentMood] = useState<number>(3);
  const [currentNotes, setCurrentNotes] = useState<string>('');

  // Load diary entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    if (savedEntries) {
      setDiaryEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save diary entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
  }, [diaryEntries]);

  // Update font size when settings change
  useEffect(() => {
    document.documentElement.style.fontSize = `${settings.fontSize}px`;
  }, [settings.fontSize]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleSettingChange = (setting: keyof Settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleCustomColorChange = (colorType: keyof ColorPalette, value: string) => {
    setSettings(prev => ({
      ...prev,
      customColors: {
        ...prev.customColors,
        [colorType]: value
      }
    }));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const currentPalette = settings.colorPalette === 'custom' 
    ? settings.customColors 
    : colorPalettes[settings.colorPalette];

  const handleSaveDiaryEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry: DiaryEntry = {
      date: today,
      mood: currentMood,
      notes: currentNotes,
    };

    // Check if there's already an entry for today
    const existingEntryIndex = diaryEntries.findIndex(entry => entry.date === today);
    
    if (existingEntryIndex >= 0) {
      // Update existing entry
      const updatedEntries = [...diaryEntries];
      updatedEntries[existingEntryIndex] = newEntry;
      setDiaryEntries(updatedEntries);
    } else {
      // Add new entry
      setDiaryEntries([...diaryEntries, newEntry]);
    }

    // Reset form
    setCurrentMood(3);
    setCurrentNotes('');
  };

  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: 'Mycket dåligt',
    },
    2: {
      icon: <SentimentDissatisfiedIcon />,
      label: 'Dåligt',
    },
    3: {
      icon: <SentimentNeutralIcon />,
      label: 'Okej',
    },
    4: {
      icon: <SentimentSatisfiedIcon />,
      label: 'Bra',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon />,
      label: 'Mycket bra',
    },
  };

  function IconContainer(props: any) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  const renderColorPicker = () => (
    <Dialog 
      open={isColorPickerOpen} 
      onClose={() => setIsColorPickerOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Anpassa färger</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
          <Box>
            <Typography gutterBottom>Primär färg</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <input
                type="color"
                value={settings.customColors.primary}
                onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                style={{ width: '50px', height: '50px', padding: 0, border: 'none' }}
              />
              <TextField
                value={settings.customColors.primary}
                onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                size="small"
              />
            </Box>
          </Box>
          <Box>
            <Typography gutterBottom>Bakgrundsfärg</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <input
                type="color"
                value={settings.customColors.background}
                onChange={(e) => handleCustomColorChange('background', e.target.value)}
                style={{ width: '50px', height: '50px', padding: 0, border: 'none' }}
              />
              <TextField
                value={settings.customColors.background}
                onChange={(e) => handleCustomColorChange('background', e.target.value)}
                size="small"
              />
            </Box>
          </Box>
          <Box>
            <Typography gutterBottom>Pappersfärg</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <input
                type="color"
                value={settings.customColors.paper}
                onChange={(e) => handleCustomColorChange('paper', e.target.value)}
                style={{ width: '50px', height: '50px', padding: 0, border: 'none' }}
              />
              <TextField
                value={settings.customColors.paper}
                onChange={(e) => handleCustomColorChange('paper', e.target.value)}
                size="small"
              />
            </Box>
          </Box>
          <Box>
            <Typography gutterBottom>Textfärg</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <input
                type="color"
                value={settings.customColors.text}
                onChange={(e) => handleCustomColorChange('text', e.target.value)}
                style={{ width: '50px', height: '50px', padding: 0, border: 'none' }}
              />
              <TextField
                value={settings.customColors.text}
                onChange={(e) => handleCustomColorChange('text', e.target.value)}
                size="small"
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsColorPickerOpen(false)}>Stäng</Button>
      </DialogActions>
    </Dialog>
  );

  const renderDiary = () => (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, bgcolor: currentPalette.paper }}>
        <Typography variant="h5" gutterBottom color={currentPalette.text}>
          Hur mår du idag?
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Rating
            name="mood-rating"
            value={currentMood}
            onChange={(_, newValue) => {
              if (newValue !== null) {
                setCurrentMood(newValue);
              }
            }}
            max={5}
            IconContainerComponent={IconContainer}
            sx={{
              '& .MuiRating-iconFilled': {
                color: currentPalette.primary,
              },
              '& .MuiRating-iconEmpty': {
                color: currentPalette.primary,
              },
            }}
          />
          <Typography variant="body2" color={currentPalette.text} sx={{ mt: 1 }}>
            {customIcons[currentMood].label}
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom color={currentPalette.text}>
          Dagens anteckningar
        </Typography>
        <TextareaAutosize
          minRows={4}
          placeholder="Skriv ner hur din dag har varit..."
          value={currentNotes}
          onChange={(e) => setCurrentNotes(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '4px',
            border: `1px solid ${currentPalette.primary}`,
            backgroundColor: currentPalette.background,
            color: currentPalette.text,
            fontSize: '1rem',
            fontFamily: 'inherit',
            resize: 'vertical',
          }}
        />

        <Button
          variant="contained"
          onClick={handleSaveDiaryEntry}
          sx={{ mt: 2 }}
          color="primary"
        >
          Spara dagboksinlägg
        </Button>

        {diaryEntries.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom color={currentPalette.text}>
              Tidigare inlägg
            </Typography>
            {diaryEntries.slice().reverse().map((entry, index) => (
              <Paper
                key={entry.date}
                elevation={1}
                sx={{
                  p: 2,
                  mb: 2,
                  bgcolor: currentPalette.background,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle1" color={currentPalette.text}>
                    {new Date(entry.date).toLocaleDateString('sv-SE')}
                  </Typography>
                  <Rating
                    value={entry.mood}
                    readOnly
                    max={5}
                    IconContainerComponent={IconContainer}
                    sx={{
                      '& .MuiRating-iconFilled': {
                        color: currentPalette.primary,
                      },
                      '& .MuiRating-iconEmpty': {
                        color: currentPalette.primary,
                      },
                    }}
                  />
                </Box>
                <Typography variant="body1" color={currentPalette.text}>
                  {entry.notes}
                </Typography>
              </Paper>
            ))}
          </Box>
        )}
      </Paper>
    </Container>
  );

  const renderSettings = () => (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, bgcolor: currentPalette.paper }}>
        <Typography variant="h5" gutterBottom color={currentPalette.text}>
          Inställningar
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Språk</InputLabel>
            <Select
              value={settings.language}
              label="Språk"
              onChange={(e) => handleSettingChange('language', e.target.value)}
            >
              <MenuItem value="sv">Svenska</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom color={currentPalette.text}>
              Textstorlek: {settings.fontSize}px
            </Typography>
            <Slider
              value={settings.fontSize}
              min={12}
              max={24}
              step={1}
              onChange={(_, value) => handleSettingChange('fontSize', value)}
              valueLabelDisplay="auto"
              sx={{
                '& .MuiSlider-thumb': {
                  width: 20,
                  height: 20,
                },
                '& .MuiSlider-track': {
                  height: 4,
                },
                '& .MuiSlider-rail': {
                  height: 4,
                },
              }}
            />
          </Box>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Färgpalett</InputLabel>
            <Select
              value={settings.colorPalette}
              label="Färgpalett"
              onChange={(e) => handleSettingChange('colorPalette', e.target.value)}
            >
              <MenuItem value="default">Standard (Blå)</MenuItem>
              <MenuItem value="nature">Natur (Grön)</MenuItem>
              <MenuItem value="ocean">Hav (Ljusblå)</MenuItem>
              <MenuItem value="sunset">Solnedgång (Orange)</MenuItem>
              <MenuItem value="lavender">Lavendel (Lila)</MenuItem>
              <MenuItem value="midnight">Midnatt (Mörk)</MenuItem>
              <MenuItem value="forest">Skog (Mörk)</MenuItem>
              <MenuItem value="deepOcean">Djuphav (Mörk)</MenuItem>
              <MenuItem value="custom">Anpassad</MenuItem>
            </Select>
          </FormControl>

          {settings.colorPalette === 'custom' && (
            <Button
              variant="outlined"
              startIcon={<ColorLensIcon />}
              onClick={() => setIsColorPickerOpen(true)}
              sx={{ mt: 2 }}
            >
              Anpassa färger
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );

  const renderContent = () => {
    switch (currentTab) {
      case 0:
        return renderDiary();
      case 1:
        return <ChatBot />;
      case 2:
        return renderSettings();
      default:
        return renderDiary();
    }
  };

  return (
    <Box sx={{ 
      flexGrow: 1,
      bgcolor: currentPalette.background,
      minHeight: '100vh',
      color: currentPalette.text,
      fontSize: '1rem',
    }}>
      <AppBar position="static" sx={{ bgcolor: currentPalette.primary }}>
        <Toolbar>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontSize: '1.25rem',
            }}
          >
            Hälsa App
          </Typography>
          <TextField
            size="small"
            placeholder="Sök..."
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              mr: 2,
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
          <IconButton 
            color="inherit" 
            onClick={toggleFullscreen}
            sx={{ 
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange} 
          centered
          sx={{
            '& .MuiTab-root': {
              color: currentPalette.text,
              fontSize: '1rem',
            },
            '& .Mui-selected': {
              color: currentPalette.primary,
            },
          }}
        >
          <Tab label="Dagbok" />
          <Tab label="ChatBot" icon={<ChatIcon />} />
          <Tab label="Inställningar" />
        </Tabs>
      </Box>

      {renderContent()}
      {renderColorPicker()}
    </Box>
  );
}

export default App;
