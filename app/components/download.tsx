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
  Alert,
  Link as MuiLink,
  useTheme,
  alpha
} from '@mui/material';
import {
  Download,
  Computer,
  Memory,
  Storage,
  Verified,
  Info
} from '@mui/icons-material';

import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4285F4', // Google Blue
    },
    secondary: {
      main: '#EA4335', // Google Red
    },
    background: {
      default: '#121212',
      paper: '#23272f',
    },
    success: {
      main: '#34A853', // Google Green
    },
    warning: {
      main: '#FBBC05', // Google Yellow
    },
    text: {
      primary: '#fff',
      secondary: '#b3b3b3',
    },
    divider: 'rgba(255,255,255,0.12)',
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h2: {
      fontWeight: 700,
      fontSize: '2.8rem',
      letterSpacing: '-0.02em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.3rem',
    },
    body1: {
      fontSize: '1.1rem',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'box-shadow 0.3s',
          '&:hover': {
            boxShadow: '0 8px 32px 0 rgba(66,133,244,0.18)',
            transform: 'translateY(-2px) scale(1.01)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
          textTransform: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          letterSpacing: '0.01em',
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);

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
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: { xs: 2, md: 6 } }}>
        <Container maxWidth="md">
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" color="primary" component="h1" gutterBottom>
              Download LegoLinux
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              Thank you for choosing LegoLinux 2025.1 LTS
            </Typography>
            <Chip 
              label="Latest Release: 2025.1 LTS" 
              color="primary" 
              variant="filled"
              sx={{ fontSize: '1rem', py: 1, px: 2, borderRadius: 2, boxShadow: 1 }}
            />
          </Box>

          {/* Alert */}
          <Alert severity="info" sx={{ mb: 4, borderRadius: 2, fontSize: '1.1rem', alignItems: 'center' }}>
            <Typography variant="body2">
              <strong>New to LegoLinux?</strong> &nbsp;
              <MuiLink href="#" color="primary" underline="hover" sx={{ fontWeight: 600 }}>
                Read the installation guide
              </MuiLink>
              &nbsp;or&nbsp;
              <MuiLink href="#" color="primary" underline="hover" sx={{ fontWeight: 600 }}>
                view documentation
              </MuiLink>
              &nbsp;to get started with your modular Linux experience.
            </Typography>
          </Alert>

          {/* Download Options */}
          <Typography variant="h4" color='primary' sx={{ mb: 3, fontWeight: 700 }}>
            Download Options
          </Typography>

          <Grid container spacing={4} sx={{ mb: 6 }}>
            {downloadOptions.map((option, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  elevation={option.recommended ? 8 : 3}
                  sx={{ 
                    height: '100%',
                    position: 'relative',
                    borderRadius: 3,
                    bgcolor: option.recommended ? alpha(theme.palette.primary.main, 0.10) : 'background.paper',
                    boxShadow: option.recommended ? '0 8px 32px 0 rgba(66,133,244,0.18)' : undefined,
                    border: option.recommended ? `2px solid ${theme.palette.primary.main}` : undefined,
                  }}
                >
                  {option.recommended && (
                    <Chip
                      label="Recommended"
                      color="primary"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 1,
                        fontWeight: 700,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        boxShadow: 1
                      }}
                    />
                  )}
                  <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
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
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<Download />}
                      onClick={() => handleDownload(option)}
                      size="large"
                      sx={{ mt: 1, fontWeight: 700, fontSize: '1.1rem', py: 1.2, borderRadius: 2, boxShadow: 2, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 6 } }}
                      aria-label={`Download ${option.version} for ${option.architecture}`}
                    >
                      Download
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* System Requirements */}
          <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 700 }}>
              <Info color="primary" />
              System Requirements
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom color="text.secondary" sx={{ fontWeight: 600 }}>
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
                <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
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
          <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 700 }}>
              <Verified color="primary" />
              Verify Your Download
            </Typography>
            <Typography variant="body1" paragraph>
              Always verify the integrity of your download using the provided checksums. This ensures your ISO file hasn't been corrupted during download.
            </Typography>
            <Box sx={{ bgcolor: 'grey.900', p: 2, borderRadius: 2, fontFamily: 'monospace', mb: 1 }}>
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