import React, { useState, useEffect } from 'react';
import '../App.css'; // same App.css mein styling rahegi

const Dashboard = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [savedTitle, setSavedTitle] = useState('');
    const [savedDescription, setSavedDescription] = useState('');

    useEffect(() => {
        setSavedTitle(localStorage.getItem('title') || '');
        setSavedDescription(localStorage.getItem('description') || '');
    }, []);

    const handleSave = () => {
        localStorage.setItem('title', title);
        localStorage.setItem('description', description);
        alert('✅ Data saved to localStorage!');
        setSavedTitle(title);
        setSavedDescription(description);
    };

    return (
        <div className="signup-wrapper">
            <div className="signup-card">
                <h2 className="signup-heading">📊 Dashboard</h2>
                <p className="dashboard-text">This is the main dashboard of your application.</p>

                <input
                    type="text"
                    placeholder="📝 Enter title"
                    className="signup-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="📄 Enter description"
                    className="signup-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button className="signup-button" onClick={handleSave}>
                    💾 Save
                </button>

                <div className="success-box">
                    <h3>📦 Saved Data</h3>
                    <p><strong>Title:</strong> {savedTitle || 'No title saved'}</p>
                    <p><strong>Description:</strong> {savedDescription || 'No description saved'}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
