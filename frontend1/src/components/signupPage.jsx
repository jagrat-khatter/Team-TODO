import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [showDiv, setShowDiv] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = async () => {
    if (!username.trim() || !password.trim()) {
      setError('⚠️ Username and password cannot be empty.');
      setShowDiv(false);
      return;
    }

    setError('');
    // Prepare the payload
    const payload = {
      username: username,
      password: password,
    };

    try {
      // Make the POST request to the API
      const response = await fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`✅ New User created! JWT token generated: ${data.token}`);
        // Save the JWT token to localStorage
        localStorage.setItem('jwtToken', data.jwt);

        // Redirect to the dashboard
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        setError(`❌ Signup failed: ${errorData.msg}`);
        setShowDiv(false);
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('❌ An error occurred while making the request.');
      setShowDiv(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.glassCard}>
        <h2 style={styles.heading}>🚀 Create Account</h2>

        {error && <div style={styles.errorText}>{error}</div>}

        <input
          type="text"
          placeholder="👤 Enter your username"
          style={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="🔒 Enter your password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit} style={styles.button}>
          🔥 Submit
        </button>

        {showDiv && (
          <div style={styles.successBox}>
            Loda  lele mera
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: '"Poppins", sans-serif',
  },
  glassCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    boxShadow: '0 0 40px rgba(0, 255, 255, 0.2)',
    padding: '40px 20px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    color: '#fff',
  },
  heading: {
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '25px',
    color: '#00ffe7',
    textShadow: '0 0 10px #00ffe7',
  },
  input: {
    width: '100%',
    padding: '15px 18px',
    marginBottom: '20px',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    transition: '0.3s',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '14px 20px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #00feba, #5b86e5)',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 0 15px #00feba',
    transition: 'all 0.3s ease',
  },
  successBox: {
    marginTop: '20px',
    padding: '15px',
    borderRadius: '10px',
    backgroundColor: 'rgba(0, 255, 153, 0.2)',
    color: '#00ffcc',
    fontWeight: '500',
    border: '1px solid #00ffcc',
    boxShadow: '0 0 10px rgba(0,255,153,0.5)',
  },
  errorText: {
    marginBottom: '15px',
    color: '#ff4d4d',
    fontWeight: '500',
  }
};

export default SignupPage;