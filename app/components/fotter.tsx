"use client"
import React from 'react';
import Grid from "@mui/material/GridLegacy";
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import {
  Twitter,
  Reddit,
  GitHub,
  Email,
  Description,
  Forum,
  Security,
  Download,
  Chat,
} from '@mui/icons-material';

// Custom icons for services not available in MUI icons
const MastodonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"/>
  </svg>
);

const MatrixIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M.632.55v22.9H2.28V24H0V0h2.28v.55zm7.043 7.26v1.157h.033c.309-.443.683-.784 1.117-1.024.433-.245.936-.365 1.507-.365.54 0 1.033.107 1.481.314.448.208.785.582 1.02 1.108.254-.374.6-.706 1.034-.992.434-.287.95-.43 1.546-.43.453 0 .872.056 1.26.167.388.11.716.286.993.53.276.245.489.559.646.951.152.392.23.863.23 1.417v5.728h-2.349V11.52c0-.286-.01-.559-.032-.812a1.755 1.755 0 0 0-.18-.66 1.106 1.106 0 0 0-.438-.448c-.194-.11-.457-.166-.785-.166-.332 0-.6.064-.803.189a1.38 1.38 0 0 0-.48.499 1.946 1.946 0 0 0-.231.696 5.56 5.56 0 0 0-.06.785v4.317h-2.35v-4.639c0-.565-.04-1.084-.122-1.564-.082-.48-.234-.885-.459-1.22-.225-.334-.52-.588-.884-.762-.365-.174-.816-.261-1.35-.261-.22 0-.456.037-.702.11a2.06 2.06 0 0 0-.677.334 1.83 1.83 0 0 0-.507.565c-.138.23-.207.507-.207.835v6.602H5.46V7.81zm15.693 15.64V.55H21.72V0H24v24h-2.28v-.55z"/>
  </svg>
);

const GitLabIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.955 13.587l-1.342-4.135-2.664-8.189c-.135-.423-.73-.423-.867 0L16.418 9.45H7.582L4.919 1.263c-.135-.423-.73-.423-.867 0L1.388 9.452-.955 13.587a.863.863 0 0 0 .314 1.04L12 22.88l10.641-8.253a.863.863 0 0 0 .314-1.04"/>
  </svg>
);

// Create dark theme
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

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const socialLinks = [
    {
      name: 'Twitter',
      icon: <Twitter />,
      url: 'https://x.com/legolinux',
    },
    {
      name: 'Mastodon',
      icon: <MastodonIcon />,
      url: 'https://fosstodon.org/@legolinux',
    },
    {
      name: 'Reddit',
      icon: <Reddit />,
      url: 'https://reddit.com/r/legolinux',
    },
    {
      name: 'Matrix',
      icon: <MatrixIcon />,
      url: 'https://matrix.to/#/#legolinux:legolinux.org',
    },

    {
      name: 'GitHub',
      icon: <GitHub />,
      url: 'https://github.com/kamlendras/legolinux',
    },
    {
      name: 'GitLab',
      icon: <GitLabIcon />,
      url: 'https://gitlab.legolinux.org',
    },
  ];

  const resourceLinks = [
    {
      name: 'Packages',
      icon: <Download />,
      url: '/packages',
    },
    {
      name: 'Forums',
      icon: <Forum />,
      url: 'https://forum.legolinux.org',
    },
    {
      name: 'Documentation',
      icon: <Description />,
      url: 'https://docs.legolinux.org',
    },
    {
      name: 'Security',
      icon: <Security />,
      url: '/security',
    },
    {
      name: 'Download',
      icon: <Download />,
      url: '/download',
    },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        component="footer"
        className={className}
        sx={{
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
          py: 4,
          mt: 'auto',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Social Media Section */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                Connect With Us
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {socialLinks.map((link) => (
                  <IconButton
                    key={link.name}
                    component="a"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'translateY(-2px)',
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                    aria-label={link.name}
                  >
                    {link.icon}
                  </IconButton>
                ))}
              </Box>
            </Grid>

            {/* Resources Section */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                Resources
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {resourceLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.url}
                    underline="hover"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      py: 0.5,
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main',
                      },
                      transition: 'color 0.2s ease-in-out',
                    }}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
              </Box>
            </Grid>

            {/* Contact Section */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                Contact
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ color: 'text.secondary' }} />
                <Link
                  href="mailto:ks@legolinux.org"
                  underline="hover"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                    },
                    transition: 'color 0.2s ease-in-out',
                  }}
                >
                  ks@legolinux.org
                </Link>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Copyright Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} LegoLinux. All rights reserved.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;