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

    const Pattern = /^https:\/\/open\.spotify\.com(.*)\/track\/[a-zA-Z0-9?=&]+/;


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
<div className="flex justify-center items-center h-screen">
  <div className="text-center">
    <div className="mt-8 text-4xl font-bold text-gray-800">Audio Features</div>
    <p className="mt-8 text-ms text-gray-800">Spotifyの「シェア」から</p>
    <p className="text-ms text-gray-800">曲のリンクをコピーしてください</p>
    <form className="max-w-sm mt-8" onSubmit={handleSubmit}>
      <div className="mb-5">
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
          placeholder="https://open.spotify.com/track/your-track-id"
          value={inputValue}
          onChange={handleInputChange}
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full px-5 py-2.5"
      >
        Submit
      </button>
      {errorMessage && <p className="m-5 text-red-400">{errorMessage}</p>}
    </form>
  </div>
</div>



  );
}



