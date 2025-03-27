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
    const [currPage, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    const router = useRouter();

    // fetch URLs when component mounts or when page changes
    useEffect(() => {
        const fetchUserUrls = async (page = currPage, limit = 5) => {
            try {
                const response = await fetch(`/api/shorten?page=${page}&limit=${limit}`);
                if (!response.ok) throw new Error('Failed to fetch URLs');

                const data = await response.json();
                setUserUrls(data.userUrls);
                setHasNextPage(data.userUrls.length >= limit);
            } catch (error) {
                console.error('Error fetching URLs:', error);
                setError('Failed to load URLs');
            }
        };

        fetchUserUrls();
    }, [currPage]);

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (currPage <= 1) return;
        setPage(prevPage => prevPage - 1);
    };

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
            const refreshResponse = await fetch(`/api/shorten?page=${currPage}&limit=5`);
            if (refreshResponse.ok) {
                const refreshData = await refreshResponse.json();
                setUserUrls(refreshData.userUrls);
                setPage(currPage);
            }
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
                        className="h-20 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 resize-x"
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
                        <textarea
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter custom alias"
                            className="h-10 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 resize-x"
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

            {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-800 text-center rounded shadow-md">
                    <p className="text-red-500">Error shortening URL: {error}</p>
                </div>
            )}

            {userUrls && (
                <>
                    <div className="text-center mt-6 text-xl font-semibold">Your URLs</div>
                    <div className="flex flex-col justify-center items-center">
                        <table className="mt-4 border-collapse w-full max-w-4xl">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-5 py-2 border">Regular URL</th>
                                    <th className="px-5 py-2 border">Short URL</th>
                                    <th className="px-5 py-2 border">Usage Count</th>
                                    <th className="px-5 py-2 border">Copy</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userUrls.map((url: any, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-5 py-2 border">{url.regularUrl}</td>
                                        <td className="px-5 py-2 border">
                                            <a href={`http://localhost:3000/${url.shortCode}`} target="_blank" className="text-blue-500 hover:text-blue-700 hover:underline transition-colors">
                                                https://localhost:3000/{url.shortCode}
                                            </a>
                                        </td>
                                        <td className="px-5 py-2 border text-center">{url.usageCount}</td>
                                        <td className="px-5 py-2 border text-center">
                                            <button
                                                onClick={() => handleCopyLink(`http://localhost:3000/${url.shortCode}`)}
                                                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                                                title="Copy to clipboard"
                                            >
                                                <Copy size={20} className="text-gray-600" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex gap-4 mt-4 mb-8">
                            <button
                                onClick={handlePreviousPage}
                                className={`px-4 py-2 rounded-md transition-colors flex items-center font-medium ${
                                    currPage <= 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                }`}
                                disabled={currPage <= 1}
                            >
                                &larr; Previous
                            </button>
                            <span className="flex items-center px-4">Page {currPage}</span>
                            <button
                                onClick={handleNextPage}
                                className={`px-4 py-2 rounded-md transition-colors flex items-center font-medium ${
                                    !hasNextPage
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                }`}
                                disabled={!hasNextPage}
                            >
                                Next &rarr;
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
