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
  Stack,
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

interface Translations {
  sv: {
    [key: string]: string;
  };
  en: {
    [key: string]: string;
  };
}

const translations: Translations = {
  sv: {
    appTitle: "Hälsa App",
    tabHome: "Hem",
    tabDiary: "Dagbok",
    tabActivities: "Aktiviteter",
    tabStatistics: "Statistik",
    tabSettings: "Inställningar",
    search: "Sök...",
    
    welcomeTitle: "Välkommen till Hälsa App",
    welcomeText: "Detta är en prototyp av en hälsa-applikation. Här kan du utforska olika funktioner genom att klicka på flikarna ovan.",
    
    howAreYouToday: "Hur mår du idag?",
    todaysNotes: "Dagens anteckningar",
    notesPlaceholder: "Skriv ner hur din dag har varit...",
    saveDiaryEntry: "Spara dagboksinlägg",
    previousEntries: "Tidigare inlägg",
    
    statistics: "Statistik",
    noEntries: "Du har inte loggat några dagboksinlägg än. Börja använda dagboken för att se statistik.",
    overview: "Översikt",
    numEntries: "Antal dagboksinlägg",
    averageMood: "Genomsnittligt mående",
    mostCommonMood: "Vanligaste humöret",
    distribution: "Fördelning",
    trend: "Trend",
    latestEntries: "De senaste {0} inläggen",
    
    settings: "Inställningar",
    language: "Språk",
    fontSize: "Textstorlek",
    colorPalette: "Färgpalett",
    
    moodVeryBad: "Mycket dåligt",
    moodBad: "Dåligt",
    moodOkay: "Okej",
    moodGood: "Bra",
    moodVeryGood: "Mycket bra",
    
    customColors: "Anpassa färger",
    primaryColor: "Primär färg",
    backgroundColor: "Bakgrundsfärg",
    paperColor: "Pappersfärg",
    textColor: "Textfärg",
    close: "Stäng",
    
    paletteDefault: "Standard (Blå)",
    paletteNature: "Natur (Grön)",
    paletteOcean: "Hav (Ljusblå)",
    paletteSunset: "Solnedgång (Orange)",
    paletteLavender: "Lavendel (Lila)",
    paletteMidnight: "Midnatt (Mörk)",
    paletteForest: "Skog (Mörk)",
    paletteDeepOcean: "Djuphav (Mörk)",
    paletteCustom: "Anpassad",
    
    comingSoon: "Kommer snart",
    inDevelopment: "Denna funktion är under utveckling."
  },
  en: {
    appTitle: "Health App",
    tabHome: "Home",
    tabDiary: "Diary",
    tabActivities: "Activities",
    tabStatistics: "Statistics",
    tabSettings: "Settings",
    search: "Search...",
    
    welcomeTitle: "Welcome to Health App",
    welcomeText: "This is a prototype of a health application. You can explore different features by clicking on the tabs above.",
    
    howAreYouToday: "How are you today?",
    todaysNotes: "Today's notes",
    notesPlaceholder: "Write down how your day has been...",
    saveDiaryEntry: "Save diary entry",
    previousEntries: "Previous entries",
    
    statistics: "Statistics",
    noEntries: "You haven't logged any diary entries yet. Start using the diary to see statistics.",
    overview: "Overview",
    numEntries: "Number of entries",
    averageMood: "Average mood",
    mostCommonMood: "Most common mood",
    distribution: "Distribution",
    trend: "Trend",
    latestEntries: "The latest {0} entries",
    
    settings: "Settings",
    language: "Language",
    fontSize: "Font size",
    colorPalette: "Color palette",
    
    moodVeryBad: "Very bad",
    moodBad: "Bad",
    moodOkay: "Okay",
    moodGood: "Good",
    moodVeryGood: "Very good",
    
    customColors: "Customize colors",
    primaryColor: "Primary color",
    backgroundColor: "Background color",
    paperColor: "Paper color",
    textColor: "Text color",
    close: "Close",
    
    paletteDefault: "Default (Blue)",
    paletteNature: "Nature (Green)",
    paletteOcean: "Ocean (Light blue)",
    paletteSunset: "Sunset (Orange)",
    paletteLavender: "Lavender (Purple)",
    paletteMidnight: "Midnight (Dark)",
    paletteForest: "Forest (Dark)",
    paletteDeepOcean: "Deep Ocean (Dark)",
    paletteCustom: "Custom",
    
    comingSoon: "Coming soon",
    inDevelopment: "This feature is under development."
  }
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

  // Helper function to get translated text
  const t = (key: string): string => {
    return translations[settings.language][key] || key;
  };

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

  // Custom icons with translated labels
  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: t('moodVeryBad'),
    },
    2: {
      icon: <SentimentDissatisfiedIcon />,
      label: t('moodBad'),
    },
    3: {
      icon: <SentimentNeutralIcon />,
      label: t('moodOkay'),
    },
    4: {
      icon: <SentimentSatisfiedIcon />,
      label: t('moodGood'),
    },
    5: {
      icon: <SentimentVerySatisfiedIcon />,
      label: t('moodVeryGood'),
    },
  };

  function IconContainer(props: any) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  // Enskild ikon för tidigare inlägg - fixa problemet med att alla ikoner visas
  function SingleIconContainer(props: any) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  // Statistikfunktioner
  const calculateMoodStats = () => {
    if (diaryEntries.length === 0) return null;

    // Räkna antal för varje humörnivå
    const moodCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    // Beräkna totalt mående och genomsnitt
    let totalMood = 0;
    
    diaryEntries.forEach(entry => {
      moodCounts[entry.mood]++;
      totalMood += entry.mood;
    });

    const averageMood = totalMood / diaryEntries.length;
    
    // Skapa en array med datum och humör för trenddiagram
    const moodTrend = diaryEntries
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(entry => ({
        date: entry.date,
        mood: entry.mood
      }));

    return {
      counts: moodCounts,
      average: averageMood,
      trend: moodTrend
    };
  };

  const renderColorPicker = () => (
    <Dialog 
      open={isColorPickerOpen} 
      onClose={() => setIsColorPickerOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{t('customColors')}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
          <Box>
            <Typography gutterBottom>{t('primaryColor')}</Typography>
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
            <Typography gutterBottom>{t('backgroundColor')}</Typography>
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
            <Typography gutterBottom>{t('paperColor')}</Typography>
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
            <Typography gutterBottom>{t('textColor')}</Typography>
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
        <Button onClick={() => setIsColorPickerOpen(false)}>{t('close')}</Button>
      </DialogActions>
    </Dialog>
  );

  const renderDiary = () => (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, bgcolor: currentPalette.paper }}>
        <Typography variant="h5" gutterBottom color={currentPalette.text}>
          {t('howAreYouToday')}
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
          {t('todaysNotes')}
        </Typography>
        <TextareaAutosize
          minRows={4}
          placeholder={t('notesPlaceholder')}
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
          {t('saveDiaryEntry')}
        </Button>

        {diaryEntries.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom color={currentPalette.text}>
              {t('previousEntries')}
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
                    {new Date(entry.date).toLocaleDateString(settings.language === 'sv' ? 'sv-SE' : 'en-US')}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {customIcons[entry.mood].icon}
                    <Typography variant="body2" color={currentPalette.text} sx={{ ml: 1 }}>
                      {settings.language === 'sv' 
                        ? translations.sv[`mood${getMoodKey(entry.mood)}`] 
                        : translations.en[`mood${getMoodKey(entry.mood)}`]}
                    </Typography>
                  </Box>
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

  // Helper function to get mood key
  const getMoodKey = (mood: number): string => {
    switch (mood) {
      case 1: return 'VeryBad';
      case 2: return 'Bad';
      case 3: return 'Okay';
      case 4: return 'Good';
      case 5: return 'VeryGood';
      default: return 'Okay';
    }
  };

  const renderStatistics = () => {
    const stats = calculateMoodStats();
    
    if (!stats) {
      return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 3, bgcolor: currentPalette.paper }}>
            <Typography variant="h5" gutterBottom color={currentPalette.text}>
              {t('statistics')}
            </Typography>
            <Typography variant="body1" color={currentPalette.text}>
              {t('noEntries')}
            </Typography>
          </Paper>
        </Container>
      );
    }

    // Hitta det vanligaste humöret
    let mostCommonMood = 1;
    let maxCount = 0;
    
    Object.entries(stats.counts).forEach(([mood, count]) => {
      if (Number(count) > maxCount) {
        mostCommonMood = Number(mood);
        maxCount = Number(count);
      }
    });

    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3, bgcolor: currentPalette.paper }}>
          <Typography variant="h5" gutterBottom color={currentPalette.text}>
            {t('statistics')}
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color={currentPalette.text}>
              {t('overview')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body1" color={currentPalette.text}>
                {t('numEntries')}: {diaryEntries.length}
              </Typography>
              <Typography variant="body1" color={currentPalette.text}>
                {t('averageMood')}: {stats.average.toFixed(1)} / 5
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" color={currentPalette.text} sx={{ mr: 1 }}>
                  {t('mostCommonMood')}:
                </Typography>
                {customIcons[mostCommonMood].icon}
                <Typography variant="body1" color={currentPalette.text} sx={{ ml: 1 }}>
                  {customIcons[mostCommonMood].label}
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color={currentPalette.text}>
              {t('distribution')}
            </Typography>
            <Stack spacing={1} direction="column">
              {Object.entries(stats.counts).map(([mood, count]) => (
                <Box key={mood} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 150, display: 'flex', alignItems: 'center' }}>
                    {customIcons[Number(mood)].icon}
                    <Typography variant="body2" color={currentPalette.text} sx={{ ml: 1 }}>
                      {customIcons[Number(mood)].label}:
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: 24,
                      bgcolor: currentPalette.primary,
                      borderRadius: 1,
                      width: `${(Number(count) / diaryEntries.length) * 100}%`,
                      minWidth: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'white',
                        fontSize: '0.75rem',
                      }}
                    >
                      {Number(count)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color={currentPalette.text}>
                    {((Number(count) / diaryEntries.length) * 100).toFixed(0)}%
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
          
          <Box>
            <Typography variant="h6" gutterBottom color={currentPalette.text}>
              {t('trend')}
            </Typography>
            <Typography variant="body2" color={currentPalette.text} sx={{ mb: 2 }}>
              {t('latestEntries').replace('{0}', Math.min(7, stats.trend.length).toString())}
            </Typography>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between', 
              p: 2,
              bgcolor: currentPalette.background,
              borderRadius: 1,
              height: 180,
              position: 'relative',
            }}>
              {/* Horisontella linjer för skala */}
              {[1, 2, 3, 4, 5].map(level => (
                <Box
                  key={level}
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: `${(level - 1) * 20}%`,
                    borderBottom: level === 1 ? `2px solid ${currentPalette.text}` : `1px dashed ${currentPalette.text}`,
                    opacity: level === 1 ? 1 : 0.3,
                    zIndex: 1,
                  }}
                />
              ))}
              
              {/* Humörtrendlinje */}
              {stats.trend.slice(-7).map((entry, index, array) => {
                if (index === 0) return null;
                
                const previousEntry = array[index - 1];
                const normalizedX1 = (index - 1) / (array.length - 1);
                const normalizedX2 = index / (array.length - 1);
                const normalizedY1 = (previousEntry.mood - 1) / 4;
                const normalizedY2 = (entry.mood - 1) / 4;
                
                return (
                  <React.Fragment key={entry.date}>
                    {/* Linje mellan punkter */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: `calc(${normalizedX1 * 100}%)`,
                        bottom: `calc(${normalizedY1 * 100}%)`,
                        width: `${((normalizedX2 - normalizedX1) * 100)}%`,
                        height: `${Math.abs((normalizedY2 - normalizedY1) * 100)}%`,
                        borderBottom: normalizedY2 >= normalizedY1 ? 'none' : `2px solid ${currentPalette.primary}`,
                        borderTop: normalizedY2 >= normalizedY1 ? `2px solid ${currentPalette.primary}` : 'none',
                        transformOrigin: 'bottom left',
                        transform: `rotate(${Math.atan2((normalizedY2 - normalizedY1) * 100, (normalizedX2 - normalizedX1) * 100)}rad)`,
                        zIndex: 2,
                      }}
                    />
                  </React.Fragment>
                );
              })}
              
              {/* Humörpunkter */}
              {stats.trend.slice(-7).map((entry, index, array) => {
                const normalizedX = index / (array.length - 1);
                const normalizedY = (entry.mood - 1) / 4;
                
                return (
                  <Box
                    key={entry.date}
                    sx={{
                      position: 'absolute',
                      left: `calc(${normalizedX * 100}% - 10px)`,
                      bottom: `calc(${normalizedY * 100}% - 10px)`,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      bgcolor: currentPalette.primary,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 3,
                    }}
                  >
                    {entry.mood}
                  </Box>
                );
              })}
              
              {/* Datum under grafen */}
              {stats.trend.slice(-7).map((entry, index, array) => {
                const normalizedX = index / (array.length - 1);
                
                return (
                  <Typography
                    key={entry.date}
                    variant="caption"
                    color={currentPalette.text}
                    sx={{
                      position: 'absolute',
                      left: `calc(${normalizedX * 100}% - 20px)`,
                      bottom: -30,
                      width: 40,
                      textAlign: 'center',
                    }}
                  >
                    {new Date(entry.date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'numeric' })}
                  </Typography>
                );
              })}
            </Box>
          </Box>
        </Paper>
      </Container>
    );
  };

  const renderSettings = () => (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, bgcolor: currentPalette.paper }}>
        <Typography variant="h5" gutterBottom color={currentPalette.text}>
          {t('settings')}
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>{t('language')}</InputLabel>
            <Select
              value={settings.language}
              label={t('language')}
              onChange={(e) => handleSettingChange('language', e.target.value)}
            >
              <MenuItem value="sv">Svenska</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom color={currentPalette.text}>
              {t('fontSize')}: {settings.fontSize}px
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
            <InputLabel>{t('colorPalette')}</InputLabel>
            <Select
              value={settings.colorPalette}
              label={t('colorPalette')}
              onChange={(e) => handleSettingChange('colorPalette', e.target.value)}
            >
              <MenuItem value="default">{t('paletteDefault')}</MenuItem>
              <MenuItem value="nature">{t('paletteNature')}</MenuItem>
              <MenuItem value="ocean">{t('paletteOcean')}</MenuItem>
              <MenuItem value="sunset">{t('paletteSunset')}</MenuItem>
              <MenuItem value="lavender">{t('paletteLavender')}</MenuItem>
              <MenuItem value="midnight">{t('paletteMidnight')}</MenuItem>
              <MenuItem value="forest">{t('paletteForest')}</MenuItem>
              <MenuItem value="deepOcean">{t('paletteDeepOcean')}</MenuItem>
              <MenuItem value="custom">{t('paletteCustom')}</MenuItem>
            </Select>
          </FormControl>

          {settings.colorPalette === 'custom' && (
            <Button
              variant="outlined"
              startIcon={<ColorLensIcon />}
              onClick={() => setIsColorPickerOpen(true)}
              sx={{ mt: 2 }}
            >
              {t('customColors')}
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );

  const renderContent = () => {
    switch (currentTab) {
      case 0:
        return (
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3, bgcolor: currentPalette.paper }}>
              <Typography 
                variant="h5" 
                gutterBottom 
                color={currentPalette.text}
                sx={{ fontSize: '1.5rem' }}
              >
                {t('welcomeTitle')}
              </Typography>
              <Typography 
                variant="body1" 
                color={currentPalette.text}
                sx={{ fontSize: '1rem' }}
              >
                {t('welcomeText')}
              </Typography>
            </Paper>
          </Container>
        );
      case 1:
        return renderDiary();
      case 3:
        return renderStatistics();
      case 4:
        return renderSettings();
      default:
        return (
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3, bgcolor: currentPalette.paper }}>
              <Typography 
                variant="h5" 
                gutterBottom 
                color={currentPalette.text}
                sx={{ fontSize: '1.5rem' }}
              >
                {t('comingSoon')}
              </Typography>
              <Typography 
                variant="body1" 
                color={currentPalette.text}
                sx={{ fontSize: '1rem' }}
              >
                {t('inDevelopment')}
              </Typography>
            </Paper>
          </Container>
        );
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
            {t('appTitle')}
          </Typography>
          <TextField
            size="small"
            placeholder={t('search')}
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
          <Tab label={t('tabHome')} />
          <Tab label={t('tabDiary')} />
          <Tab label={t('tabActivities')} />
          <Tab label={t('tabStatistics')} />
          <Tab label={t('tabSettings')} />
        </Tabs>
      </Box>

      {renderContent()}
      {renderColorPicker()}
    </Box>
  );
}

export default App;
