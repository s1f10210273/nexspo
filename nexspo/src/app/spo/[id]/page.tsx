"use client"
import { useEffect, useState } from "react";
import { getTrackInfo } from "../auth";
interface Image {
  url: string;
  // 他の画像のプロパティがあれば追加する
}

interface Artist {
  name: string;
  // 他のアーティストのプロパティがあれば追加する
}

interface Album {
  images: Image[];
  // 他のアルバムのプロパティがあれば追加する
}

interface ShowInfo {
  name: string;
  album: Album;
  artists: Artist[];
  // 他のプロパティがあれば追加する
}


export default function Spo({ params }: { params: { id: string } }) {
  const [showInfo, setShowInfo] = useState<ShowInfo | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const showData = await getTrackInfo(params.id);
        setShowInfo(showData);
        console.log(showData);
      } catch (error) {
        console.error('Error fetching show data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="text-center">
    {showInfo ? (
      <div>
        <img
          src={showInfo.album.images[0].url}
          width={400}
          height={400}
          className="rounded-t-lg"
          alt=""
        />
        <p>song name: {showInfo.name}</p>
        <p>artist name: {showInfo.artists[0].name}</p>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
}