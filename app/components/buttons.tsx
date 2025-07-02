import React from 'react';
import { Button, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue color for "Get Started" button
    },
  },
});

export default function MUIButtons() {
  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1.5, sm: 2 }, 
          mt: { xs: 3, sm: 4, md: 5 },
          alignItems: { xs: 'stretch', sm: 'center' },
          width: '100%'
        }}
      >
        <Button
          variant="outlined"
          size="large"
          sx={{
            color: 'white',
            whiteSpace:'nowrap',
            borderColor: 'white',
            borderWidth: 2,
            px: { xs: 4, sm: 6, md: 7 },
            py: { xs: 1.2, sm: 1.5 },
            fontSize: { xs: '16px', sm: '18px', md: '20px' },
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 1,
            minHeight: { xs: '48px', sm: '56px' },
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
        >
          Read the Docs
        </Button>
        
        <Button
          variant="contained"
          size="large"
          sx={{
                whiteSpace:'nowrap',
            backgroundColor: '#2563eb', // Blue color to match image
            px: { xs: 4, sm: 6, md: 8 },
            py: { xs: 1.2, sm: 1.5 },
            fontSize: { xs: '16px', sm: '18px', md: '20px' },
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 1,
            minHeight: { xs: '48px', sm: '56px' },
            '&:hover': {
              backgroundColor: '#1d4ed8',
            }
          }}
        >
          Get Started
        </Button>
      </Box>
    </ThemeProvider>
  );
}