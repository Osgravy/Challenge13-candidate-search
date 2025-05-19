import { useState, useEffect } from 'react';
import { fetchRandomUser } from '../api/API';
import { GitHubUser } from '../types';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNewCandidate = async () => {
    setLoading(true);
    setError(null);
    try {
      const candidate = await fetchRandomUser();
      setCurrentCandidate(candidate);
    } catch (err) {
      setError('Failed to load candidate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveCandidate = () => {
    if (!currentCandidate) return;
    
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    const exists = savedCandidates.some((c: GitHubUser) => c.id === currentCandidate.id);
    
    if (!exists) {
      savedCandidates.push(currentCandidate);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    }
    
    loadNewCandidate();
  };

  const rejectCandidate = () => {
    loadNewCandidate();
  };

  useEffect(() => {
    loadNewCandidate();
  }, []);

  if (loading) return <div>Loading candidate...</div>;
  if (error) return <div>{error}</div>;
  if (!currentCandidate) return <div>No more candidates available</div>;

  return (
    <div className="candidate-container">
      <div className="candidate-card">
        <img src={currentCandidate.avatar_url} alt="Avatar" width="150" />
        <h2>{currentCandidate.name || 'No name provided'}</h2>
        <p>Username: {currentCandidate.login}</p>
        <p>Location: {currentCandidate.location || 'Unknown'}</p>
        <p>Email: {currentCandidate.email || 'Not provided'}</p>
        <p>GitHub: <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">Profile</a></p>
        <p>Company: {currentCandidate.company || 'Not provided'}</p>
        
        <div className="button-group">
          <button onClick={rejectCandidate} className="reject-btn">-</button>
          <button onClick={saveCandidate} className="accept-btn">+</button>
        </div>
      </div>
    </div>
  );
};

export default CandidateSearch;