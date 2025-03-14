'use client';

import { useState } from 'react';

export default function DashboardPage() {
    const [longUrl, setLongUrl] = useState('');
    const [name, setName] = useState('');
    const [shortUrl, setShortenedUrl] = useState('');
    const [error, setError] = useState('');

    // Function to handle form submission
    const handleSubmit = async () => {
        const data = { longUrl, name };

        try {
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',  // Make sure to specify content type
                },
                body: JSON.stringify({
                  longUrl: data.longUrl,
                  name: data.name
                }),
              });

            // read response once
            const result = await response.json();

            if (!response.ok) {
                setError(result.error || 'Unknown error');
                console.error('Error shortening URL:', result.error || 'Unknown error');
                return;
            }

            setShortenedUrl(result.shortUrl);
            setError('');
        } catch (error) {
            console.error(error);
            setError('An error occurred while shortening the URL');
        }
    };
    return (
        <>
            <h1>Dashboard</h1>
            <form onSubmit={(e) => {handleSubmit(); e.preventDefault();}}>
                <div>
                    Long URL:
                    <input
                        type="url"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        placeholder="Enter long URL"
                        required
                    />
                </div>

                <div>
                    Alias:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter custom alias"
                        required
                    />
                </div>

                <button type="submit">Shorten URL</button>
            </form>

            {shortUrl && (
                <p>
                    Shortened URL: <a href={shortUrl} target="_blank">{shortUrl}</a>
                </p>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    );

}
