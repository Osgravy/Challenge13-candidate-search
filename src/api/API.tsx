import { GitHubUser } from '../types';

const fetchRandomUser = async (): Promise<GitHubUser> => {
  try {
    // Generate a random ID between 1 and 10,000,000
    const randomId = Math.floor(Math.random() * 10000000) + 1;
    
    const response = await fetch(`https://api.github.com/user/${randomId}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        // GitHub's API requires this header for the /user endpoint
        'User-Agent': 'Candidate-Search-App' 
      }
    });

    if (!response.ok) {
      // If user not found (404), try again with a different ID
      if (response.status === 404) {
        return fetchRandomUser();
      }
      throw new Error(`API Error: ${response.status}`);
    }

    const data: GitHubUser = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching user:', err);
    // Retry on any error
    return fetchRandomUser();
  }
};

export { fetchRandomUser };