// components/QueryBox.tsx

"use client";

import { useState } from 'react';
import { FaMicrophone, FaCopy, FaFileDownload } from 'react-icons/fa';
import styles from './QueryBox.module.css'; // Import the CSS module

const QueryBox: React.FC = () => {
  const [query, setQuery] = useState<string>(''); 
  const [response, setResponse] = useState<string>(''); 
  const [listening, setListening] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (res.ok) {
      const data = await res.json();
      setResponse(data.result);
    } else {
      console.error('Error fetching AI response:', res.statusText);
      setResponse('Error fetching response');
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    setListening(true);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      setQuery(event.results[0][0].transcript);
      setListening(false);
    };

    recognition.onerror = (event: SpeechRecognitionError) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response).then(() => {
      alert('Copied to clipboard!');
    });
  };

  const downloadWordDoc = () => {
    const blob = new Blob([response], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'response.doc';
    link.click();
  };

  return (
    <div className={styles.queryContainer}>
      <form onSubmit={handleSubmit} className={styles.queryBox}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask AI Scholar Bot a question..."
          className={styles.inputField}
        />
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
        <button type="button" onClick={startListening} className={styles.listenButton}>
          {listening ? 'Listening...' : <FaMicrophone />}
        </button>
      </form>

      {response && (
        <div className={styles.responseContainer}>
          <h3 className="font-semibold">AI Scholar Bot Response:</h3>
          <p className={styles.responseText}>{response}</p>
          <div className={styles.actionButtons}>
            <button onClick={copyToClipboard} className={`${styles.actionButton} ${styles.copyButton}`}>
              <FaCopy className="mr-1" /> Copy
            </button>
            <button onClick={downloadWordDoc} className={`${styles.actionButton} ${styles.downloadButton}`}>
              <FaFileDownload className="mr-1" /> Download as Word
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryBox;
