import { MeiliSearch } from 'meilisearch';

if (!process.env.NEXT_PUBLIC_MEILISEARCH_HOST) {
  console.error('MeiliSearch host is not configured');
}

if (!process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY) {
  console.error('MeiliSearch API key is not configured');
}

export const searchClient = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_HOST || '',
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY || '',
});

// Log the configuration (without sensitive data)
console.log('MeiliSearch configured with host:', process.env.NEXT_PUBLIC_MEILISEARCH_HOST);

export const searchIndex = searchClient.index('packages');

// Test the connection
searchIndex.getStats()
  .then(stats => {
    console.log('MeiliSearch connection successful. Index stats:', stats);
  })
  .catch(error => {
    console.error('MeiliSearch connection error:', error);
  }); 