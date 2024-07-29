import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Footer from './components/Footer';
import Header from './components/Header';
import './App.css';

const getBrowserInfo = () => {
  return {
    userAgent: navigator.userAgent,
    appVersion: navigator.appVersion,
    platform: navigator.platform,
    language: navigator.language,
  };
};

function App() {
  const [voteCount, setVoteCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(Cookies.get('hasVoted') === 'true');
  const twitterUrl = `https://twitter.com/intent/tweet?text=Join%20the%20movement%20with%20${voteCount}%20other%20Nigerians!&url=https://something-i.com&hashtags=EndBadGovernanceProtest`;


  useEffect(() => {
    axios.get('http://localhost:8000/api/protest-count')
      .then(response => {
        setVoteCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching vote count:', error);
      });
  }, []);

  const handleVote = async () => {
    if (hasVoted) {
      alert('You have already voted!');
      return;
    }

    const browserInfo = getBrowserInfo();

    try {
      const response = await axios.post('http://localhost:8000/api/protest', browserInfo);

      if (response.status === 200) {
        Cookies.set('hasVoted', 'true');
        setHasVoted(true);
        setVoteCount(voteCount + 1);
      } else {
        alert('Failed to vote. Please try again.');
      }
    } catch (error) {
      alert('Failed to vote. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <div className='p-body'>
        <h1>{voteCount}</h1>
        <p>Nigerians are tired of the wickedness of the government 
          and are ready to exercise their right</p>
        <div className="card">
          <button onClick={handleVote} disabled={hasVoted}>
            {hasVoted ? 'You are a hero 😉' : 'I will be protesting 😌'}
          </button>
        </div>
        <div className='twitter-link'>
          <a href={twitterUrl}>Share on Twitter (X)</a>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
