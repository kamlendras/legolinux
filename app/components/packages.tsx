'use client';

import { useState, useEffect } from 'react';
import { 
  TextField, 
  InputAdornment, 
  Container, 
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  CircularProgress,
  Typography,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { searchIndex } from '../lib/meilisearch';
import SearchResults from './SearchResults';
import { SearchResponse } from 'meilisearch';
import { useSearchParams } from 'next/navigation';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#202124',
      paper: '#202124',
    },
  },
});

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


export default function Home() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('query') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<SearchResponse<Package> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [featuredPackages, setFeaturedPackages] = useState<Package[]>([]);
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true);

  // Load featured packages on initial load
  useEffect(() => {
    const loadFeaturedPackages = async () => {
      setIsLoadingFeatured(true);
      try {
        console.log('Loading featured packages...');
        const results = await searchIndex.search<Package>('*', {
          limit: 6,
          sort: ['Popularity:desc'],
        });
        console.log('Featured packages loaded:', results);
        setFeaturedPackages(results.hits);
      } catch (error: any) {
        console.error('Error loading featured packages:', {
          message: error?.message,
          name: error?.name,
          stack: error?.stack
        });
        setFeaturedPackages([]);
      } finally {
        setIsLoadingFeatured(false);
      }
    };

    loadFeaturedPackages();
  }, []);

  // Sync searchQuery with URL param if it changes
  useEffect(() => {
    if (initialQuery && initialQuery !== searchQuery) {
      setSearchQuery(initialQuery);
      setDebouncedQuery(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Perform search
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
        setSearchResults(null);
        return;
      }

      setIsLoading(true);
      try {
        console.log('Performing search with query:', debouncedQuery);
        const results = await searchIndex.search<Package>(debouncedQuery, {
          limit: 20,
          attributesToSearchOn: ['Name', 'Description', 'Maintainer'], // Use actual field names
          attributesToRetrieve: ['ID', 'Name', 'Description', 'Version', 'Maintainer', 'Keywords', 'License', 'NumVotes', 'Popularity'], // Use actual field names
        });
        console.log('Search results:', results);
        setSearchResults(results);
      } catch (error: any) {
        console.error('Search error details:', {
          message: error?.message || 'Unknown error',
          name: error?.name || 'Unknown error name',
          stack: error?.stack || 'No stack trace'
        });
        setSearchResults(null);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: { xs: '80px', sm: '100px' },
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 584,
              position: 'sticky',
              top: { xs: '80px', sm: '100px' },
              zIndex: 1,
              backgroundColor: '#202124',
              py: 2,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search packages..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {isLoading ? (
                      <CircularProgress size={20} sx={{ color: '#9aa0a6' }} />
                    ) : (
                      <SearchIcon sx={{ color: '#9aa0a6' }} />
                    )}
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '44px',
                  backgroundColor: '#303134',
                  borderRadius: '24px',
                  boxShadow: '0 1px 6px 0 rgba(0,0,0,.28)',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover': {
                    backgroundColor: '#303134',
                    boxShadow: '0 1px 6px 0 rgba(0,0,0,.28)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: '#303134',
                    boxShadow: '0 1px 6px 0 rgba(0,0,0,.28)',
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                },
                '& .MuiInputBase-input': {
                  fontSize: '16px',
                  color: '#e8eaed',
                  '&::placeholder': {
                    color: '#9aa0a6',
                    opacity: 1,
                  },
                },
              }}
            />
          </Box>

          <Box sx={{ width: '100%', px: 2 }}>
            {!searchQuery ? (
              <>
                <Typography variant="h5" sx={{ color: '#e8eaed', mb: 2, mt: 4 }}>
                  Popular Packages
                </Typography>
                {isLoadingFeatured ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                  </Box>
                ) : featuredPackages.length > 0 ? (
                  <SearchResults 
                    results={{ 
                      hits: featuredPackages,
                      processingTimeMs: 0,
                      query: '',
                      limit: 6,
                      offset: 0,
                      estimatedTotalHits: featuredPackages.length
                    }} 
                    isLoading={false} 
                  />
                ) : (
                  <Typography sx={{ color: '#9aa0a6', textAlign: 'center', my: 4 }}>
                    No packages found.
                  </Typography>
                )}
                <Divider sx={{ my: 4, borderColor: '#3c4043' }} />
                <Typography variant="h5" sx={{ color: '#e8eaed', mb: 2 }}>
                  Categories
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {['System', 'Development', 'Games', 'Multimedia', 'Network', 'Office'].map((category) => (
                    <Box
                      key={category}
                      sx={{
                        backgroundColor: '#303134',
                        borderRadius: '16px',
                        p: 2,
                        minWidth: '120px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#3c4043',
                        },
                      }}
                    >
                      <Typography sx={{ color: '#e8eaed' }}>{category}</Typography>
                    </Box>
                  ))}
                </Box>
              </>
            ) : (
              <SearchResults results={searchResults} isLoading={isLoading} />
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
