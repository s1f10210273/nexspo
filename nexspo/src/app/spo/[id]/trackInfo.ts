interface Image {
  height: number;
  url: string;
  width: number;
}

interface Artist {
  id: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  name: string;
  type: string;
  uri: string;
}

interface TrackInfo {
  album: {
    images: Image[];
  };
  artists: Artist[];
  name: string;
  external_urls: {
    spotify: string;
  };
  preview_url: string;
}
