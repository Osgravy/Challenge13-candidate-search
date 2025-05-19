import { useEffect, useState } from 'react';
import { GitHubUser } from '../types';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<GitHubUser[]>([]);

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);

  const removeCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== id);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  if (savedCandidates.length === 0) {
    return <div>No candidates have been accepted yet.</div>;
  }

  return (
    <div className="saved-candidates">
      <h1>Potential Candidates</h1>
      <div className="candidates-list">
        {savedCandidates.map(candidate => (
          <div key={candidate.id} className="candidate-item">
            <img src={candidate.avatar_url} alt="Avatar" width="100" />
            <div className="candidate-info">
              <h3>{candidate.name || candidate.login}</h3>
              <p>Username: {candidate.login}</p>
              <p>Location: {candidate.location || 'Unknown'}</p>
              <p>Email: {candidate.email || 'Not provided'}</p>
              <p>GitHub: <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">Profile</a></p>
              <p>Company: {candidate.company || 'Not provided'}</p>
            </div>
            <button onClick={() => removeCandidate(candidate.id)} className="remove-btn">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedCandidates;