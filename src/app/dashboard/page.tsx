'use client';

import { LinkIcon, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
    const [longUrl, setLongUrl] = useState('');
    const [name, setName] = useState('');
    const [shortUrl, setShortenedUrl] = useState('');
    const [error, setError] = useState('');
    const [useAlias, setUseAlias] = useState(false);
    const [userUrls, setUserUrls] = useState([]);

    const router = useRouter();

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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

            const result = await response.json();

            if (!response.ok) {
                setError(result.error || 'Unknown error');
                return;
            }

            setShortenedUrl(result.shortUrl);
            setUserUrls(result.userUrls);
            setError('');
        } catch (error) {
            setError('An error occurred while shortening the URL');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.error('Logout failed');
                setError('Error occurred while logging out');
                return;
            }

            router.push('/login');
        } catch (error) {
            console.error(error);
            setError('Error occurred while logging out');
        }
    };

    const handleCopyLink = async (shortUrl: string) => {
        try {
            await navigator.clipboard.writeText(shortUrl);
        } catch (error) {
            console.error(error);
            setError('Unable to copy shortened URL');
        }
    };

    return (
        <div>
            <header className="sticky top-0 z-50 border-b border-[#E5E5E5] bg-[#FAFAFA]/90 backdrop-blur-md">
                <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <LinkIcon />
                        <span className="text-lg font-medium text-[#1D1D1F]">shrinq.link</span>
                    </div>
                    <a href="/" className="text-sm text-[#86868B] hover:text-[#1D1D1F]">
                        Back to home
                    </a>
                    <a href="#" onClick={handleLogout} className="text-sm text-[#86868B] hover:text-[#1D1D1F] rounded-full bg-red-500 text-white px-4 py-2">Logout</a>
                </div>
            </header>

            <h1 className="text-4xl font-bold mb-4 mt-4 text-center">Dashboard</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center space-y-4">
                <div className="flex flex-col items-center justify-center">
                    <label htmlFor="longUrl" className="text-lg font-medium">Long URL:</label>
                    <input
                        id="longUrl"
                        type="url"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        placeholder="Enter long URL"
                        required
                        className="h-10 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={useAlias}
                        onChange={(e) => setUseAlias(e.target.checked)}
                    />
                    <span>Use custom alias?</span>
                </label>

                {useAlias && (
                    <div className="flex flex-col items-center justify-center">
                        <label htmlFor="name" className="text-lg font-medium">Alias:</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter custom alias"
                            className="h-10 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                )}

                <button type="submit" className="h-10 px-4 mt-4 rounded-lg bg-blue-500 text-white hover:bg-blue-700">Shorten URL</button>
            </form>

            <div className="mt-4 flex justify-center space-x-2 rounded-lg">
                {shortUrl && (
                    <>
                        <p className="bg-blue-100 text-gray-800 py-2 px-4 rounded text-center">{shortUrl}</p>
                        <button
                            onClick={() => handleCopyLink(shortUrl)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                            title="Copy to clipboard"
                        >
                            <Copy size={20} className="text-gray-600" />
                        </button>
                    </>
                )}
            </div>

            {userUrls && (
                <div className="flex justify-center items-center">
                    <h3>Your URLs:</h3>
                    <ul>
                        {userUrls.map((url: any, index) => (
                            <li key={index}>
                                <p>
                                    {url.regularUrl} : http://localhost:3000/{url.shortCode}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}


            {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-800 text-center rounded shadow-md">
                    <p className="text-red-500">Error shortening URL: {error}</p>
                </div>
            )}
        </div>
    );
}
