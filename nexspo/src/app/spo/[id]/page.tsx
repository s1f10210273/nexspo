"use client"
import { useEffect, useState } from "react";
import { getTrackInfo, getTrackFeatures } from "../auth";
import Link from 'next/link'
import "./trackInfo";
import "./trackfeatures";

function getKeyName(keyValue: number) {
  switch (keyValue) {
      case 0:
          return 'C';
      case 1:
          return 'C♯';
      case 2:
          return 'D';
      case 3:
          return 'D♯';
      case 4:
          return 'E';
      case 5:
          return 'F';
      case 6:
          return 'F♯';
      case 7:
          return 'G';
      case 8:
          return 'G♯';
      case 9:
          return 'A';
      case 10:
          return 'A♯';
      case 11:
          return 'B';
      default:
          return '';
  }
}


export default function Spo({ params }: { params: { id: string } }) {
  const [trackInfo, setShowInfo] = useState<TrackInfo | null>(null);
  const [feature, setFeature] = useState<TrackFeatures  | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trackData = await getTrackInfo(params.id);
        const trackFeature =await getTrackFeatures(params.id);
        setShowInfo(trackData);
        setFeature(trackFeature);
        console.log(trackData);
        console.log(trackFeature);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: ['acousticness', 'danceability', 'energy', 'instrumentalness', 'speechiness', 'liveness'],
    datasets: [
      {
        label: 'Features',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [feature?.acousticness, feature?.danceability, feature?.energy, feature?.instrumentalness, feature?.speechiness, feature?.liveness]
      }
    ]
  };

  return (
    <div className="flex justify-center h-screen">
    {trackInfo && feature ? (
      <div>
        {/* topカード */}
        <div className="mt-5 m-1 flex flex-col items-center bg-gray-500 border border-gray-200 rounded-lg shadow md:max-w-md">
          <a href={trackInfo.external_urls.spotify} target="_blank" >
            <img className="mt-8 rounded w-40" src={trackInfo.album.images[0].url} alt={trackInfo.name} />
          </a>
          <div className="flex flex-col items-center p-4">
            <a href={trackInfo.external_urls.spotify} target="_blank" >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-50">{trackInfo.name}</h5>
            </a>
            <a href={trackInfo.artists[0].external_urls.spotify} target="_blank" >
              <p className="mb-3 font-normal text-gray-50">{trackInfo.artists[0].name}</p>
            </a>
            <audio controls src={trackInfo.preview_url}>
              Your browser does not support the <code>audio</code> element.
            </audio>
          </div>
        </div>

        {/* 表カード */}
        <div className="mt-8 text-4xl font-bold text-center text-gray-800">Audio Features</div>
        <div className="mt-3 m-1 relative overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-sky-100">
                <tbody>
                    <tr className="bg-gray-600 border-b border-gray-400">
                        <th scope="row" className="px-6 py-4 font-medium bg-gray-500 text-gray-50 whitespace-nowrap">
                        BPM
                        </th>
                        <td className="px-6 py-4">
                            {feature.tempo}
                        </td>
                    </tr>
                    <tr className="bg-gray-600 border-b border-gray-400">
                        <th scope="row" className="px-6 py-4 font-medium bg-gray-500 text-gray-50 whitespace-nowrap">
                            KEY
                        </th>
                        <td className="px-6 py-4">
                            {getKeyName(feature.key)}
                        </td>
                    </tr>
                    <tr className="bg-gray-600 border-b border-gray-400">
                        <th scope="row" className="px-6 py-4 font-medium bg-gray-500 text-gray-50 whitespace-nowrap">
                            mode
                        </th>
                        <td className="px-6 py-4">
                            {feature.mode === 0 ? 'minor' : 'major'}
                        </td>
                    </tr>
                    <tr className="bg-gray-600 border-b border-gray-400">
                        <th scope="row" className="px-6 py-4 font-medium bg-gray-500 text-gray-50 whitespace-nowrap">
                        loudness
                        </th>
                        <td className="px-6 py-4">
                            {feature.loudness} dB
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="mt-3 w-full mx-auto">
          <div className="m-1 bg-gray-500 text-gray-50 rounded-lg shadow-md p-5">
            <div className="flex flex-col space-y-4">
              {data.labels.map((label: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-24">{label}</div>
                  <div className="flex-1 h-6 relative">
                    <div
                      className="absolute inset-0 bg-gray-700"
                      style={{
                        width: `${(data.datasets[0].data[index] || 0) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="text-center">
            <div className="p-5 text-gray-400 flex items-center justify-center">
              <Link href="/" >
                <svg className="h-16 w-16 mr-4 text-gray-700" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
              </Link>
            </div>
          </div>
        </div>


      </div>



    ) : (
      <div className="flex justify-center items-center h-screen" aria-label="読み込み中">
        <div className="animate-spin h-11 w-11 bg-gray-500 rounded-xl"></div>
      </div>
    )}
  </div>
  );
}