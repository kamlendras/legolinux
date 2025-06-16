"use client"
import React from 'react';
import Grid from "@mui/material/GridLegacy";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Paper,
  Divider,
  Alert
} from '@mui/material';
import {
  Link,
  IconButton,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import {
  Download,
  Computer,
  Memory,
  Storage,
  Verified,
  Info
} from '@mui/icons-material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
    primary: {
      main: '#90caf9',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
});
interface DownloadOption {
  version: string;
  architecture: string;
  size: string;
  checksum: string;
  downloadUrl: string;
  recommended?: boolean;
}

const LegoLinuxDownload: React.FC = () => {
  const downloadOptions: DownloadOption[] = [
    {
      version: "LegoLinux 2025.1 LTS",
      architecture: "x86_64",
      size: "420 MB",
      checksum: "sha256: a1b2c3d4e5f6...",
      downloadUrl: "#",
      recommended: true
    },
    {
      version: "LegoLinux 2025.1 LTS",
      architecture: "ARM64",
      size: "360 MB",
      checksum: "sha256: f6e5d4c3b2a1...",
      downloadUrl: "#"
    },
    {
      version: "LegoLinux 2025.1 Minimal",
      architecture: "x86_64",
      size: "64 MB",
      checksum: "sha256: 123456789abc...",
      downloadUrl: "#"
    }
  ];

  const systemRequirements = {
    minimum: {
      ram: "200 MB RAM",
      storage: "2 GB storage",
      processor: "64-bit processor"
    },
    recommended: {
      ram: "1 GB RAM",
      storage: "10 GB storage",
      processor: "Modern 64-bit processor"
    }
  };

  const handleDownload = (option: DownloadOption) => {
    // In a real implementation, this would trigger the actual download
    console.log(`Downloading ${option.version} ${option.architecture}`);
  };

  return (
     <ThemeProvider theme={darkTheme}>
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" color="white" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Download LegoLinux
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Thank you for downloading LegoLinux 2025.1 LTS
          </Typography>
          <Chip 
            label="Latest Release: 2025.1 LTS" 
            color="primary" 
            variant="outlined"
            sx={{ fontSize: '1rem', py: 1 }}
          />
        </Box>

        {/* Alert */}
        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="body2">
            <strong>New to LegoLinux?</strong> Check out our installation guide and documentation 
            to get started with your modular Linux experience.
          </Typography>
        </Alert>

        {/* Download Options */}
        <Typography variant="h4" color='white' sx={{ mb: 3 }}>
          Download Options
        </Typography>
        


        
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {downloadOptions.map((option, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card 
                elevation={option.recommended ? 4 : 2}
                sx={{ 
                  height: '100%',
                  position: 'relative',
                }}
              >
                {option.recommended && (
                  <Chip
                    label="Recommended"
                    color="primary"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      zIndex: 1
                    }}
                  />
                )}
                
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {option.version}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {option.architecture} Architecture
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={2} flexWrap="wrap">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Storage fontSize="small" color="action" />
                        <Typography variant="body2">{option.size}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Computer fontSize="small" color="action" />
                        <Typography variant="body2">{option.architecture}</Typography>
                      </Box>
                    </Stack>

                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Checksum: {option.checksum}
                      </Typography>
                    </Box>

                    <Button
                    className='contained-button'
                      startIcon={<Download />}
                      onClick={() => handleDownload(option)}
                      size="large"
                    >
                      Download
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* System Requirements */}
        <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Info color="primary" />
            System Requirements
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="text.secondary">
                Minimum Requirements
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Memory fontSize="small" />
                  <Typography>{systemRequirements.minimum.ram}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Storage fontSize="small" />
                  <Typography>{systemRequirements.minimum.storage}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Computer fontSize="small" />
                  <Typography>{systemRequirements.minimum.processor}</Typography>
                </Box>
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="primary">
                Recommended
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Memory fontSize="small" />
                  <Typography>{systemRequirements.recommended.ram}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Storage fontSize="small" />
                  <Typography>{systemRequirements.recommended.storage}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Computer fontSize="small" />
                  <Typography>{systemRequirements.recommended.processor}</Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* Verification */}
        <Paper elevation={1} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Verified color="primary" />
            Verify Your Download
          </Typography>
          
          <Typography variant="body1" paragraph>
            Always verify the integrity of your download using the provided checksums. 
            This ensures your ISO file hasn't been corrupted during download.
          </Typography>
          
          <Box sx={{ bgcolor: 'grey.900', p: 2, borderRadius: 1, fontFamily: 'monospace' }}>
            <Typography variant="body2">
              # Verify SHA256 checksum<br />
              sha256sum legolinux-2025.1-x86_64.iso
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
    </ThemeProvider>
  );
};

export default LegoLinuxDownload;