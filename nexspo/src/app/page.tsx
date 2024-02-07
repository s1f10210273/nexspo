"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function MyForm() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setErrorMessage('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const Pattern = /^https:\/\/open\.spotify\.com\/intl-ja\/track\/[a-zA-Z0-9?=&]+/;

    if (!Pattern.test(inputValue)) {
      setErrorMessage('Invalid Spotify track URL');
      return;
    }

    const trackIdRegex = /\/track\/([a-zA-Z0-9]{22})/;

    const match = inputValue.match(trackIdRegex);
    if (match) {
        const trackId = match[1];
        console.log("トラックID:", trackId);
        router.push(`/spo/${trackId}`);
    } else {
      setErrorMessage('Invalid Spotify track URL');
      return;
    }
  };
  return (
    <div className="text-center">
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="https://open.spotify.com/track/your-track-id"
            value={inputValue}
            onChange={handleInputChange}
            required
          />
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}



