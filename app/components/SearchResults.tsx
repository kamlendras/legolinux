import { Box, Card, CardContent, Typography, Rating, Chip, Avatar, Skeleton, useTheme, Divider } from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import { SearchResponse } from 'meilisearch';
import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface Package {
  ID: number;
  Name: string;
  Description: string;
  Version: string;
  Maintainer: string;
  Depends?: string[];
  FirstSubmitted?: number;
  Keywords?: string[];
  LastModified?: number;
  License?: string[];
  NumVotes?: number;
  OutOfDate?: number | null;
  PackageBase?: string;
  PackageBaseID?: number;
  Popularity?: number;
  Submitter?: string;
  URL?: string;
  URLPath?: string;
}

interface SearchResultsProps {
  results: SearchResponse<Package> | null;
  isLoading: boolean;
}

export default function SearchResults({ results, isLoading }: SearchResultsProps) {
  const theme = useTheme();
  if (isLoading) {
    return (
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 80%, ${theme.palette.background.default} 100%)`,
                border: `1.5px solid ${theme.palette.divider}`,
                borderRadius: 3,
                boxShadow: 6,
                p: 0,
                minHeight: 260,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: 'box-shadow 0.25s, transform 0.25s',
                '&:hover': {
                  boxShadow: 12,
                  transform: 'scale(1.025)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Skeleton variant="circular" width={56} height={56} sx={{ mr: 2 }} animation="wave" />
                  <Box sx={{ width: '100%' }}>
                    <Skeleton variant="text" width="70%" height={28} animation="wave" sx={{ borderRadius: 2 }} />
                    <Skeleton variant="text" width="40%" height={20} animation="wave" sx={{ borderRadius: 2, mt: 1 }} />
                  </Box>
                </Box>
                <Divider sx={{ my: 2, borderColor: theme.palette.divider, opacity: 0.18 }} />
                <Skeleton variant="text" width="100%" height={20} animation="wave" sx={{ mb: 1.2, borderRadius: 2 }} />
                <Skeleton variant="text" width="90%" height={20} animation="wave" sx={{ mb: 1.2, borderRadius: 2 }} />
                <Skeleton variant="text" width="70%" height={20} animation="wave" sx={{ borderRadius: 2 }} />
                <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                  <Skeleton variant="rounded" width={80} height={28} animation="wave" sx={{ borderRadius: 8 }} />
                  <Skeleton variant="rounded" width={80} height={28} animation="wave" sx={{ borderRadius: 8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!results?.hits.length) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: '#e8eaed', mb: 1 }}>
          No results found
        </Typography>
        <Typography variant="body2" sx={{ color: '#9aa0a6' }}>
          Try different keywords or check your spelling
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      {results.hits.map((pkg) => {
        const [expanded, setExpanded] = useState(false);
        return (
          <Grid item xs={12} sm={6} md={4} key={pkg.ID}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#303134',
                borderRadius: '12px',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  backgroundColor: '#3c4043',
                  cursor: 'pointer',
                },
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        color: '#e8eaed',
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        mb: 0.5,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {pkg.Name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#9aa0a6',
                        fontSize: '0.875rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      Maintainer: {pkg.Maintainer || 'N/A'}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    color: '#9aa0a6',
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    fontSize: '0.875rem',
                    lineHeight: 1.4,
                  }}
                >
                  {pkg.Description}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                  <Chip label={`Version: v${pkg.Version}`} size="small" sx={{ backgroundColor: '#5f6368', color: '#e8eaed' }} />
                  {pkg.NumVotes !== undefined && (
                    <Chip label={`Votes: ${pkg.NumVotes}`} size="small" sx={{ backgroundColor: '#5f6368', color: '#e8eaed' }} />
                  )}
                  {pkg.Popularity !== undefined && (
                    <Chip label={`Popularity: ${pkg.Popularity.toFixed(2)}`} size="small" sx={{ backgroundColor: '#5f6368', color: '#e8eaed' }} />
                  )}
                  {pkg.License && pkg.License.length > 0 && (
                    <Chip label={`License: ${pkg.License.join(', ')}`} size="small" sx={{ backgroundColor: '#5f6368', color: '#e8eaed' }} />
                  )}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#8ab4f8' }}
                    onClick={() => setExpanded((prev) => !prev)}
                  >
                    <Typography variant="body2" sx={{ mr: 0.5 }}>
                      {expanded ? 'Show less' : 'Show more'}
                    </Typography>
                    {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                  </Box>
                </Box>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                    <Typography variant="body2" sx={{ color: '#e8eaed' }}>
                      <b>ID:</b> {pkg.ID}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#e8eaed' }}>
                      <b>Depends:</b> {pkg.Depends && pkg.Depends.length > 0 ? pkg.Depends.join(', ') : 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#e8eaed' }}>
                      <b>First Submitted:</b> {pkg.FirstSubmitted !== undefined && pkg.FirstSubmitted !== null
                        ? new Date(pkg.FirstSubmitted * 1000).toLocaleDateString()
                        : 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#e8eaed' }}>
                      <b>Keywords:</b> {pkg.Keywords && pkg.Keywords.length > 0 ? pkg.Keywords.join(', ') : 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#e8eaed' }}>
                      <b>Last Modified:</b> {pkg.LastModified !== undefined && pkg.LastModified !== null
                        ? new Date(pkg.LastModified * 1000).toLocaleDateString()
                        : 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#e8eaed' }}>
                      <b>OutOfDate:</b> {pkg.OutOfDate !== undefined && pkg.OutOfDate !== null ? pkg.OutOfDate : 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#e8eaed' }}>
                      <b>PackageBase:</b> {pkg.PackageBase || 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#e8eaed' }}>
                      <b>PackageBaseID:</b> {pkg.PackageBaseID !== undefined ? pkg.PackageBaseID : 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#e8eaed' }}>
                      <b>Submitter:</b> {pkg.Submitter || 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#e8eaed' }}>
                      <b>URL:</b> {pkg.URL ? <a href={pkg.URL} target="_blank" rel="noopener noreferrer" style={{ color: '#8ab4f8', textDecoration: 'underline' }}>{pkg.URL}</a> : 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#e8eaed' }}>
                      <b>URLPath:</b> {pkg.URLPath ? <a href={pkg.URLPath} target="_blank" rel="noopener noreferrer" style={{ color: '#8ab4f8', textDecoration: 'underline' }}>{pkg.URLPath}</a> : 'N/A'}
                    </Typography>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
} 