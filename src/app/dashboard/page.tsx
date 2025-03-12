'use client';

import { useState } from 'react';

export default function DashboardPage() {
    const [longUrl, setLongUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');

    // Function to handle form submission
    const handleSubmit = async () => {
        const data = { longUrl };

        try {
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const result = await response.json();
                console.error('Error shortening URL:', result.error || 'Unknown error');
                return;
            }

            const result = await response.json();
            console.log('Shortened URL:', result.shortUrl);
            setShortenedUrl(result.shortUrl); // Set shortened URL to display
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <h1>Dashboard</h1>

            <div>
                <label>
                    Long URL:
                    <input
                        type="url"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        placeholder="Enter long URL"
                        required
                    />
                </label>
            </div>

            <button onClick={handleSubmit}>Shorten URL</button>

            {shortenedUrl && (
                <div className="result">
                    <h3>Your shortened URL:</h3>
                    <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
                        {shortenedUrl}
                    </a>
                </div>
            )}
        </>
    );
}
